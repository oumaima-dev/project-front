import { TestBed } from '@angular/core/testing';

import { ProjectCreatorService } from './project-creator.service';

describe('ProjectCreatorService', () => {
  let service: ProjectCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
