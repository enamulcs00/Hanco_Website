import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobThankyouComponent } from './job-thankyou.component';

describe('JobThankyouComponent', () => {
  let component: JobThankyouComponent;
  let fixture: ComponentFixture<JobThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
