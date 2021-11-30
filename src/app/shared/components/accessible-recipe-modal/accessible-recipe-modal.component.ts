import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accessible-recipe-modal',
  templateUrl: './accessible-recipe-modal.component.html',
  styleUrls: ['./accessible-recipe-modal.component.css']
})
export class AccessibleRecipeModalComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('recipe'))
    this.route.paramMap.subscribe(param => {  console.log(param.get('recipe'))  })
  }

}
