import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  idLoggedIn:any
  constructor(private router:Router, private _authService:AuthService){
    console.log('AuthGuard');
    this._authService.userBehaviorSub.subscribe((user)=>{
      this.idLoggedIn = user
    })
   }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.idLoggedIn)
      { alert('Kindly login to access this menu. You will be redirected to signin page');
      this.router.navigate(['auth']);
      return false;  }
   
      return true;

    }
  
}
