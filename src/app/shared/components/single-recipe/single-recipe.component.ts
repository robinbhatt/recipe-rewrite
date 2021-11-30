import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SingleRecipeModalComponent } from '../single-recipe-modal/single-recipe-modal.component';

@Component({
  selector: 'single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {

  constructor(public dialog: MatDialog, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    const recipeName = this.route.snapshot.paramMap.get('recipe');
    console.log(recipeName)

    // if(recipeName !== null){
    //   console.log(recipeName)
    // }
    }

  @Input() singleRecipe :any; // Recipe
  @Input() recipeData :any; // Recipe

  viewRecipe(){
    let oldUrl = window.location.href;
    let recipedialog = this.dialog.open(SingleRecipeModalComponent,
      { data:this.singleRecipe,
        disableClose:true})

    recipedialog.afterOpened().subscribe(res => {
      let urltoupdate='';
      let recipeSeoUrl = this.singleRecipe.Name.replace(/ /g, "-");

      if (true) {
        urltoupdate = window.location.protocol + '//' + window.location.host + `/all-recipes/${recipeSeoUrl}`; // ?ispersisit=yes
        if (window.history.replaceState) {
          window.history.replaceState({ path: urltoupdate }, '', urltoupdate);
        }
      }
    });

    recipedialog.afterClosed().subscribe(res => {
      window.history.replaceState({ path: oldUrl }, '', oldUrl);
    });
  }
}
