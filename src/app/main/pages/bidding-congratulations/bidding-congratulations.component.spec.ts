import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingCongratulationsComponent } from './bidding-congratulations.component';

describe('BiddingCongratulationsComponent', () => {
  let component: BiddingCongratulationsComponent;
  let fixture: ComponentFixture<BiddingCongratulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingCongratulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
