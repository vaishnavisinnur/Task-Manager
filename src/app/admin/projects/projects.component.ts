import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/models/projects';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientLocationService } from 'src/app/services/client-location.service';
import { ClientLocation } from 'src/app/models/client-location';
import * as $ from "jquery";
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from 'src/app/filter.pipe';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})


export class ProjectsComponent implements OnInit 
{




  showLoading:boolean = true;
  projects:any[]=[]
  clientLocations: Observable<ClientLocation[]> | any = null;

  newProject:Projects = new Projects();
  editProject:Projects = new Projects();
  editIndex: any = null;
  deleteProject:Projects= new Projects();
  deleteIndex:any=null;
  searchBy: string = "projectName";
  searchText: string = "";


  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 3;


  @ViewChild("newForm") newForm: NgForm | any = null;
  @ViewChild("editForm") editForm: NgForm | any = null;

  

  constructor(private ProjectService: ProjectsService, private ClientLocationService: ClientLocationService){

  }
 
  

  //  here we are receiving the AJAX request From the Server
  ngOnInit(): void {
    debugger;
     this.ProjectService.getAllProjects().subscribe(
      (response:Projects[])=>  {
        debugger;
        console.log('Projects:', response);
        this.projects = response;
        this.showLoading= false;
        this.calculateNoOfPages();
      },
    );
    this.clientLocations = this.ClientLocationService.getClientLocation();
    // this.ClientLocationService.getClientLocation().subscribe(
    //   (response) => {
    //          this.ClientLocation=response;
    //   }
    // )
  }
  calculateNoOfPages() 
    {
      let filterPipe = new FilterPipe();
      var resultProjects = filterPipe.transform(this.projects, this.searchBy, this.searchText);
      var noOfPages = Math.ceil(resultProjects.length  / this.pageSize);
  
      this.pages = [];
      for (let i = 0; i < noOfPages; i++)
      {
        this.pages.push( { pageIndex: i });
      }
  
      this.currentPageIndex = 0;
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

onSaveClick()
{
  if (this.newForm.valid)
  {
    this.newProject.clientLocation.clientLocationID = 0;
    this.ProjectService.insertProject(this.newProject).subscribe((response) =>
    {
     //Add Project to Grid
     var p: Projects = new Projects();
     p.projectID = response.projectID;
     p.projectName = response.projectName;
     p.dateOfStart = response.dateOfStart;
     p.teamSize = response.teamSize;
     p.clientLocation = response.clientLocation;
     p.active = response.active;
     p.clientLocationID = response.clientLocationID;
     p.status = response.status;
     this.projects.push(p);

     //Clear New Project Dialog - TextBoxes
     this.newProject.projectID = null;
     this.newProject.projectName = null;
     this.newProject.dateOfStart = null;
     this.newProject.teamSize = null;
     this.newProject.active = false;
     this.newProject.clientLocationID = null;
     this.newProject.status = null;


      $("#newFormCancel").trigger("click");
      this.calculateNoOfPages();
    }, (error) =>
    {
      console.log(error);
    });
  }
}






// Edit Modal

onEditClick(event: any, index: number): void {
  // Your existing implementation
  const editModal = document.getElementById('editModal');
  if (editModal != null) {
    this.editForm.resetForm(); // Assuming this is the form you want to reset

    editModal.style.display = 'block';

    setTimeout(() => {
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-"); //yyyy-MM-dd
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.active=this.projects[index].Active;
    this.editProject.status=this.projects[index].status;
    this.editProject.clientLocation=this.projects[index].clientLocationId;
    this.editIndex = index;
    }, 100);
  }
}

onEditClose(){
  const modelDiv = document.getElementById('editModal');
  if(modelDiv!= null){
    modelDiv.style.display = 'none';
  }

}

onUpdateClick(){
  if (this.editForm.valid)
  {
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
    
  
    this.editProject.projectID = null;
    this.editProject.projectName = null;
    this.editProject.dateOfStart = null;
    this.editProject.teamSize = null;
    this.newProject.active = false;
    this.newProject.clientLocationID = null;
    this.newProject.status = null;
  
    $("#editFormCancel").trigger("click");
  },
    (error) =>
    {
      console.log(error);
    });
}
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

    this.calculateNoOfPages();
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




// onSearchClick()
// {
//   this.ProjectService
//     .SearchProjects(this.searchBy, this.searchText)
//     .subscribe(
//       (response: Projects[]) =>
//       {
//         this.projects = response;
//       },
//       (error) =>
//       {
//         console.log(error);
//       }
//     );
// }


onsearchTextKeyup($event: KeyboardEvent) {
  this.calculateNoOfPages();
  }


  onPageIndexClicked(pageIndex: number)
  {
    this.currentPageIndex = pageIndex;
  }




  isAllChecked: boolean = false;
            

@ViewChildren("prj") projs : QueryList<ProjectComponent> | any = null;
isAllCheckedChange(event: any)
{
  let proj = this.projs.toArray();
  for (let i = 0; i < proj.length; i++)
  {
    proj[i].isAllCheckedChange(this.isAllChecked);
  }
}



// HIDE AND SHOW FUNCTIONALITY
@ViewChild("prj") prj : QueryList<ProjectComponent> | any = null;
onHideShowDetails(event: any)
{
  let projs = this.prj.toArray();
  for (var i = 0; i < projs.length; i++)
  {
    projs[i].toggleDetails();
  }
}



@ViewChild("prjID") prjID: ElementRef | any = null;
onNewClick(event: any)
{
  this.newForm.resetForm();
  setTimeout(() => {
    this.prjID.nativeElement.focus();
  }, 100);
}

}
