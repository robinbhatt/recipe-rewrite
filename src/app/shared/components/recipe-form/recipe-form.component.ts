import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent { // implements OnInit {

  recipeForm: FormGroup;
  isLoading:boolean = false;
  responseError = '';  
  @ViewChild(FormGroupDirective,{ static: false}) formGroupDirective: FormGroupDirective;
  get formError() { return this.recipeForm.controls; }

  constructor(
    private _fb:FormBuilder,
    private _recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.recipeForm = this._fb.group({
      Name : ['',[Validators.required,Validators.minLength(5)]],
      Description : ['',[Validators.required,Validators.minLength(20)]],
      Image_Path : ['https://media.istockphoto.com/photos/chicken-tikka-biryani-made-of-basmati-rice-cooked-with-masala-spices-picture-id1292437269'],
    })
  }

  onSubmit() {

    const userUID = JSON.parse(localStorage.getItem('userData') as any);

    if(this.recipeForm.invalid || !userUID){ return; }
    this.isLoading = true;

    this._recipeService.saveRecipeGlobal_FIrebase(this.recipeForm.value)
    .pipe(
      finalize(()=> this.isLoading = false)
    )
    .subscribe(
      (resData)=> {
      console.log(resData);
      this.isLoading = false;
      // this.router.navigateByUrl('/all-recipes');
    },
    (err)=>{
      console.log(err);
      const errCode = err.error.error.code;
      const errMsg = err.error.error.message;
      this.responseError = `An error occured. Code : ${errCode} Message : ${errMsg}`
    }
     )
    //  this.formGroupDirective.resetForm()
    this._recipeService.saveLoggedInUserRecipes_Firebase(userUID.id,this.recipeForm.value).subscribe(res=>{ console.log(res)})
  }




}
