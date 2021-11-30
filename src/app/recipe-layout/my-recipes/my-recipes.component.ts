import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {

  addRecipe = false;
  recipesData:any = [];
  constructor(private _recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes()
  }

  getAllRecipes(){
    const userUID = JSON.parse(localStorage.getItem('userData') as any);

    this._recipeService.getLoggedInUserRecipes_Firebase(userUID.id)
    .subscribe((recipes) => {
      if(recipes){
        const sortedRecipe = Object.entries(recipes).reverse()
        this.recipesData = sortedRecipe;   
  
      }
    })
  }


  @ViewChildren("allTabs") allTabs:any; // QueryList<any>=''
  
  ngAfterViewInit() {
    // console.log('total tabs: ' + this.allTabs.first._tabs.length);
  }

  tabChanged(tabChangeEvent: number) {
    // console.log('tab selected: ' + tabChangeEvent);
  }

}
