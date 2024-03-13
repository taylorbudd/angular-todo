import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, DatePipe, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{
  todos: Todo[] = [];
  @Input() newTodo: Todo = {
    id: '',
    description: '',
    isCompleted: false,
    dateCreated: new Date,
    dateCompleted: null
  }

  constructor(private todoService: TodoService){

  }

  ngOnInit(): void {
    this.todoService.getAllTodos()
    .subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    })
  }

  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    })
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo)
    .subscribe({
      next: (todo) => {
        this.getAllTodos();
      }
    })
  }

  onCompletedChange(id: string, todo: Todo){
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateToDo(id, todo)
    .subscribe({
      next:(todo) => {
        this.getAllTodos();
      }
    })
  }

  deleteTodo(id: string){
    this.todoService.deleteToDo(id)
    .subscribe({
      next: (res) => {
        this.getAllTodos();
      }
    })
  }

  clearInput(){
    this.newTodo.description = '';
  }
}
