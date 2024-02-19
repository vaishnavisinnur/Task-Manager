import { ProjectsService } from "../services/projects.service";
import { ProjectIDUniqueValidatorDirective } from "./project-id-unique-validator.directive";

describe('ProjectIDUniqueValidatorDirective', () => {
  it('should create an instance', () => {
    const projectsServiceStub = {} as ProjectsService; // Create a mock ProjectsService
    const directive = new ProjectIDUniqueValidatorDirective(projectsServiceStub);
    expect(directive).toBeTruthy();
  });
});