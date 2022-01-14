import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperience2Component } from './work-experience2.component';

describe('WorkExperience2Component', () => {
  let component: WorkExperience2Component;
  let fixture: ComponentFixture<WorkExperience2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkExperience2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperience2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
