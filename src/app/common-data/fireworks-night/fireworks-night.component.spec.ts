import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireworksNightComponent } from './fireworks-night.component';

describe('FireworksNightComponent', () => {
  let component: FireworksNightComponent;
  let fixture: ComponentFixture<FireworksNightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireworksNightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireworksNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
