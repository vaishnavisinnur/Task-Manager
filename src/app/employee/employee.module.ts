import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './component/tasks/tasks.component';import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { SharedModule } from '../pipes/shared.module';
import { CreateTaskComponent } from './component/create-task/create-task.component';
import { EditTaskComponent } from './component/edit-task/edit-task.component';
import { UpdateTaskStatusComponent } from './component/update-task-status/update-task-status.component';

@NgModule({

  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent
  ],

  imports: [
   SharedModule,
    EmployeeRoutingModule
  ],
  exports:
  [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent
  ]
})
export class EmployeeModule { }
