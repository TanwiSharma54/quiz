import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }
  getQuizes() {
    return this.builtInAngularHttpClient.get("https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz");
    /*return [
      {name: 'quiz 1', numberQuestions: 3}
      ,{name: 'quiz 2', numberQuestions: 0} 
    ]; */
  }
  getNumberPromise(doYouWantmeToSucceed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => doYouWantmeToSucceed ? resolve(42) : reject("you got problem!")
    );
    return p;
  }
}
