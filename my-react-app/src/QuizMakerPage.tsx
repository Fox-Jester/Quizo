
import {useState, useRef, useEffect} from "react"

import QuizMakerSection1 from "./QuizMakerSection1.tsx";
import QuizMakerSection2 from "./QuizMakerSection2.tsx";


function QuizMakerPage(){
    
    
    
    const [section, setSection] = useState(<QuizMakerSection1/>)
    

    useEffect(() => {

      

        const section1SubmitBtn = document.querySelector("#section1-submit-btn");
        section1SubmitBtn?.addEventListener("click", submitFirstSection);

        const section2SubmitBtn = document.querySelector("#section2-submit-btn");
        section2SubmitBtn?.addEventListener("click", submitContentCheck);

        const finishBtn = document.querySelector("#quiz-maker-finish-btn");
        finishBtn?.addEventListener("click", quizMakerFinish);

        


        return () => {

       

            section1SubmitBtn?.removeEventListener("click", submitFirstSection);

            section2SubmitBtn?.removeEventListener("click", submitContentCheck);

            finishBtn?.removeEventListener("click", quizMakerFinish);
        }

    },[section])

    const quizContent: object[] = [];
    const quizNameRef = useRef("");
    const quizDescriptionRef = useRef("");
    
  

    

    let counter = 1

  
    
    const quizTemplate = {
        q: "",
        a: "",
        f1: "",
        f2: "",
        f3: "",
        explanation: ""
    }

    

    function submitFirstSection(){
        const quizNameInput = document.querySelector("#quiz-name-input") as HTMLInputElement;
        const quizDescriptionInput = document.querySelector("#quiz-description-input") as HTMLInputElement;

        if(quizNameInput.value.trim()){

            quizNameRef.current = quizNameInput.value;
            quizDescriptionRef.current = quizDescriptionInput.value;
    
            setSection(<QuizMakerSection2 />);
        }
        else{
            alert("please enter a name for your quiz!")
        }


    }

    function submitContentCheck(){
        const questionInput = document.querySelector("#quiz-maker-question-input") as HTMLInputElement;
        const falseInputs = document.querySelectorAll(".quiz-maker-false-input");
        let filledOut = true
         for(let i = 0; i < falseInputs.length; i++) {
            const value = (falseInputs[i] as HTMLInputElement).value.trim();
            if(!value){
                filledOut = false
            }
            
         }
     
        if(document.querySelector("#quiz-maker-answer-input")){
            const answerInput = document.querySelector("#quiz-maker-answer-input") as HTMLInputElement;
            if(answerInput.value.trim() && questionInput.value.trim() && filledOut){
                submitContent()
            }
            else{
                alert("please fill out the quiz!")
            }

        }
        else{
            if(questionInput.value.trim()){
                submitContent()
            }
            else{
                alert("please fill out the question!")
            }
        }
    }

    function submitContent(){
        const questionInput = document.querySelector("#quiz-maker-question-input") as HTMLInputElement;

        const triviaInput = document.querySelector("#quiz-maker-trivia-input") as HTMLTextAreaElement;
        
        const newQuiz = Object.create(quizTemplate);
        

        newQuiz.explanation = triviaInput.value;
        newQuiz.q = questionInput.value;

        triviaInput.value = ""
        questionInput.value = ""
        
        if(document.querySelector(".tof-selector")){
            const answer = document.querySelector(".tof-selector p")?.innerHTML
            let inncorrect

            switch(answer) {
                case "True":
                    inncorrect = "False"
                    break;
                case "False":
                    inncorrect = "True"
                    break;
            }

            newQuiz.a = answer;
            newQuiz.f1 = inncorrect;
        }
        else{
            const answerInput = document.querySelector("#quiz-maker-answer-input") as HTMLInputElement;
            const falseInputs = document.querySelectorAll(".quiz-maker-false-input");
            
            newQuiz.a = answerInput.value;
    
            falseInputs.forEach((input, index: number) => {
                const value = (input as HTMLInputElement).value;
                const num = index + 1;
                (newQuiz as any)[`f${num}`] = value;
                
            });

            answerInput.value = ""
            falseInputs.forEach((input) => (input as HTMLInputElement).value = "")

        }
        

        quizContent.push(newQuiz);
        
        questionCounterUpdater()

        window.scrollTo({top: 0});


    }

    function questionCounterUpdater(){

        counter++
        const questionCounter = document.querySelector(".quiz-maker-question-count");

        questionCounter!.innerHTML = `Question ${counter}`

    }

    function quizMakerFinish(){
        if(counter > 1){

            let idIndex = 6
        
            let userMadeQuizList: object[] = []
        
            if(localStorage.getItem("idIndexData")){
                loadIdIndex()
            }
        
            if(localStorage.getItem("UMQuizListData")){
                userMadeQuizList = JSON.parse(localStorage.getItem("UMQuizListData")!)
            }
        
        
            
            const quiz = {
                quizName: "",
                id: Number,
                description: "",
                default: false,
                quizContent: []
            }
            
            function createQuiz(){
                const newQuiz = Object.create(quiz);
                
                newQuiz.quizName = quizNameRef.current;
                newQuiz.quizContent = quizContent;
                newQuiz.id = idIndex;
                newQuiz.description = quizDescriptionRef.current;
                
                
               
        
                userMadeQuizList.push(newQuiz);
            }
            
            function loadIdIndex(){
                idIndex = parseInt(localStorage.getItem("idIndexData")!);
            }
            
            createQuiz();
        
            
            localStorage.setItem("UMQuizListData", JSON.stringify(userMadeQuizList));
            
        
            localStorage.setItem("idIndexData", (idIndex + 1).toString());
    
            alert("Quiz Created");
    
            const quizSelectorLink = document.querySelector("#quiz-selector-link") as HTMLLIElement;
            quizSelectorLink.click();
            
        
        }
        else{
            alert("Please save your question")
        }
    }

   





    return(
        <article className="content-container">
        {section}
        </article>
    )
}

export default QuizMakerPage