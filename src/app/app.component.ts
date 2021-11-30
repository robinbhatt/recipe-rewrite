import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './authentication/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RecipesApp';

  constructor( private _authService:AuthService, private route:ActivatedRoute){ }


  ngOnInit(){
    this._authService.autoLogin();

    console.log(this.route.snapshot.paramMap.get('recipe'))
    this.route.paramMap.subscribe(param => {  console.log(param.get('recipe'))  })

    // const recipeName = this.route.snapshot.paramMap.get('recipe');
    // if(recipeName !== null){
    //   console.log(recipeName)
    // }

  }




}

