import { Component, Input } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
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
