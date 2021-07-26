import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string = null;

  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }


  login() {
    this.securityService.login(this.user).subscribe(
      res => {
        this.securityObject = res;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      // handle 404 pb
      (error) => {
        // Initialize security object to display error message
        this.securityObject = new AppUserAuth();
        console.error("error while authenticating");
        console.error(error);
      });
  }
}
