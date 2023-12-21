import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpClientModule } from '@angular/common/http';
describe('ProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProjectsService],
    });
  });

  it('should be created', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });
});