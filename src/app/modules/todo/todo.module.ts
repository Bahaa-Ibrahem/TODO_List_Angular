import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './componets/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuteTextPipe } from 'src/app/shared/pipes/cute-text.pipe';
import { AddTodoComponent } from './componets/add-todo/add-todo.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TodoListComponent,
    AddTodoComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CuteTextPipe,
    TranslateModule
  ],
  providers: [
  ]
})
export class TodoModule { }
