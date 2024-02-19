import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      imports: [HttpClientTestingModule,FormsModule,ReactiveFormsModule], // Add HttpClientTestingModule to imports
      providers: [ProjectsService], // Add ProjectsService to providers
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});