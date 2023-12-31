import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './componets/todo-list/todo-list.component';
import { TodoComponent } from './componets/todo/todo.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'add-todo', component: TodoComponent },
  { path: 'update-todo/:id', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
