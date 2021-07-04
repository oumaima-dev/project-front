import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInvestmentsComponent } from './user-investments.component';

describe('UserInvestmentsComponent', () => {
  let component: UserInvestmentsComponent;
  let fixture: ComponentFixture<UserInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInvestmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
