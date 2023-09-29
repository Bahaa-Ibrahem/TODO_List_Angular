import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './componets/todo-list/todo-list.component';
import { AddTodoComponent } from './componets/add-todo/add-todo.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'update-todo/:id', component: AddTodoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
