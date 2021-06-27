import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountProjectsComponent } from './user-account-projects.component';

describe('UserAccountProjectsComponent', () => {
  let component: UserAccountProjectsComponent;
  let fixture: ComponentFixture<UserAccountProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
