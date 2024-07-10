import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(    private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router, private spinnerService: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   /// console.log("abc");
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
          
        case HttpStatusCode.Unauthorized: 

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
                  if(!state){
                  const url =  this.router.url;
                if(url == "/products")
                  this.toastrService.message("Create account before shopping.", "Create account", {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight
                })
                else
                this.toastrService.message("You can not reach this page.", "Unauthorized Member", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              }
              }).then(data => {

              });
          break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message("Unable to reach this page.", "Server Error", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight
            });
          break;

          case HttpStatusCode.BadRequest:
            this.toastrService.message("Something is wrong about request.", "Invalid Request", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight
            });
          break;

          case HttpStatusCode.NotFound:
            this.toastrService.message("This page is not accessable.", "Not Found", {
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.TopRight
          });
          
          break;
          default:
            this.toastrService.message("Unexpected error ocurred", "Error", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            });
            break;
      }

      this.spinnerService.hide(SpinnerType.BallAtom);
        return of(error);
    }));
  }
}
