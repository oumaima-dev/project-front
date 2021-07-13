import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectsDetailsComponent } from './user-projects-details.component';

describe('UserProjectsDetailsComponent', () => {
  let component: UserProjectsDetailsComponent;
  let fixture: ComponentFixture<UserProjectsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProjectsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
