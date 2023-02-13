import { Todo } from './../../../../common/interfaces/todo';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  TODO: string = "TODO";
  INPROGRESS: string = "IN_PROGRESS";
  COMPLETED: string = "COMPLETED";

  // Current Todo
  currentUpdatedTodo: Todo = {
    todoId: "",
    title: "",
    description: "",
    status: ""
  }
  currentUpatedTodoIndex: number = 0;
  currentListName: string = "";

  // project Id
  projectId: string = "";

  // darkmode
  darkmode: boolean = false;

  // updateActive
  updateActive: boolean = false;

  // newTodoModal
  newTodoModal: boolean = false;

  // current state
  currentStatus : Todo["status"] = "TODO";

  //newTodoForm
  newTodoForm = this.fb.group({
    title: ["" , Validators.required],
    description: [""],
    status: [""]
  })

  todo: Todo[] = [];

  progress: Todo[] = [];

  completed: Todo[] = [];

  constructor(private darkmodeService: DarkModeService, private todosService: TodosService , private route: ActivatedRoute, private fb: FormBuilder) {
    this.projectId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })

    // projects Service
    this.todosService.getAll(this.projectId).subscribe((projectTodos:any) => {
      projectTodos.forEach((res:any) => {
        switch ((res.status as Todo["status"])) {
          case "TODO":
            this.todo.push(res);
            break;
          case "IN_PROGRESS":
            this.progress.push(res);
            break;
          case "COMPLETED":
            this.completed.push(res);
            break;
        }
      });
    })

  }

  // Set Current State
  setState(value:Todo["status"]){
    this.currentStatus = value;
    console.log(this.currentStatus);
    this.newTodoModalFun(true);
  }

  // newProjectModalFun
  newTodoModalFun(value: boolean){
    this.newTodoModal = value;
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      let targetElement;

      switch (event.previousContainer.id) {
        case this.TODO:
          targetElement = this.todo[event.previousIndex];
          targetElement.status = event.container.id;
          break;
        case this.INPROGRESS:
          targetElement = this.progress[event.currentIndex];
          targetElement.status = event.container.id;
          break;
        case this.COMPLETED:
          targetElement = this.completed[event.currentIndex];
          targetElement.status = event.container.id;
          break;
      }

      this.todosService.update((targetElement?.todoId as string) , (targetElement as Todo)).subscribe((res:any) => {
        console.log(res);
      })


      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }
  }

  // newTodoFun
  newTodoFun(){

    let newTodo = {
      title: this.newTodoForm.get("title")?.value,
      description: this.newTodoForm.get("description")?.value,
      status: this.currentStatus
    }

    this.newTodoForm.patchValue(newTodo);

    this.todosService.add(this.newTodoForm.value , this.projectId).subscribe((res:any) => {

      switch ((res.status as Todo["status"])) {
        case this.TODO:
          this.todo.push(res);
          break;
        case this.INPROGRESS:
          this.progress.push(res);
          break;
        case this.COMPLETED:
          this.completed.push(res);
          break;
      }

      // hide modal
      this.newTodoModalFun(false);

      // reset todoForm
      this.newTodoForm.patchValue({
        title: "",
        description: "",
        status : ""
      })


    })

  }

  // updateTodoModalFun
  updateTodoModalFun(todo:Todo , i:number, listName:string){

    this.newTodoModalFun(true);
    this.updateActive = true;

    this.newTodoForm.patchValue(todo);

    this.currentUpdatedTodo = todo;
    this.currentUpatedTodoIndex = i;
    this.currentListName = listName;

  }

  // updateTodo
  updateTodo(){

    this.todosService.update(this.currentUpdatedTodo.todoId , this.newTodoForm.value).subscribe((updatedTodo:any) => {

      switch (this.currentListName) {
        case this.TODO:
          this.todo.splice(this.currentUpatedTodoIndex , 1 , updatedTodo);
          break;
        case this.INPROGRESS:
          this.progress.splice(this.currentUpatedTodoIndex , 1 , updatedTodo);
          break;
        case this.COMPLETED:
          this.completed.splice(this.currentUpatedTodoIndex , 1 , updatedTodo);
          break;
      }

      this.newTodoModalFun(false);
      this.updateActive = false;

      this.newTodoForm.patchValue({
        title: "",
        description: "",
        status : ""
      });

      this.currentUpdatedTodo = {
        todoId: "",
        title: "",
        description: "",
        status: ""
      };
      this.currentUpatedTodoIndex = 0;


    })

  }

  // deleteTodoFun
  deleteTodoFun(todo:Todo , i:number, listName:string){

    this.currentUpatedTodoIndex = i;
    this.currentListName = listName;

    this.todosService.delete(todo.todoId).subscribe((res:any) => {

      switch (this.currentListName) {
        case this.TODO:
          this.todo.splice(this.currentUpatedTodoIndex , 1);
          break;
        case this.INPROGRESS:
          this.progress.splice(this.currentUpatedTodoIndex , 1 );
          break;
        case this.COMPLETED:
          this.completed.splice(this.currentUpatedTodoIndex , 1);
          break;
      }

      this.currentUpatedTodoIndex = 0;
      this.currentListName = "";

    } , (error: Error) => {

      console.log(error);

    })

  }

}
