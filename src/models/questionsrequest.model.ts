import {QuestionsModel} from './questions.model';

export interface QuestionsrequestModel{
  response_code: string;
  results: Array<QuestionsModel>;
}
