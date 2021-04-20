import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuizGameComponent } from './quiz-form/quiz-game/quiz-game.component';
import { AppRoutingModule } from './app-routing.module';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import {DataProviderService} from '../services/data-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    QuizGameComponent,
    QuizFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule, AppRoutingModule
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
