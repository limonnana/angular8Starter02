import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomService {
  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  // console.log('the Credentials: ' + this.credentialJson);

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('useremail', 'myEmail ');
  }

  get(url): Observable<any> {
    let headers = new HttpHeaders({ useremail: 'myEmail ' });
    // let httpOptions={ headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    // httpOptions.headers = httpOptions.headers.append('Token', 'miToken');
    // this.createAuthorizationHeader(headers);
    // {headers: new HttpHeaders().set('UserEmail', 'email' ) }
    return this.http.get(url, { headers: headers });
  }

  post(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  myCredentials(): string {
    let currentUserCredentials = this.credentialsService.credentials;
    let credentialJson = JSON.stringify(currentUserCredentials);
    return credentialJson;
  }
}
