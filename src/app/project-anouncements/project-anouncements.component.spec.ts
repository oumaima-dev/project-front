import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAnouncementsComponent } from './project-anouncements.component';

describe('ProjectAnouncementsComponent', () => {
  let component: ProjectAnouncementsComponent;
  let fixture: ComponentFixture<ProjectAnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAnouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
