import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/shared/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  userAuthSubscription : Subscription;
  userDetailsSubscription : Subscription;

  isUserAuthenticated = false
  userDetails : any= []

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.userAuthSubscription = this._authService.userBehaviorSub.subscribe(user=>{ 
      console.log(user);
      this.isUserAuthenticated = !!user;
    })

    this.userDetailsSubscription = this._authService.userDetailsBehaviorSub.subscribe(userDetails=>{ 
      console.log(userDetails);
      this.userDetails = userDetails;
    })
  }

  logout(){
    this._authService.logout()
  }

  ngOnDestroy(){
    this.userAuthSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe()
  }

}
