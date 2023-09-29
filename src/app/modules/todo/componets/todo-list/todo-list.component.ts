import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IEditTodo, ITodo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  today = new Date();

  todoList: ITodo[] = [];
  filteredList: ITodo[] = [];
  searchKey: string;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getAllTodos()
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe((res: ITodo[]) => {
      this.todoList = res;
      this.filteredList = this.todoList;
    })
  }

  updateTodo(item: IEditTodo, event: any) {
    this.todoService.updateTodo(item).subscribe(() => {
      item.completed = event.currentTarget.checked;
    })
  }

  deleteTodo(id: number, i: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.filteredList.splice(i, 1);
    })
  }

  onSearch() {
    this.filteredList = this.todoList.filter((res: ITodo) =>
      res.title.toLowerCase().match(this.searchKey?.toLowerCase())
    )
  }

}
