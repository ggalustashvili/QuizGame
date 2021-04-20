import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataProviderService} from '../../../services/data-provider.service';
import {map} from 'rxjs/operators';
import {FormArray, FormControl} from '@angular/forms';
import {QuestionsModel} from '../../../models/questions.model';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css'],
})
export class QuizGameComponent implements OnInit {
  params;
  questions: Array<QuestionsModel>;
  gameForm = new FormArray([]);

  constructor(private data: DataProviderService, private router: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    this.params = this.router.snapshot.queryParams;
    this.getQuestions();
    this.addFormControls();
  }

  getQuestions(): void {
    this.data.fetchQuestions(this.params).pipe(map(ResponseData => {
      for (const item of ResponseData.results) {
        item.incorrect_answers.push(item.correct_answer);
        item.incorrect_answers.sort(() => Math.random() - 0.5);
      }
      return ResponseData;
    })).subscribe(questions => this.questions = questions.results);
  }

  onSubmit(): void {
    if (this.gameForm.value.includes('')) {
      alert('please answer all question');
      return;
    }
    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].correct_answer === this.gameForm.value[i]) {
        score++;
      }
    }
    const result = confirm('you scored ' + score + ' would u like to start again?');
    if (result) {
      this.route.navigate(['']);
    }
  }

  addFormControls(): void {
    for (let i = 0; i < this.params.amount; i++) {
      this.gameForm.push(new FormControl(''));
    }
  }
}
