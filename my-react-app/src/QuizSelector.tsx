import { useState, useEffect, useRef } from "react";
import Quiz from "./Quiz.tsx";
import SearchBar from "./SearchbBar.tsx";

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faX} from '@fortawesome/free-solid-svg-icons'

import QuizList from "./QuizList.tsx";




function QuizSelector(){
    
    let staredArray: number[] = []
    
    

    
   
    
    const quizListRef = useRef(QuizList);
    
    if(localStorage.getItem("UMQuizListData")){
        const mixedQuizList = QuizList.concat(JSON.parse(localStorage.getItem("UMQuizListData")!))
        quizListRef.current = mixedQuizList;
        
    }

    if(localStorage.getItem("staredData")){
        const storedArray = localStorage.getItem("staredData")
        
         staredArray =  JSON.parse(storedArray!); 
    }

    useEffect(() => {
       

        staredArray.forEach((num) => {
            const staredContainer = document.querySelector(`#quiz-preview${num} .star-container`);
            staredContainer?.classList.add("stared")
        })
    },[])
    
    
    function handleQuizBtn(id: number){
        setContent( <Quiz index={id} />);
    }
    
    function handleStarClick(e: React.MouseEvent<HTMLSpanElement>, id:number){
        const starContainer = (e.target as HTMLElement).parentElement;
        if (starContainer) {
            starContainer.classList.toggle("stared");
        }
        
        if(staredArray.includes(id)){
            const index = staredArray.indexOf(id)
            staredArray.splice(index, 1)
        }
        else{
            staredArray.push(id)
        }
        
    
        localStorage.setItem("staredData", JSON.stringify(staredArray));
    }

    function deletePreview(id:number){
        if(window.confirm("Delete this Quiz?")){
            const userMadeQuizList = JSON.parse(localStorage.getItem("UMQuizListData")!);
            const deleteTarget = userMadeQuizList.find((quiz: any) => quiz.id === id);
            const index = userMadeQuizList.indexOf(deleteTarget);
            userMadeQuizList.splice(index, 1);
            localStorage.setItem("UMQuizListData", JSON.stringify(userMadeQuizList));

            const deletedPreview = document.querySelector(`#quiz-preview${id}`) as HTMLDivElement;
            deletedPreview.remove()

            if(staredArray.includes(id)){
                const index = staredArray.indexOf(id);
                staredArray.splice(index, 1)
            }

        }

    }

    function handlePreviewClick(e: React.MouseEvent){
        const target = e.target as HTMLElement;
        const targetParent = target.parentElement;
        if(target.classList.contains("quiz-preview")){
            target.classList.toggle("toggled")
        }
        else if (targetParent?.classList.contains("quiz-preview")){
            targetParent.classList.toggle("toggled")
        }
        else if(target.tagName === "H3"){
            targetParent?.parentElement?.classList.toggle("toggled")
        }
        
        
    }

    console.log(quizListRef.current)
    
    const quizPreviews: any = (quizListRef.current.map)(quiz => 
        
        
        <div data-default={quiz.default} className="quiz-preview" onClick={handlePreviewClick} id={"quiz-preview" + quiz.id} key={quiz.id}>
            
            <div className="quiz-preview-name-container">
                <h3 className="quiz-preview-name" >{quiz.quizName}</h3>
                
                {quiz.default ? null : <span onClick={() => deletePreview(quiz.id)} className="delete-quiz-btn-container"><FontAwesomeIcon icon={faX}/></span>}
                </div>
            
            
            <p className="quiz-preview-description">{quiz.description}</p>
            
            <div className="quiz-preview-footer">
            <span className="star-container" onClick={(e) => handleStarClick(e, quiz.id)}><img src="/assets/star-regular.svg" alt="" /></span>
            <p className="question-count-preview">{quiz.quizContent.length}: Questions</p>
            <button onClick={() => handleQuizBtn(quiz.id)} className="quiz-btn take-quiz-btn">Take Quiz</button>



            </div>

                    
        </div>);

    const quizSelectorContent = <div className="content-container">
                                 <SearchBar  />
                                 <div className="preview-grid">{quizPreviews}</div>
                                </div>

        const [content, setContent] = useState(quizSelectorContent)

               

        return(content);

    
}

export default QuizSelector