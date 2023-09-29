import { Component, Input } from '@angular/core';
import { IAddTodo, ITodo } from '../../interfaces/todo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  todoForm: FormGroup;
  @Input() id: number;
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, private router: Router) {

  }

  ngOnInit() {
    if(this.id) {
      this.editMode = true;
      this.getTodoById();
    }

    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      completed: [false]
    });
  }

  getTodoById() {
    this.todoService.getTodoById(this.id).subscribe((res: ITodo) => {
      this.todoForm.patchValue(res);
    })
  }

  onSubmit() {
    if (this.todoForm.valid) {
     if(this.editMode) {
      let body = this.todoForm.value;
      body.id = this.id;

      this.todoService.updateTodo(body).subscribe((res) => {
        this.router.navigateByUrl('/')
      })
     } else {
      this.todoService.createtodo(this.todoForm.value).subscribe((res) => {
        this.router.navigateByUrl('/')
      })
     }
    }
  }
}
