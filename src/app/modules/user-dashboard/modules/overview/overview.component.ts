import { Router } from '@angular/router';
import { Project } from './../../../../common/interfaces/project';
import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from './services/projects.service';
import { JwtService } from 'src/app/modules/account/services/jwt.service';

// sweetalert2
import Swal from "sweetalert2";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // Modal add new Project
  newProjectModal: boolean = false;

  // Update Active
  updateActive: boolean = false;

  // Current update Element
  currentUpdateElement : Project = {
    projectId: "",
    name: "",
    description: ""
  };

  currentUpdateElementIndex: number = 0;

  listProjets: Project[] = [];

  newProjectForm = this.fb.group({
    name: ["" , Validators.required],
    description: [""]
  })

  constructor(private darkmodeService: DarkModeService, private route: Router , private fb : FormBuilder , private projectsService: ProjectsService , private jwt: JwtService){}

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })

    // Get all projects List
    this.projectsService.getAll((this.jwt.getUserId() as string)).subscribe((projects:any) => {
      this.listProjets = projects;
    })

  }

  // Toggle Modal ADD New Project
  newProjectModalFun(value: boolean){
    this.newProjectModal = value;
    this.newProjectForm.patchValue({
      name: "",
      description: ""
    })
  }


  // Create New Project
  newProjectFun(){
    this.projectsService.add(this.newProjectForm.value).subscribe((newProject:any) => {
      this.newProjectModalFun(false);
      this.listProjets.unshift(newProject);
      this.newProjectForm.patchValue({
        name: "",
        description: ""
      })
    })
  }

  // delete Porject
  deletePorject(id: string , i: number){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.projectsService.delete(id).subscribe(res => {
          this.listProjets.splice(i , 1);
        } , (error) => {
          this.listProjets.splice(i , 1);

          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your Project has been deleted.',
            'success'
          )

        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary Project is safe :)',
          'error'
        )
      }
    })


  }


  // Set the current Update Element
  updateProjectFun(projet: Project , i: number){
    this.currentUpdateElement = projet;
    this.currentUpdateElementIndex = i;
    this.newProjectModalFun(true);
    this.updateActive = true;
    this.newProjectForm.patchValue({
      name: projet.name,
      description: projet.description
    })
  }

  // update Project
  updateProject(){

    this.projectsService.update(this.currentUpdateElement.projectId , this.newProjectForm.value).subscribe((updatedProject:any) => {
      this.listProjets.splice(this.currentUpdateElementIndex , 1 , updatedProject);
      this.currentUpdateElement = {
        projectId: "",
        name: "",
        description: ""
      };
      this.currentUpdateElementIndex = 0;
      this.newProjectModalFun(false);
      this.updateActive = false;
      this.newProjectForm.patchValue({
        name: "",
        description: ""
      })
    })
  }

  // navigateToProject
  navigateToProject(project: Project){
    this.route.navigateByUrl(`dashboard/projects/${project.projectId}`);
  }

}
