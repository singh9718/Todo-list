import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  onClick(todo: Todo) {
    // console.log('Received todo object:', todo);
    if (todo._id) {
      this.http.delete(`http://localhost:3000/api/v1/deleteTodo/${todo._id}`).subscribe(
        (response) => {
          // console.log('Delete response:', response);
          this.todoDelete.emit(todo);
        },
        (error) => {
          console.error('Delete error:', error);
        }
      );
    } else {
      console.error('Todo does not have a valid _id property.');
    }
  }

  onCheckboxClick(todo: Todo) {
    this.todoCheckbox.emit(todo);
  }
}
