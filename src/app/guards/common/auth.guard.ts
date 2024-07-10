import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinnerService: NgxSpinnerService){

  }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  this.spinnerService.show(SpinnerType.BallAtom);
  // const token: string = localStorage.getItem("accessToken");
  // //const decodeToken = this.jwtHelper.decodeToken(token);
  // //const expirationdate: Date = this.jwtHelper.getTokenExpirationDate(token);
  // let expired: boolean;
  // try {
  //   expired  = this.jwtHelper.isTokenExpired(token);

  // } catch {
  //   expired = true;
  // }
  if (!_isAuthenticated) {
    this.router.navigate(["login"], {queryParams: {returnUrl: state.url}});
    this.toastrService.message("Sign in to your account.", "Sign in", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
    })
  }
this.spinnerService.hide(SpinnerType.BallAtom);
  return true;
 }
}
