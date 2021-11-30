import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './authentication/shared/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RecipeLayoutComponent } from './recipe-layout/recipe-layout.component';
import { MyRecipesComponent } from './recipe-layout/my-recipes/my-recipes.component';
import { SingleRecipeModalComponent } from './shared/components/single-recipe-modal/single-recipe-modal.component';
import { AccessibleRecipeModalComponent } from './shared/components/accessible-recipe-modal/accessible-recipe-modal.component';

const routes: Routes = [
  {path:'', redirectTo:'all-recipes', pathMatch:'full'},

  { path:'all-recipes', component:RecipeLayoutComponent},
  { path:'all-recipes/:recipe', component:AccessibleRecipeModalComponent},
  // { path:'all-recipes/:recipe', component:SingleRecipeModalComponent, canActivate:[ AuthGuard] },
  { path:'my-recipes', component:MyRecipesComponent, canActivate:[ AuthGuard] },

  { path: 'auth', component:AuthenticationComponent },

  { path: '**', component:RecipeLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }