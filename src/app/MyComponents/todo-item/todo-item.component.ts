import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();

  isEditing = false;
  editableTodo: Todo | null = null;


  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  onClick(todo: Todo) {
    // console.log('Received todo object:', todo);
    if (todo._id) {
      this.apiService.deleteTodo(todo).subscribe((response) => {
        console.log('Delete response:', response);
        this.todoDelete.emit(todo);
      });
    }
  }

  onCheckboxClick(todo: Todo) {
    this.todoCheckbox.emit(todo);
  }

  startEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    if (this.todo._id) {
      this.apiService.updateTodo(this.todo).subscribe(
        (response) => {
          this.isEditing = false;
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
}
