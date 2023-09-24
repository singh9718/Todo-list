import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Todo } from 'src/app/Todo';
import { map } from 'rxjs';

interface ApiResponse {
  success: boolean;
  data: any;
  message: string;
}
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  title!: string;
  desc!: string;

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  private snoCounter: number = 1;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/v1/getTodos').subscribe(todo => console.log(todo));
  }

  onSubmit() {
    const sno = this.snoCounter;
    const todo = {
      sno: sno,
      title: this.title,
      desc: this.desc,
      active: true,
    }
    this.http.post<ApiResponse>('http://localhost:3000/api/v1/createTodo', todo).pipe(
      map((response) => response.data)
    ).subscribe((data) => {
      this.todoAdd.emit(data)
    });

    this.snoCounter++;
    this.title = '';
    this.desc = '';
  }
}
