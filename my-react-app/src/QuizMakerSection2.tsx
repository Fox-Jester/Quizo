import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronRight} from '@fortawesome/free-solid-svg-icons'

import React, {useState} from "react";

function QuizMakerSection2(){


        const [trueOrFalse, setTrueOrFalse] = useState(false)



      function handleSliderToggle(e: React.ChangeEvent){
            const slider = e.target as HTMLInputElement
            
            if(slider.checked){
                setTrueOrFalse(true);
                
            }
            else{
                setTrueOrFalse(false);
                
            }
            
    
        }

        function noReapet(){
             const currentChoice  = document.querySelector(".tof-selector p")!.innerHTML.toLocaleLowerCase()
            
           

            const choices = document.querySelectorAll("#tof-choices li");

            choices.forEach(choice => choice.classList.remove("hidden"))

            const repeat = document.querySelector(`#tof-choice-${currentChoice}`)
            repeat?.classList.add("hidden")
        }
        
        function handleTOFSelector(){
            const tofChoices = document.querySelector("#tof-choices");
            tofChoices?.classList.toggle("hidden"); 

            const chevron = document.querySelector(".chevron");
            chevron?.classList.toggle("rotate")


            noReapet()
        }

        function handleTOFChoice(e: React.MouseEvent){
            const choice = e.target as HTMLLIElement
            const value = choice.innerHTML;

            const selector = document.querySelector(".tof-selector p");
            selector!.innerHTML = value

            handleTOFSelector()
        }

    const trueOrFalseChoice = <>
                            <label  className="quiz-maker-label" >Correct Answer</label>
                            <span onClick={handleTOFSelector}  className="tof-selector"><p>True</p><FontAwesomeIcon className='chevron' icon={faChevronRight}/></span>
                            <ul id="tof-choices" className=" hidden">
                            <li onClick={handleTOFChoice} id="tof-choice-true">True</li>
                            <li onClick={handleTOFChoice} id="tof-choice-false">False</li>
                           
                            </ul>

                            
    
                            
                            </>

    const multipleChoice = <>
                            <label  className="quiz-maker-label" htmlFor="quiz-maker-answer-input">Correct Answer</label>
                            <input maxLength={60} className="quiz-maker-input" id="quiz-maker-answer-input" type="text" />

                            <label  className="quiz-maker-label" >Wrong Answers</label>
                            <div className="quiz-maker-input-group">
                            <input maxLength={60} className="quiz-maker-input quiz-maker-false-input" type="text" />
                            <input maxLength={60} className="quiz-maker-input quiz-maker-false-input" type="text" />
                            <input maxLength={60} className="quiz-maker-input quiz-maker-false-input" type="text" />
                            </div>
                            </>






    return(    
                            <>
                            <div className="quiz-maker-sheet">
                            <label  className="quiz-maker-label" htmlFor="quiz-maker-question-input">Question</label>
                            <input className="quiz-maker-input" maxLength={90} id="quiz-maker-question-input" type="text" />

                            <div className="toggle-slider-group">
                                <p>True or False</p> 
                                <label className="switch">
                                <input onChange={handleSliderToggle} type="checkbox" />
                                <span className="slider"></span>
                                </label>
                                </div>

                            {trueOrFalse ? trueOrFalseChoice : multipleChoice}



                            <label className="quiz-maker-label segment" htmlFor="">-Optional-</label>
                            <label  className="quiz-maker-label" htmlFor="quiz-maker-trivia-input">Explaination / Trivia</label>
                            <textarea maxLength={90} className="quiz-maker-textarea" name="" id="quiz-maker-trivia-input"></textarea>

                            <p className="quiz-maker-question-count">Question 1</p>
                            <button id="section2-submit-btn" className="submit-btn">Save Question<img src="../src/assets/arrow-right.svg" /></button>
                            </div>

                            <button id='quiz-maker-finish-btn' className="submit-btn">Create</button>
                            </>)
}

export default QuizMakerSection2;