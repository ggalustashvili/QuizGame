import {Component, OnInit} from '@angular/core';
import {DataProviderService} from '../services/data-provider.service';
import {DifficultiesModel} from '../models/difficulties.model';
import {TypesModel} from '../models/types.model';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoriesModel} from '../models/categories.model';
import {QuestionsModel} from '../models/questions.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sweeft';
  categories: CategoriesModel[];
  questions: Array<QuestionsModel>;
  difficulties: DifficultiesModel[]  = [
    {difficulty: 'Any Difficulty' , value: ''},
    {difficulty: 'Easy' , value: 'easy'},
    {difficulty: 'Medium' , value: 'medium'},
    {difficulty: 'Hard' , value: 'hard'}
    ];
  types: TypesModel[] = [
    {type: 'Any Type' , value: ''},
    {type: 'Multiple Choice' , value: 'multiple'},
    {type: 'True/False' , value: 'boolean'}
    ];
    gameForm: FormGroup;
  constructor(private data: DataProviderService) {}
  ngOnInit(): void {
    this.getCategories();
    this.createFormGroup();
   }
   createFormGroup(): void{
     this.gameForm = new FormGroup({
       amount: new FormControl('Enter amount'),
       category: new FormControl(),
       difficulty: new FormControl(this.difficulties[0].value),
       type: new FormControl(this.types[0].value)
     });
   }
   getCategories(): void{
    this.data.fetchCategories().subscribe(categories => this.categories = categories.trivia_categories);
   }
   onSubmit(): void{
    this.data.fetchQuestions(this.gameForm.value).pipe(map(ResponseData => {
      for (const item of ResponseData.results){
        item.incorrect_answers.push(item.correct_answer);
        item.incorrect_answers.sort(() => Math.random() - 0.5);
      }
      return ResponseData;
    })).subscribe(data => this.questions = data.results);
   }
}
