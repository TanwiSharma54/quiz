import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
  questions: QuestionDisplay[];
  markedForDelete: boolean;
}
interface QuestionDisplay {
  questionText: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private qSvc: QuizService) {
    //use the quiz service here but if it fails, the
    //creation of the component fails.
  }

  quizes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay= undefined;
  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz =q;
  }
  addNewQiz() {
    const newQuiz: QuizDisplay = {
      name: "untitled Quiz"
      ,numberOfQuestions: 0
      ,questions: []
      , markedForDelete: false
    };
    //create a new quiz list with new quiz
    this.quizes = [
      ...this.quizes
      , newQuiz
    ];
    this.selectedQuiz = newQuiz;
  }
  removeQuestion(questionToRemove) {
    this.selectedQuiz.questions = 
    this.selectedQuiz.questions.filter(x => x !== questionToRemove);
  }
 
  addNewQuestion() {
    this.selectedQuiz.questions= [
      ...this.selectedQuiz.questions
      , {
        questionText: "New Question"
      }
    ];
  }

  ngOnInit() {
    //console.log(this.qSvc.getQuizes());
    /*this.quizes = this.qSvc.getQuizes().map(x => ({
      name: x.name
      ,numberOfQuestions: x.numberQuestion
    })); */
    this.qSvc.getQuizes().subscribe(
      (data) => {
        this.quizes = (<any[]> data).map(x => 
          ({
            name: x.name
            ,numberOfQuestions: x.numberQuestions
            , questions: x.questions
            , markedForDelete: false
          }));
      }
      ,(error) => {
        console.log(error);
      }
    );
  };
  get mumberOfDeletedQuizzes() {
    return this.quizes.filter(x => x.markedForDelete).length;
  }
  get numberOfEditedQuizzes() {
    
  }
  title = 'quiz-editor';
  myWidth = 250;

  makeImageLarger(){
    this.myWidth *=1.3;
  }
  //Read only #get Property
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }
  promisesOne() {
    const n = this.qSvc.getNumberPromise(true);
    console.log(n);
    n.then(
      number => {
        console.log(".then");
        console.log(number);
        const anotherNumberPromise = this.qSvc.getNumberPromise(false);
        console.log(anotherNumberPromise);
        anotherNumberPromise.then(
          number => console.log(number)
        ).catch(
          error => console.log(error)
        )
      }
    ).catch(
      error => {
        console.log(".catch")
        console.log(error) 
      }

    );
  }
  async promisesTwo() {
    try {
      const n1 = await this.qSvc.getNumberPromise(true);
      console.log(n1);
      const n2 = this.qSvc.getNumberPromise(false);
      console.log(n2);
    }catch(error) {
      console.log("Promise2 catch");
      console.log(error);
    }
  }
  async promisesThree() {
    //parlor trick for concurrent promise execution
    try {
      const n1 = this.qSvc.getNumberPromise(true);
      console.log(n1);

      const n2 = this.qSvc.getNumberPromise(true);
      console.log(n2);
      const results = await Promise.all([n1, n2]);
      //const results = await Promise.race([n1, n2]);
      console.log(results)
    }catch(error) {
      console.log(error);
    }
    
  }
}
