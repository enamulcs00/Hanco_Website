import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSkillComponent } from './work-skill.component';

describe('WorkSkillComponent', () => {
  let component: WorkSkillComponent;
  let fixture: ComponentFixture<WorkSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
