
import QuizList from "./QuizList.tsx";
import  { useState, useEffect, useRef } from "react";
import arrow from "./assets/arrow-right.svg"
import correctSound from "./assets/sounds/correct_sound.mp3"
import wrongSound from "./assets/sounds/fail_sound.mp3"


function Quiz(props: any) {

    
    
    
    const quizListRef = useRef(QuizList);
    if(localStorage.getItem("UMQuizListData")){
        const mixedQuizList = QuizList.concat(JSON.parse(localStorage.getItem("UMQuizListData")!))
        quizListRef.current = mixedQuizList;
    }
    
    const quizId = props.index;
    let currentQuiz 
    quizListRef.current.forEach((quiz) => {
        if(quiz.id === quizId){
            currentQuiz = quiz
        };
    })
    const name = currentQuiz!.quizName
    const content = currentQuiz!.quizContent;
    
    const length = content.length;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(content[currentQuestion].a);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const[replay, setReplay] = useState(false);
    
    const answerSubmitedRef = useRef(false);
    
    const header = document.querySelector("#header")
    
    useEffect(() => {
        header?.classList.remove("audio-hidden");
        
        return () => {
            header?.classList.add("audio-hidden");
        }
    },[])
    
    
    
    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    
   
        
    

    const handleSubmit = () => {
        
        if (answerSubmitedRef.current) return;
        if (document.querySelector('input[name="guess"]:checked') === null) return;
        
        const guessInputs = document.querySelectorAll('input[name="guess"]') as NodeListOf<HTMLInputElement>;
        guessInputs.forEach(input => input.disabled = true);

        const audioBtn = document.querySelector(".audio-btn");
        
        const selectedAnswer = document.querySelector('input[name="guess"]:checked') as HTMLInputElement;

        if('explanation' in content[currentQuestion]){
            const tag = document.querySelector(".explanation-tag") as HTMLHeadingElement;
            tag.innerHTML = content[currentQuestion].explanation;

        }

        if (selectedAnswer.value === currentAnswer) {
            selectedAnswer.parentElement?.classList.add("checked");
            
            if(audioBtn?.classList.contains("on")){
                const audio = new Audio(correctSound);
                audio.play();
            }
        }
        else {
            selectedAnswer.parentElement!.classList.add("x-out");
            selectedAnswer.parentElement!.parentElement!.classList.add("incorrect");

            if(audioBtn?.classList.contains("on")){
                const audio = new Audio(wrongSound);
                audio.play();

            }
        }
        const correctInput = document.querySelector(`input[value="${currentAnswer}"]`) as HTMLInputElement;
        const correctCheckboxContainer = correctInput.parentElement;
        correctCheckboxContainer!.parentElement!.classList.add("correct");

        
        answerSubmitedRef.current = true;
        setTimeout(() => {
            
            if (selectedAnswer) {
                const answerValue = selectedAnswer.value;
                if (answerValue === currentAnswer) {
                    setScore(prevScore => prevScore + 1);
                }
                if (currentQuestion < length - 1) {
                    setCurrentQuestion(prevQuestion => prevQuestion + 1);
                    
                    setCurrentAnswer(content[currentQuestion + 1].a);
                } else {
                    setQuizFinished(true);
                }
            } else {
                alert("Please select an answer.");
            }
            answerSubmitedRef.current = false;

        }, 5000);
    }
    


    
    const currentQuestions = [content[currentQuestion].a, content[currentQuestion].f1, content[currentQuestion].f2, content[currentQuestion].f3];
    const randomizedQuestions = shuffleArray(currentQuestions).filter((value) => value !== undefined);
    

    const renderedQuestions = (
        <div className="quiz-sheet" key={"q" + currentQuestion}>
            <div className="question-container"><h3>{content[currentQuestion].q}</h3><p className="explanation-tag"></p></div>
            

            <div className="answer-group" key={"a" + currentQuestion}>
                <label htmlFor="guess1" >{randomizedQuestions[0]}</label> 
                <div className="checkbox-container"><input value={randomizedQuestions[0]} id="guess1" type="radio" name="guess"/></div>
                </div>

            <div className="answer-group" key={"b" + currentQuestion}>
                <label htmlFor="guess2" >{randomizedQuestions[1]}</label> 
                <div className="checkbox-container"><input value={randomizedQuestions[1]} id="guess2" type="radio" name="guess"/></div>
                </div>

            {content[currentQuestion].f2 !== undefined ? (
                <>
                    <div className="answer-group" key={"c" + currentQuestion}> 
                    <label htmlFor="guess3" >{randomizedQuestions[2]}</label>
                    <div className="checkbox-container"><input value={randomizedQuestions[2]} id="guess3" type="radio" name="guess"/></div>
                    </div>

                    <div className="answer-group" key={"d" + currentQuestion}>
                    <label htmlFor="guess4" >{randomizedQuestions[3]}</label> 
                    <div className="checkbox-container"><input value={randomizedQuestions[3]} id="guess4" type="radio" name="guess"/></div>
                    </div>
                </>
            ) : null}
            
            <button onClick={handleSubmit} className="submit-btn">Submit <img src={arrow} /></button>
            <p className="quiz-sheet-counter">{currentQuestion + 1}/{length}</p>
        </div>
    );

    const renderedScorePage = (
        <div className="score-sheet">
            <div className="question-container"><h3>Quiz Finished!</h3></div>
            <p>Your Score: {score} / {length}</p>
            <button onClick={() => setReplay(true)} className="quiz-btn replay-btn">Replay</button>
            <button onClick={() => window.location.reload()} className="finish-btn quiz-btn">Finish</button>
        </div>
    );

    const quizPage = <div className="quiz-page">
                    <h2 className="quiz-name">{name}</h2>
                    {quizFinished ? renderedScorePage : renderedQuestions}
                        </div>

    return (
        
        replay ? <Quiz index={quizId} /> : quizPage
        
    

       
    );
}

export default Quiz;