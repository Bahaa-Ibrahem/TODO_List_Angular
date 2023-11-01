import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
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
      this.todoService.todoList = this.todoList;
      this.filteredList = this.todoList;
    })
  }

  updateTodo(item: ITodo, event: any) {
    item.completed = event.currentTarget.checked;
    this.todoService.updateTodo(item).subscribe((res) => {
      console.log(res)
    }, (error: any) =>{
      item.completed = !item.completed;
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
