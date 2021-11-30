import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeLayoutComponent } from './recipe-layout.component';

describe('RecipeLayoutComponent', () => {
  let component: RecipeLayoutComponent;
  let fixture: ComponentFixture<RecipeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
