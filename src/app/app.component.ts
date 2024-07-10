import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;


  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, readonly httpClientService: HttpClientService, private dynamicLoadComponentService: DynamicLoadComponentService){

    httpClientService.put({
      controller: "baskets"
    }, {
      basketItemId: "8E9166DE-29A4-42FC-99DC-08DC8AB42120",
      quantity: 125
    }).subscribe(data =>{
    });
    authService.identityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("You signed out of you account.", "Logged out", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    });
  }
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}