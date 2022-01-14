import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingBuyComponent } from './bidding-buy.component';

describe('BiddingBuyComponent', () => {
  let component: BiddingBuyComponent;
  let fixture: ComponentFixture<BiddingBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
