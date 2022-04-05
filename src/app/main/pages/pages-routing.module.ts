import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
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
import { CancelBidComponent } from './cancel-bid/cancel-bid.component';
import { Biddingupdate2Component } from './biddingupdate2/biddingupdate2.component';
import { ConfirmAddressComponent } from './confirm-address/confirm-address.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path : 'thank-you',
    component :ThankYouComponent
  },
  {
    path : 'about',
    component :AboutComponent
  },
 
  {
    path : 'myProfile',
    component :MyProfileComponent,
    canActivate:[AuthGuard],
  },
  {
    path : 'edit-profile',
    component :EditProfileComponent,
    canActivate:[AuthGuard],
  },
 
  {
    path : 'edit-profile',
    component :EditProfileComponent,
    canActivate:[AuthGuard],
  },
 
  {
    path : 'save_list',
    component :SaveListComponent,
    canActivate:[AuthGuard],
  }, 
  {
    path : 'home',
    component :HomeComponent
  },
  {
    path : 'carlisting',
    component :CarListingComponent
  },
  {
    path : 'bidding',
    component :BiddingComponent
  },  
  {
    path : 'biddingupdate',
    component :BiddingUpdateComponent
  }, 
  {
    path : 'biddingupdate2',
    component :Biddingupdate2Component
  }, 
  
  {
    path : 'biddingcongratulations',
    component :BiddingCongratulationsComponent
  },
  {
    path : 'biddingbuy',
    component :BiddingBuyComponent
  },
  {
    path : 'watchlist',
    component :WatchlistComponent
  },
  {
    path : 'buynow',
     component :BuyNowComponent
  },
  {
    path : 'paymentmethod',
     component :PaymentMethodComponent
  },
  {
    path : 'orderreceipt',
     component :OrderReceiptComponent
  },
  {
    path : 'profile',
     component :ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'changepassword',
     component :ChangePasswordComponent
  },
  {
    path : 'notification',
     component :NotificationComponent
  },
  {
    path : 'managepayment',
     component :ManagePaymentsComponent
  },
  {
    path : 'contact',
     component :ContactUsComponent,
    canActivate:[AuthGuard],

  },
  {
    path : 'mybids',
     component :MyBidsComponent
  },
  {
    path : 'cardetails',
     component :CarDetailsComponent
  },
  {
    path : 'cancelbid',
     component :CancelBidComponent
  },
  {
    path : 'confirm',
     component :ConfirmAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
