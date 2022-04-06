import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatDialogRef } from '@angular/material/dialog';
// import { DialogService } from './services/dialog.service';
import {MatTabsModule} from '@angular/material/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { BlogsComponent } from './blogs/blogs.component';
// import { PaginationModule } from 'ngx-pagination-bootstrap'
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SaveListComponent } from './save-list/save-list.component';
import { HomeComponent } from './home/home.component';
import { CarListingComponent } from './car-listing/car-listing.component';
import { BiddingComponent } from './bidding/bidding.component';
import { BiddingUpdateComponent } from './bidding-update/bidding-update.component';
import { BiddingCongratulationsComponent } from './bidding-congratulations/bidding-congratulations.component';
import { BiddingBuyComponent } from './bidding-buy/bidding-buy.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { OrderReceiptComponent } from './order-receipt/order-receipt.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationComponent } from './notification/notification.component';
import { ManagePaymentsComponent } from './manage-payments/manage-payments.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import {MatRadioModule} from '@angular/material/radio';
import { CancelBidComponent } from './cancel-bid/cancel-bid.component';
import { Biddingupdate2Component } from './biddingupdate2/biddingupdate2.component';
import { ConfirmAddressComponent } from './confirm-address/confirm-address.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';



@NgModule({
  declarations: [ BlogsComponent,  AboutComponent, MyProfileComponent, EditProfileComponent, ThankYouComponent, SaveListComponent, HomeComponent, CarListingComponent, BiddingComponent, BiddingUpdateComponent, BiddingCongratulationsComponent, BiddingBuyComponent, WatchlistComponent, BuyNowComponent, PaymentMethodComponent, OrderReceiptComponent, ProfileComponent, ChangePasswordComponent, NotificationComponent, ManagePaymentsComponent, ContactUsComponent, MyBidsComponent, CarDetailsComponent, CancelBidComponent, Biddingupdate2Component, ConfirmAddressComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    PaginationModule,
    MatInputModule,
    MatTreeModule,
    MatCheckboxModule,
    NgxPaginationModule,
    SlickCarouselModule,
    PaginationModule,
    NgxSliderModule,MatRadioModule,
    NgxIntlTelInputModule,
    GooglePlaceModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    // DialogService
 ],
})
export class PagesModule { }
