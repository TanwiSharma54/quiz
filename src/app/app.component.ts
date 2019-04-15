import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
  questions: QuestionDisplay[];
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
          }));
      }
      ,(error) => {
        console.log(error);
      }
    );
  };
  title = 'quiz-editor';
  myWidth = 250;

  makeImageLarger(){
    this.myWidth *=1.3;
  }
  //Read only #get Property
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }

}
