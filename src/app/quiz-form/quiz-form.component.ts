import {Component, OnInit} from '@angular/core';
import {DifficultiesModel} from '../../models/difficulties.model';
import {TypesModel} from '../../models/types.model';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoriesModel} from '../../models/categories.model';
import {DataProviderService} from '../../services/data-provider.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
})
export class QuizFormComponent implements OnInit {
  title = 'sweeft';
  categories: CategoriesModel[];
  difficulties: DifficultiesModel[] = [
    {difficulty: 'Any Difficulty', value: ''},
    {difficulty: 'Easy', value: 'easy'},
    {difficulty: 'Medium', value: 'medium'},
    {difficulty: 'Hard', value: 'hard'}
  ];
  types: TypesModel[] = [
    {type: 'Any Type', value: ''},
    {type: 'Multiple Choice', value: 'multiple'},
    {type: 'True/False', value: 'boolean'}
  ];
  gameForm: FormGroup;

  constructor(private data: DataProviderService , private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.gameForm = new FormGroup({
      amount: new FormControl(1),
      category: new FormControl(9),
      difficulty: new FormControl(this.difficulties[0].value),
      type: new FormControl(this.types[0].value)
    });
  }

  getCategories(): void {
    this.data.fetchCategories().subscribe(categories => this.categories = categories.trivia_categories);
  }

  onSubmit(): void {
    this.router.navigate(['game'] , { queryParams: {
      difficulty : this.gameForm.value.difficulty,
      amount : this.gameForm.value.amount,
      category : this.gameForm.value.category,
      type : this.gameForm.value.type
    }});
  }
}
