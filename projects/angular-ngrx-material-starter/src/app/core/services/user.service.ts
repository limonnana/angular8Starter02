import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entities/user';
import { Login } from '../../entities/login';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiResponse } from '../../entities/api.response';
import { HttpCustomService } from './http-custom.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  error: string | undefined;

  constructor(
    private http: HttpClient,
    private httpCustom: HttpCustomService
  ) {}

  user: User[];

  // return this.http.post<[User]>(`${environment.secureUserApi}/findAll`, new User());

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.secureUserApi}/findAll`);
  }

  public save(user: User) {
    console.log(JSON.stringify(user));
    return this.http.post<User>(`${environment.secureUserApi}/create`, user);
  }

  public register(login: Login) {
    console.log(JSON.stringify(login));
    return this.http.post<User>(`${environment.domain}/register`, login);
  }

  public delete(id: string) {
    return this.http.delete<ApiResponse>(
      `${environment.secureUserApi}/deleteUser/` + id
    );
  }

  getUserById(id: number) {
    return this.http.get<User>(`${environment.secureUserApi}/getUser/` + id);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http
      .put<ApiResponse>(
        `${environment.secureUserApi}/updateUser/` + user.id,
        user
      )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  isEmailTaken(login: Login): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.domain}/emailTaken/`, login 
    );
  }

  handleError(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
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
