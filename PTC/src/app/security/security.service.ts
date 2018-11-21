import {Injectable} from '@angular/core';
import {AppUserAuth} from './app-user-auth';
import {AppUser} from './app-user';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const API_URL = 'https://localhost:44359/api/security/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();


  constructor(private http: HttpClient) {
  }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    return this.http.post<AppUserAuth>(API_URL + 'login',
      entity, httpOptions).pipe(
      tap(resp => {
        // Use object assign to update the current object
        // NOTE: Don't create a new AppUserAuth object
        //       because that destroys all references to object
        Object.assign(this.securityObject, resp);
        // Store into local storage
        localStorage.setItem('bearerToken',
          this.securityObject.bearerToken);
      }));

  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;

    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategory = false;

    localStorage.removeItem('bearerToken');
  }
}
