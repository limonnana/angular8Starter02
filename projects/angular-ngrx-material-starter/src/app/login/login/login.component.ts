import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Login } from '../../entities/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { User } from '../../entities/user';
import {Router} from "@angular/router";
import {CredentialsService } from '../../core/services/credentials.service';
import { Credentials } from '../../entities/credentials';
import { ValidationService } from '../../core/services/validation.service';
import { Role } from '../../entities/role';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  authLogin,
  authLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/../../core/core.module';


@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  
  wrongCredentials: string | undefined;
  loginForm!: FormGroup;
  user: User;
  credentials = new Credentials('', '',  Role.USER);
  isAuthenticated$: Observable<boolean>;

  constructor( private formBuilder: FormBuilder,
     private loginService: LoginService,
     private router: Router,
     private credentialsService: CredentialsService,
     private store: Store<AppState>,
     private storageService: LocalStorageService
  )
  {
    this.createForm();
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    console.log('isAuthenticated: ' + this.isAuthenticated$.toPromise);
    }
  submitted = false;

  login() {
    
    this.loginService.authenticate(this.loginForm.value).subscribe(data => {
      this.user = data;
      console.log('User Logged: ' + JSON.stringify(this.user));
      if(this.user.token){
            this.credentials.username = this.user.email;
            this.credentials.token = this.user.token;
            this.credentials.role = this.user.role;
            //this.credentialsService.setCredentials(this.credentials,this.loginForm.value.rememberMe);
            this.store.dispatch(authLogin());
            this.router.navigate(['home']);
      }else{
        this.wrongCredentials = "wrong credentials";
     }
    });
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  
  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],// Validators.required],
      password: ['']//, Validators.required],
      //rememberMe: false
    });
  }

}
