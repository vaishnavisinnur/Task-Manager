import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/projects.service';
import { Projects } from 'src/app/projects';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientLocationService } from 'src/app/client-location.service';
import { ClientLocation } from 'src/app/client-location';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})


export class ProjectsComponent implements OnInit 
{

  showLoading:boolean = true;
  projects:any[]=[]
  ClientLocation:ClientLocation[] = []

  newProject:Projects = new Projects();
  editProject:Projects = new Projects();
  editIndex: any = null;
  deleteProject:Projects= new Projects();
  deleteIndex:any=null;
  searchBy: string = 'ProjectName';
  searchText: string = '';
  

  constructor(private ProjectService: ProjectsService, private ClientLocationService: ClientLocationService){

  }
  

  

  //  here we are receiving the AJAX request From the Server
  ngOnInit(): void {
     this.ProjectService.getAllProjects().subscribe(
      (response)=>  {
        console.log('Projects:', response);
        this.projects = response;
      },
      (error) => {
        console.log(error);
        alert("Authentication Failed")
      }
    );

    this.ClientLocationService.getClientLocation().subscribe(
      (response) => {
             this.ClientLocation=response;
      }
    )
  }



   // open and close mothods for modal popup dialog box
   openModal() {
    const modelDiv = document.getElementById('newModal');
    if(modelDiv!= null){
      modelDiv.style.display = 'block';
    }
   
  }

  closeModal() {
    const modelDiv = document.getElementById('newModal');
    if(modelDiv!= null){
      modelDiv.style.display = 'none';
    }
   
}



onSaveClick() {



  // Check if any of the required fields is empty
  if (!this.newProject.projectID || !this.newProject.projectName || !this.newProject.dateOfStart || !this.newProject.teamSize) {
    console.log("Please enter all credentials");
    return; // Stop execution if validation fails
  }

  this.ProjectService.insertProject(this.newProject).subscribe((response) => {
  //  Add Projects to Grid
  var p : Projects = new Projects();
  p.projectID=response.projectID;
  p.projectName=response.projectName;
  p.dateOfStart=response.dateOfStart;
  p.teamSize=response.teamSize;
  p.active=response.active;
  p.status=response.status;
  p.clientLocationID=response.clientLocationID;
  p.clientLocation=response.clientLocation;
  this.projects.push(p);

   
    this.newProject.projectID=null;
    this.newProject.projectName=null;
    this.newProject.dateOfStart=null;
    this.newProject.teamSize=null;
    this.newProject.active=false;
    this.newProject.status=null;
    this.newProject.clientLocationID=null;

  }, (error) => {
    console.log(error);
    
  });

}





// Edit Modal

onEditClick(event: any, index: number): void {
  // Your existing implementation
  const editModal = document.getElementById('editModal');

  if (editModal != null) {
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-"); //yyyy-MM-dd
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.active=this.projects[index].Active;
    this.editProject.status=this.projects[index].status;
    this.editProject.clientLocation=this.projects[index].clientLocationId;
    this.editIndex = index;


    this.editProject.projectID= null
    this.editProject.projectName =null
    this.editProject.dateOfStart =null
    this.editProject.teamSize =null 
    this.editProject.active=false
    this.editProject.status=null
    this.editProject.clientLocationID=null

    editModal.style.display = 'block';
  }
}


onEditClose(){
  const modelDiv = document.getElementById('editModal');
  if(modelDiv!= null){
    modelDiv.style.display = 'none';
  }

}

onUpdateClick(){
  this.ProjectService.updateProject(this.editProject).subscribe((response:Projects) =>
   {
    var p :Projects = new Projects();
    p.projectID=response.projectID;
    p.projectName=response.projectName;
    p.dateOfStart=response.dateOfStart;
    p.teamSize=response.teamSize;
    p.active=response.active;
    p.status=response.status;
    p.clientLocationID=response.clientLocationID;
    this.projects[this.editIndex] = p;
    
   },
   
   () =>
   {

   } );
}
 






// Delete Modal

onDeleteClick(event: any, index: number): void{

const deleteModal = document.getElementById('deleteModal');

if (deleteModal != null){
this.deleteIndex-index;
this.deleteProject.projectID = this.projects[index].projectID;
this.deleteProject.projectName = this.projects[index].projectName;
this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
this.deleteProject.teamSize = this.projects[index].teamSize;

deleteModal.style.display = 'block';
}
}


onDeleteCongirmClick(){
this.ProjectService.deleteProject(this.deleteProject.projectID).subscribe(
  (response) =>{
    this.projects.splice(this.deleteIndex,1);
    this.deleteProject.projectID= null
    this.deleteProject.projectName =null
    this.deleteProject.dateOfStart =null
    this.deleteProject.teamSize =null 
  },
   (error)=>{
    console.log(error)
   });
}
onDeleteClose(){
  const modelDiv = document.getElementById('deleteModal');
  if(modelDiv!= null){
    modelDiv.style.display = 'none';
  }

}




onSearchClick()
{
  this.ProjectService
    .SearchProjects(this.searchBy, this.searchText)
    .subscribe(
      (response: Projects[]) =>
      {
        this.projects = response;
      },
      (error) =>
      {
        console.log(error);
      }
    );
}





}
