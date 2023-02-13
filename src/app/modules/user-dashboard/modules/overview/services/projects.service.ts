import { JwtService } from 'src/app/modules/account/services/jwt.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewProject } from 'src/app/common/interfaces/new-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getAll(userId: string){
    return this.http.get(`${environment.apiUrl}project`);
  }

  get(projectId: string){
    return this.http.get(`${environment.apiUrl}project/${projectId}`);
  }

  add(project : NewProject){
    return this.http.post(`${environment.apiUrl}project` , project);
  }

  update(projectId: string , project: NewProject){
    return this.http.put(`${environment.apiUrl}project/${projectId}` , project);
  }

  delete(projectId: string){
    return this.http.delete(`${environment.apiUrl}project/${projectId}`);
  }

}
