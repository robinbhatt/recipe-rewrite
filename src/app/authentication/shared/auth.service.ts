import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponseData } from '../shared/auth-response.model';
import { User } from '../shared/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userBehaviorSub = new BehaviorSubject<User | null>(null);
  userDetailsBehaviorSub = new BehaviorSubject<any>([]);
  private tokenExpTimer :any;
  baseUrl = 'https://recipebookplain-default-rtdb.firebaseio.com/container/users'
  defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

  constructor(private _httpService:HttpClient, private router:Router) { }

  signUpWithEmailAndPassword_Firebase(email:string,password:string, profileUrl:string){
    return this._httpService
    .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEEvUW1Xm8StUJK7HBBdPZSuYMEHtqh_I`,
    { email : email, password : password, returnSecureToken	: true})
    .pipe(
      tap((userObject)=>{
        const expirationDate = new Date(new Date().getTime() + +userObject.expiresIn * 1000);
        const user = new User(userObject.email, userObject.localId, userObject.idToken, expirationDate);
        this.userBehaviorSub.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.createNewUser(userObject.email,profileUrl, userObject.localId);
      })
    )
  }

  signInWithEmailAndPassword_Firebase(email:string,password:string){
    return this._httpService
    .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEEvUW1Xm8StUJK7HBBdPZSuYMEHtqh_I`,
    { email : email, password : password, returnSecureToken	: true})
    .pipe(
      tap((userObject)=>{
        const expirationDate = new Date(new Date().getTime() + +userObject.expiresIn * 1000);
        const user = new User(userObject.email, userObject.localId, userObject.idToken, expirationDate);
        this.userBehaviorSub.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.emitUserDetails(userObject.localId)
        // this.autoLogout(111)
      })
    )
  }

  autoLogin(){
    const userdata:any = localStorage.getItem('userData');
    const parsedUser = JSON.parse(userdata)

    if(!parsedUser){ return }
    const loadedUser = new User(parsedUser.email, parsedUser.id, parsedUser._token, new Date(parsedUser._tokenExpiratonDate) )
    
    if(loadedUser.token){
      this.userBehaviorSub.next(loadedUser);
      this.emitUserDetails(loadedUser.id)
      // const expDuration = new Date(parsedUser._tokenExpiratonDate).getTime() - new Date().getTime();
      // this.autoLogout(expDuration)

    }
  }

  // autoLogout(expDuration :number){
  //   this.tokenExpTimer = setTimeout(()=>{ this.logout() },
  //   expDuration)
  // }

  logout(){
    this.userBehaviorSub.next(null);
    this.userDetailsBehaviorSub.next([]);
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/auth');
    if(this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer)
    }
    this.tokenExpTimer = null
  }

  createNewUser(userName:string, profilePicUrl:string = this.defaultAvatar, authUserUID:string){
    const user = { userName : userName, ppURL : profilePicUrl, userUID : authUserUID  };
    this._httpService.post(this.baseUrl+'/'+authUserUID+'/userdetails.json', user).subscribe(()=>this.emitUserDetails(authUserUID))
  }

  emitUserDetails(userUID:string){
    this._httpService.get(this.baseUrl+'/'+userUID+'/userdetails.json').subscribe((userDetails)=>{
      if(userDetails !== null){
        const UD = Object.entries(userDetails)
        this.userDetailsBehaviorSub.next(UD[0][1]);
      }
    })
  }


}

    // .pipe(
    //   map((response)=>{
    //     return response as AuthResponseData
    //   }),
    //   catchError((error:HttpErrorResponse)=>{
    //     console.log(error)
    //    return throwError(error)})
    // )