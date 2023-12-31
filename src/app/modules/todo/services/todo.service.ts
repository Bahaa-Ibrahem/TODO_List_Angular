import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ITodo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: ITodo[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllTodos(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(environment.url)
  }

  getTodoById(id: number) {
    return this.httpClient.get<ITodo>(`${environment.url}/${id}`)
  }

  createtodo(body: ITodo) {
    return this.httpClient.post(environment.url, { ...body })
  }

  updateTodo(body: ITodo) {
    return this.httpClient.put(`${environment.url}/${body.id}`, { ...body })
  }

  deleteTodo(id: number) {
    return this.httpClient.delete(`${environment.url}/${id}`)
  }
}
