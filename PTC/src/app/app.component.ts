import {Component} from '@angular/core';
import {AppUserAuth} from './security/app-user-auth';
import {SecurityService} from './security/security.service';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'Paul\'s Training Company';
  securityObject: AppUserAuth = null;


  constructor(private securityService: SecurityService) {
    this.securityObject = this.securityService.securityObject;
  }

  logout(){
    this.securityService.logout();
  }
}