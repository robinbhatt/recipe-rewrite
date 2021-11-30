import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-recipe-modal',
  templateUrl: './single-recipe-modal.component.html',
  styleUrls: ['./single-recipe-modal.component.css']
})
export class SingleRecipeModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
