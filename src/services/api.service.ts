import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../app/Todo';

interface ApiResponse {
  success: boolean;
  data: any;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      'http://localhost:3000/api/v1/createTodo',
      todo
    );
  }

  deleteTodo(todo: Todo): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `http://localhost:3000/api/v1/deleteTodo/${todo._id}`
    );
  }

  updateTodo(todo: Todo): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `http://localhost:3000/api/v1/updateTodo/${todo._id}`,
      todo
    );
  }

  login(todo: Todo): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      'http://localhost:3000/api/v1/login',
      todo
    );
  }

  signup(todo: Todo): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      'http://localhost:3000/api/v1/signup',
      todo
    );
  }

}
