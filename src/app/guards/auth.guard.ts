import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalService } from '../auth/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private modalService:ModalService) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
    if (localStorage[environment.storageKey]) {
      var user =JSON.parse(localStorage[environment.storageKey]);
    } else {
      user = '';
    }
    if (user) {
      if(user.isProfileSetup){
        this.modalService.profileSetup(user);
        this.router.navigate(['/main/home']);
        return false
      }
      else{
      return true;
      }
    }
    else{
      this.router.navigate(['/main/home'])
    }
    this.modalService.openSignIn();
    this.router.navigate(['/main/home'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
  
}
