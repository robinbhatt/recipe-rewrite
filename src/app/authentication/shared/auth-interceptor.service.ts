import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable() 
// We do not provideIn:root in Interceptors
// We do it module so that Angular understands it
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService : AuthService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler){

   return this._authService.userBehaviorSub.pipe( 
      take(1),
      exhaustMap( (user : any) =>{

        if(!user){
          return next.handle(req);
        }

        const modifiedReq = req.clone({  params : new HttpParams().set('auth',user?.token)   });
        return next.handle(modifiedReq);

      }))

  }


}



