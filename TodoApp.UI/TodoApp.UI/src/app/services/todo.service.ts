import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseApiUrl: string = "https://localhost:7126";

  constructor(private http: HttpClient) {

  }

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseApiUrl + '/api/todo')
  }

  addTodo(newTodo: Todo): Observable<Todo>{
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Todo>(this.baseApiUrl + '/api/todo', newTodo);
  }

  updateToDo(id: string, updateTodo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.baseApiUrl + `/api/todo/${updateTodo.id}/update`, updateTodo);
  }

  deleteToDo(id: string): Observable<Todo>{
    return this.http.delete<Todo>(this.baseApiUrl + `/api/todo/${id}/delete`);
  }
}
