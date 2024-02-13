import { Component, OnInit, Input, EventEmitter, Output, ContentChild, SimpleChanges, OnChanges, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges,DoCheck,AfterContentChecked,AfterContentInit,AfterViewChecked,AfterViewInit
{
  @Input("currentProject") project: Project | any = null;
  @Input("recordIndex") i: number = 0;

  
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  hideDetails: boolean = false;
  MySubscription: any;


  constructor(public projectsService: ProjectsService)
  {
  }
  ngAfterViewInit(): void {
    console.info(".....ngAfterViewInit called")
  }
  ngAfterViewChecked(): void {
    console.info(".....ngAfterviewChecked called")
  }
  ngAfterContentInit(): void {
   console.info(".....ngAfterContentInit called")
   console.log(this.selectionBox.toArray());
  }
  ngAfterContentChecked(): void {
   console.info(".....ngAfterContentChecked called")
  }
  ngDoCheck(): void {
    console.info("......DoCheck method Called ")
  }



  ngOnChanges(simpleChanges: SimpleChanges)
  {
    console.info("--------------ngOnChanges called");

    for (let propName in simpleChanges)
    {
      let chng = simpleChanges[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }

    if (simpleChanges["project"])
    {
      this.project.teamSize += 1;
    }
  }

  @ViewChild("tbl") tbl : ElementRef | any = null;


  ngOnInit(){
    console.info("...ngOnInit called")
  }


 onEditClick(event: any, i: number)
  {
    this.editClick.emit({ event, i});
  }

  onDeleteClick(event: any, i: number)
  {
    this.deleteClick.emit({ event, i});
  }
  
  toggleDetails()
  {
    this.hideDetails = !this.hideDetails;
  }
  



  
  @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent | any = null;

  isAllCheckedChange(b: boolean)
  {
    if (b)
    {
      this.selectionBox.check();
    }
    else
    {
      this.selectionBox.unCheck();
    }
  }

//                    or

  // @ContentChildren("selectionBox") selectionBoxes: QueryList<CheckBoxPrinterComponent> | any = null;

  // isAllCheckedChange(b: boolean)
  // {
  //   let selectionBox = this.selectionBoxes.toArray();
  //   if (b)
  //   {
  //     for (let i = 0; i < selectionBox.length; i++)
  //     {
  //       selectionBox[i].check();
  //     }
  //   }
  //   else
  //   {
  //     for (let i = 0; i < selectionBox.length; i++)
  //     {
  //       selectionBox[i].unCheck();
  //     }
  //   }
  // }
}
            





                                        // HIDESHOW FUNCTIONALITY USING RxJS SUBJECT


  // ngOnDestroy()
  // {
  //   this.MySubscription.unsubscribe();
  // }


                                        // CUSTOM RxJS OBSERVABLES

  // ngOnInit()
  // {
  //   this.projectsService.MyObservable.subscribe((hide: boolean) => {
  //     this.hideDetails = hide;
  //   });
  // }