import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from '../masters/masters.component';
const routes: Routes = [

  {
      path: "admin",  data: { expectedRole: "Admin" }, //canActivate: [CanActivateGuardService],
      children: [
          { path: "dashboard", component: DashboardComponent,data: { linkIndex: 0 } },
          { path: "projects", component: ProjectsComponent,data: { linkIndex: 2 } },
          { path: "projects/view/:projectid", component: ProjectDetailsComponent ,data: { linkIndex: 3 }},
          { path: "masters", component: MastersComponent, data: { linkIndex: 4 } },
        ]
  },

];
@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }