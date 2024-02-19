import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectIDUniqueValidatorDirective } from '../directives/project-id-unique-validator.directive';
import { NumberToWordsPipe } from '../number-to-words.pipe';
import { FilterPipe } from '../filter.pipe';
import { PagingPipe } from './paging.pipe';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
   ProjectIDUniqueValidatorDirective,
   NumberToWordsPipe,
   FilterPipe,
    PagingPipe,
    ComponentLoaderDirective,
    SortPipe
    
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    ComponentLoaderDirective,
    SortPipe
  ]
})
export class SharedModule { }