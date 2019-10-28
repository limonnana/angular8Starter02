import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../core/core.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../entities/login';
import { ValidationService } from '../../core/services/validation.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
//import { Role } from '../entities/role';

@Component({
  selector: 'anms-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = require('../../../assets/release-butler.png');
  registerForm: FormGroup;
  login: Login;
  error: string;
  email: string = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private validationService: ValidationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  register() {
    const loginFromForm: Login = this.registerForm.value;
    this.error = this.validationService.validateRegisterForm(loginFromForm);
    if (this.error != null) {
      console.log('error from form: ' + this.error);
      return;
    } else {
      this.userService.register(loginFromForm).subscribe(data => {
        this.router.navigate(['login']);
      });
    }
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      retypePassword: ['']
    });
  }

  
  public isEmailTaken() {
    this.error = '';
   
    const userFromForm: Login = this.registerForm.value;
    let email: string = userFromForm.email;
    this.userService.isEmailTaken(userFromForm).subscribe(data => {
      if (data.result === 'true') {
        this.error =
          'Email already registered, please login or use forgot password ';
    } 
    });
  }
}
