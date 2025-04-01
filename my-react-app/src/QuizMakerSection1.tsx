

import arrow from "./assets/arrow-right.svg"


function QuizMakerSection1(){



    
    


                    return(

                         <div className="quiz-maker-sheet">
                        <label className="quiz-maker-label" htmlFor="quiz-name-input">Quiz Name</label>
                        <input className="quiz-maker-input" id="quiz-name-input" maxLength={40} type="text" />

                        <label className="quiz-maker-label segment" htmlFor="">-Optional-</label>

                        <label className="quiz-maker-label optional" htmlFor="quiz-description-input">Quiz Description</label>
                        <textarea className="quiz-maker-textarea" name="" maxLength={90} id="quiz-description-input"></textarea>

                        
                        

                        <button id="section1-submit-btn" className="submit-btn">Next<img src={arrow} /></button>
                        </div>

                    )

                    



}


export default QuizMakerSection1;





    