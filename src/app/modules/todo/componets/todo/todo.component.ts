import { Component, Input } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todoForm: FormGroup;
  todoList: ITodo[] = [];
  @Input() id: number;
  editMode: boolean = false;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, private router: Router) {

  }

  ngOnInit() {
    if(this.id) {
      this.editMode = true;
      this.getTodoById();
    }

    this.todoList = this.todoService.todoList;

    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), this.customEmptyValidator]],
      completed: [false]
    });
  }

   // Custom validator function
   customEmptyValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '' || value.trim() === '') {
      return { emptyValue: true };
    }
    return null;
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
        this.router.navigateByUrl('/');
      })
     } else {

      let currentTodoTitle = this.todoForm.get('title')?.value.trim();
      let isUniqueTodo = this.todoList.find((todo: ITodo) => todo.title == currentTodoTitle);

      if(!isUniqueTodo) {
        this.todoService.createtodo(this.todoForm.value).subscribe((res) => {
          this.router.navigateByUrl('/');
        })
      } else {
        alert("This to do added before!");
      }
     }
    }
  }
}
