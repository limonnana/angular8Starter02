import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../../entities/role';
import { Credentials } from '../../entities/credentials';


const credentialsKey = 'credentials';
const nameKey = 'name';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private _credentials: Credentials | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  
  isAuthenticated(): boolean {
    return  !!this.credentials;
  }

  getRole(): Role{
    if(this._credentials){
      return this.credentials.role;
    }
      return null;
    }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }


  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  setName(name: string) {
    localStorage.setItem(nameKey, name);
  }
}
