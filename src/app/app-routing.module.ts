import { NgModule } from '@angular/core';
import {QuizGameComponent} from './quiz-form/quiz-game/quiz-game.component';
import {RouterModule, Routes} from '@angular/router';
import {QuizFormComponent} from './quiz-form/quiz-form.component';

const routes: Routes = [
  {path: '' , component: QuizFormComponent},
  {path: 'game', component: QuizGameComponent}
];

@NgModule({
  declarations: [],
  imports: [
     RouterModule.forRoot((routes))
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
