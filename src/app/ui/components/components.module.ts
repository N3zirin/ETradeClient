import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { RegisterModule } from './register/register.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { PasswordResetModule } from './password-reset/password-reset.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    UpdatePasswordModule,
    PasswordResetModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule { }
