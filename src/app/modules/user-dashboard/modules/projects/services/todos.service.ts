import { Todo } from './../../../../../common/interfaces/todo';
import { environment } from './../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from 'src/app/modules/account/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient , private jwt: JwtService) { }

  get(todoId: string){
    return this.http.get(`${environment.apiUrl}todo/${todoId}`);
  }

  getAll(projectId: string){
    return this.http.get(`${environment.apiUrl}todo/all/${projectId}`);
  }

  add(todo : Todo , projectId: string){
    return this.http.post(`${environment.apiUrl}todo/${projectId}` , todo);
  }

  update(todoId: string , todo: Todo){
    return this.http.put(`${environment.apiUrl}todo/${todoId}` , todo);
  }

  delete(todoId: string){
    return this.http.delete(`${environment.apiUrl}todo/${todoId}`);
  }

}

