import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
 
  loginMode=true;
  loginForm: FormGroup;
  isLoading:boolean = false;
  responseError = '';  
  @ViewChild(FormGroupDirective,{ static: false}) formGroupDirective: FormGroupDirective;
  get formError() { return this.loginForm.controls; }

  constructor(
    private _fb:FormBuilder,
    private _authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      email : ['',[Validators.required,Validators.minLength(5),Validators.email]],
      password : ['',[Validators.required,Validators.minLength(6)]],
      profileUrl : [''],
    })
  }

  switchLogin(){
    this.loginMode = !this.loginMode;
    this.formGroupDirective.resetForm()
  }

  onSubmit() {

    if(this.loginForm.invalid){ return; }

    const email:string = this.loginForm.value.email;
    const password:string = this.loginForm.value.password;
    const profileUrl:string = this.loginForm.value.profileUrl;
    this.formGroupDirective.resetForm()
    this.isLoading = true;

    if(this.loginMode){
      this._authService.signInWithEmailAndPassword_Firebase(email, password)
      .pipe(
        finalize(()=> this.isLoading = false)
      )
      .subscribe(()=> {
        this.isLoading = false;
        this.router.navigateByUrl('/all-recipes');
      },
      (err)=>{
        console.log(err);
        const errCode = err.error.error.code;
        const errMsg = err.error.error.message;
        this.responseError = `An error occured. Code : ${errCode} Message : ${errMsg}`
      })

    } else {
      this._authService.signUpWithEmailAndPassword_Firebase(email, password, profileUrl)
      .pipe(
        finalize(()=> this.isLoading = false)
      )
      .subscribe(()=> { 
        this.isLoading = false;
        this.router.navigateByUrl('/all-recipes');
      },
      (err)=>{
        console.log(err);
        const errCode = err.error.error.code;
        const errMsg = err.error.error.message;
        this.responseError = `An error occured. Code : ${errCode} Message : ${errMsg}`
      })
    }

  }


}
