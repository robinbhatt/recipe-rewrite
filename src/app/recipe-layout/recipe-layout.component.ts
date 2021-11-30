import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-layout',
  templateUrl: './recipe-layout.component.html',
  styleUrls: ['./recipe-layout.component.css']
})
export class RecipeLayoutComponent implements OnInit {


  recipesData:any = [];
  constructor(private _recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes()
  }

  getAllRecipes(){
    this._recipeService.getAllRecipes_Firebase()
    .subscribe((recipes) => {  
      const sortedRecipe = Object.entries(recipes).reverse()
      this.recipesData = sortedRecipe;   

       })
  }

}
