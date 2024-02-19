import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/models/projects';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: Projects;
  routeParmsSubscription: Subscription | any = null;

  constructor(private activatedRoute: ActivatedRoute, private projectsService: ProjectsService) {
    this.project = new Projects();
  }

  ngOnInit() {
    this.routeParmsSubscription = this.activatedRoute.params.subscribe((params) => {
      let pid = params["projectid"];

      this.projectsService.getProjectByProjectID(pid).subscribe((proj: Projects) => {
        this.project = proj;
      });

    });
  }

  ngOnDestroy() {
    this.routeParmsSubscription.unsubscribe();
  }
}