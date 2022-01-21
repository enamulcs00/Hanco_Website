import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Biddingupdate2Component } from './biddingupdate2.component';

describe('Biddingupdate2Component', () => {
  let component: Biddingupdate2Component;
  let fixture: ComponentFixture<Biddingupdate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Biddingupdate2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Biddingupdate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
