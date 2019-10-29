import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../entities/user';
import { environment } from '../../../environments/environment';  
import { Login } from '../../entities/login';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


export interface Credentials {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  error: string | undefined;
  credentials: Credentials = { username: '', token: '' };

  constructor(private httpClient: HttpClient) { }

  public authenticate(context: Login){
    return this.httpClient
    .post<User>(`${environment.domain}/authenticate`, context)
    .pipe(
      retry(1),
        catchError(this.handleError)
      )
  }
  
  /*
  login(context: LoginContext): Credentials {
    const data = {
      username: context.username,
      password: context.password,
      remember: context.remember
    };
    const auth = {
      username: context.username,
      password: context.password
    };

    this.httpClient
      .post<User>(`${environment.secureUserApi}/authenticate`, auth)
      .pipe(
        map(user => {
          console.log(' User: ' + user.name);
          // login successful if there's a jwt token in the response
          console.log('User.token: ' + user.token);
          if (user && user.token) {
            this.credentials.username = user.name;
            this.credentials.token = user.token;
            this.credentialsService.setCredentials(this.credentials, data.remember);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          } else {
            console.log(`Error on login in `);
            this.error = 'error';
          }
        })
      )
      .subscribe(
        theCredentials => {
          console.log(` credential.token: ${this.credentials.token} successfully logged in`);
        },
        error => {
          console.log(`Login error: ${error}`);
          this.error = error;
        }
      );
    return this.credentials;
  }
  */

 handleError(error: { error: { message: string }; status: any; message: any }) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}
}

