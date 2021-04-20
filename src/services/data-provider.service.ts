import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiModel} from '../models/api.model';
import {Observable} from 'rxjs';
import {QuestionsrequestModel} from '../models/questionsrequest.model';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http: HttpClient) { }
  categories;
  fetchCategories(): Observable<ApiModel> {
     return  this.http.get<ApiModel>('https://opentdb.com/api_category.php');
  }
  fetchQuestions(data): Observable<QuestionsrequestModel>{
    return this.http.get<QuestionsrequestModel>(`https://opentdb.com/api.php?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`);
  }
}
