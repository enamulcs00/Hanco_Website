import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongartsComponent } from './congarts.component';

describe('CongartsComponent', () => {
  let component: CongartsComponent;
  let fixture: ComponentFixture<CongartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
