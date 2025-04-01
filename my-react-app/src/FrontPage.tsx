
import {useEffect, useState} from "react";

import QuizMakerPage from "./QuizMakerPage.tsx";
import QuizSelector from "./QuizSelector.tsx";

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faVolumeHigh,  faVolumeXmark, } from '@fortawesome/free-solid-svg-icons'


function FrontPage(){

    
    
    
    const [audio, setAudio] = useState(true);
    
    

  
  
  
  
    
    useEffect(() => {
        
        
        window.scrollTo({top: 0});

        const headerLinks = document.querySelectorAll(".header-link");

        headerLinks.forEach((link) => {
            link.addEventListener(("click"), () => {
                const prevSelected = document.querySelector(".selected");
                prevSelected!.classList.remove("selected");
                link.classList.add("selected");
                
            })
        })

    },[])

    const [page, setPage] = useState(<QuizSelector />);
    
   
   function toggleAudio(){
    
    
    if(audio === true){

        setAudio(false);
    }
    else {
     
        setAudio(true);
    } 
   }

   
    return(
        <>
        <header id="header" className="audio-hidden">
            <h1>Quizo</h1>
            
                 
            <ul className="header-link-container">
                <li id="quiz-selector-link" onClick={() => window.location.reload()} className="selected header-link" >Quizzes</li>
                <li id="quiz-maker-link" onClick={() => setPage(<QuizMakerPage />)}  className="header-link" >Quiz Maker</li>
            <FontAwesomeIcon onClick={toggleAudio} icon={audio ? faVolumeHigh : faVolumeXmark}  className={`audio-btn ${audio ? "on" : ""}`}/>

            </ul>
          
               
        </header>
        
        
        {page}
        
        
        
        
        
        
        </>
    )
}

export default FrontPage