import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationErrors } from '@iplab/ngx-file-upload';
import { UserService } from '../../../services/common/models/user.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {
is: any;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: CustomToastrService,
    spinner: NgxSpinnerService
  ){
    super(spinner)
  }
  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      fullName: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      userName: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.maxLength(150), Validators.email]],
      password: ["", [Validators.required]],
      passwordConfirm: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => { 
        let password  = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : {notSame: true};
    }
   })
  }
  get component(){
    return this.frm.controls;
  }
  
  submitted: boolean = false;
  debugger;
  async onSubmit(user: User){
    this.submitted = true;
    debugger;
    if (this.frm.invalid) 
      return;
    
    const result: Create_User = await this.userService.create(user);
    if(result.succeeded)
      this.toastService.message(result.message, "User created.", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
      else
      this.toastService.message(result.message, "User creating failed.", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
    })
  }
}
