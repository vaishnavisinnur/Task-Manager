import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})



export class DashboardComponent implements OnInit
{

  
 
  Designation: string = "";
  Username: string = "";
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0.2;
  ProjectCost: number = 0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;


  Clients: string[] | undefined;
  Projects:string[] | undefined;
  Year:number[] | undefined;
  // Year:number[]=[];               we can also initialize first and can write in for loop
  TeamMembersSummary :any[] | undefined;
  TeamMembers: any[] | undefined;
  
  constructor( private dashboardService : DashboardService){

  }




  ngOnInit()
  {
    
    this.Designation = 'Team Leader';
    this.Username = 'Vaishnavi Sinnur';
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52536;
    // this.ToDay= new Date();


    this.Clients = ["ABC Infotech Ltd", "DEF Software Solutions","GHI Industries"
  ];


    this.Projects = ["Project A", "Project B","Project C","Project D"
  ];


    this.Year = [2018,2019,2020,2021
  ];
//   for(var i=2019; i>=2010; i--){
//        this.Year.push(i);
// }


 


    this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary()
    
   
   this.TeamMembers = this.dashboardService.getTeamMembers()
 
  }
  onProjectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedProject = target.value;
    if (selectedProject) {
      switch (selectedProject) {
        case 'Project A':
          this.ProjectCost = 2113507;
          this.CurrentExpenditure = 96788;
          this.AvailableFunds = 52436;
          break;
        case 'Project B':
          this.ProjectCost = 88923;
          this.CurrentExpenditure = 22450;
          this.AvailableFunds = 2640;
          break;
        case 'Project C':
          this.ProjectCost = 662183;
          this.CurrentExpenditure = 7721;
          this.AvailableFunds = 9811;
          break;
        case 'Project D':
          this.ProjectCost = 928431;
          this.CurrentExpenditure = 562;
          this.AvailableFunds = 883;
          break;
        default:
          // Handle other cases if needed
          break;
      }
    }
  }
}