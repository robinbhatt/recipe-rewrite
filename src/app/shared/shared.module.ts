import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';
import { SingleRecipeModalComponent } from './components/single-recipe-modal/single-recipe-modal.component';
import { AccessibleRecipeModalComponent } from './components/accessible-recipe-modal/accessible-recipe-modal.component';

const sharedExport = [
  LoadingSpinnerComponent,
  SingleRecipeComponent,
  RecipeFormComponent,
  SingleRecipeModalComponent,
  
  AngularMaterialModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
 ];

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    RecipeFormComponent,
    SingleRecipeComponent,
    SingleRecipeModalComponent,
    AccessibleRecipeModalComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ sharedExport ]

})
export class SharedModule { }
