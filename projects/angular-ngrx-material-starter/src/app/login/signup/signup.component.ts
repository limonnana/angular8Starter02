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
    const userFromForm: Login = this.registerForm.value;
    this.error = this.validationService.validateRegisterForm(userFromForm);
    if (this.error != null) {
      console.log('error from form: ' + this.error);
      return;
    } else {
      this.userService.register(userFromForm).subscribe(data => {
        this.router.navigate(['login']);
      });
    }
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required]
    });
  }

  public isEmailTaken() {
    this.error = '';
    let result = 'false';
    const userFromForm: Login = this.registerForm.value;
    let email: string = userFromForm.email;
    this.userService.isEmailTaken(email).subscribe(data => {
      if (data.result === 'true') {
        this.email = 'true';
        this.error =
          'Email already registered, please login or use forgot password ';
      } else {
        this.email = 'false';
      }
    });
  }
}
