import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBidComponent } from './cancel-bid.component';

describe('CancelBidComponent', () => {
  let component: CancelBidComponent;
  let fixture: ComponentFixture<CancelBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelBidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
