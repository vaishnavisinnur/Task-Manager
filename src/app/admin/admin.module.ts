import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from '../services/dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ProjectComponent } from './project/project.component';
import { CheckBoxPrinterComponent } from './check-box-printer/check-box-printer.component';
import { SharedModule } from '../pipes/shared.module';
import { ProjectDetailsComponent} from './project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { ClientLocation } from '../models/client-location';
import { ClientLocationsComponent } from './client-locations/client-locations.component';
import { TaskPrioritiesComponent } from './task-priorities/task-priorities.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { MastersComponent } from './masters/masters.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent
],

imports: [SharedModule, AdminRoutingModule],
exports: [DashboardComponent, MyProfileComponent, ProjectsComponent, ProjectDetailsComponent],
providers: [DashboardService],
})
export class AdminModule { }
