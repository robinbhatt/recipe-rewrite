import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private _http:HttpClient,
    // private _fs_db:AngularFirestore    
    ) { }

  // getAllRecipes_Firebase(){  return this._fs_db.collection('recipes');  }
  getAllRecipes_Firebase(){ 
   return this._http.get('https://recipebookplain-default-rtdb.firebaseio.com/container/all-recipes.json')
    }

  saveRecipeGlobal_FIrebase(recipe:any){ //Recipe
    return this._http.post('https://recipebookplain-default-rtdb.firebaseio.com/container/all-recipes.json',recipe)
  }

    getLoggedInUserRecipes_Firebase(userUID:string){
      return this._http.get('https://recipebookplain-default-rtdb.firebaseio.com/container/users/' + userUID + '/myrecipes.json')
    }

    saveLoggedInUserRecipes_Firebase(userUID:string, recipe:any){ // recipe:Recipe
      return this._http.post('https://recipebookplain-default-rtdb.firebaseio.com/container/users/' + userUID + '/myrecipes.json',recipe)
    }
  

}

