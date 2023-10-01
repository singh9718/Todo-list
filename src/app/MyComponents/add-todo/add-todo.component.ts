import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/Todo';
import { map } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title!: string;
  desc!: string;

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  private snoCounter: number = 1;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/api/v1/getTodos')
      .subscribe((todo) => console.log(todo));
  }

  onSubmit() {
    const sno = this.snoCounter;
    const todo = {
      sno: sno,
      title: this.title,
      desc: this.desc,
      active: true,
    };

    this.snoCounter++;
    this.title = '';
    this.desc = '';
    this.apiService
      .addTodo(todo)
      .pipe(map((response) => response.data))
      .subscribe((data) => {
        console.log(data);
        this.todoAdd.emit(data);
      });
  }
}
