import React, {useState, useEffect} from "react"; 
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faX} from '@fortawesome/free-solid-svg-icons'


function SearchBar() {
    
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const value = searchInput.toLowerCase().trim()
        const xBtn = document.querySelector(".delete-search");

        if(value){
            xBtn?.classList.remove("hidden");
        }
        else{
            xBtn?.classList.add("hidden");
        }

        const quizNames = document.querySelectorAll(".quiz-preview-name");
        quizNames.forEach((name) => {
            const nameValue = name.innerHTML.toLowerCase().trim()
            const quizPreview = name.parentElement?.parentElement
            if(!nameValue.includes(value)){
                quizPreview?.classList.add("hidden")
            }
            else{
                quizPreview?.classList.remove("hidden")
            }
        })

    },[searchInput])

    function noReapet(){
        const filterList = document.querySelector(".filter-list");
        const filterItems = filterList?.querySelectorAll("li");
        filterItems?.forEach(item => item.classList.remove("hidden"));

        const currentFilter = document.querySelector(".current-filter");
        const currentValue = currentFilter?.textContent?.toLowerCase();
        const repeatFilter = document.querySelector(`#filter-${currentValue}`);
        repeatFilter?.classList.toggle("hidden");

    }

    function handleFilterToggle(){
        const filterList = document.querySelector(".filter-list");
        filterList?.classList.toggle("hidden");
    
        noReapet();
    }
    

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>){
        setSearchInput(e.target.value);
        
    }

    function handleFilterSwap(e: React.MouseEvent){
        const filter = e.target as HTMLLIElement
        const filterName = filter.innerHTML
        const currentFilter = document.querySelector(".current-filter");
        currentFilter!.innerHTML = filterName;
        

        filterChange(filterName);
        handleFilterToggle()
    }



    function filterChange(filterName: string){
        
        const filteredQuizzes = document.querySelectorAll(".filtered")
        filteredQuizzes.forEach((quiz) => quiz.classList.remove("filtered"))

        switch(filterName){
            case "All":
            break;
            case "Default":
            const userMadeQuizzes = document.querySelectorAll("[data-default = false]")
            userMadeQuizzes.forEach(quiz => quiz.classList.add("filtered"))
            break;
            case "UserMade":
                const defaultQuizzes = document.querySelectorAll("[data-default = true]")
                defaultQuizzes.forEach(quiz => quiz.classList.add("filtered"))
            break;
            case "Favorite":
                const unStaredContainers = document.querySelectorAll(".star-container:not(.stared)");
                unStaredContainers.forEach((starContainer) => {
                    const footer = starContainer.parentElement;

                    footer!.parentElement?.classList.add("filtered")
                })
            break;
            
            
            
        }
    }

    function handleDeleteSearch(){
        setSearchInput("");
        const input = document.querySelector("#search-input") as HTMLInputElement;
        input.value = ""
    }

    return(
        <div className="search-bar">
            <div className="filter-container">
                <span onClick={handleFilterToggle} className="current-filter">All</span>
                <ul className="filter-list hidden">
                    <li onClick={(e) => handleFilterSwap(e)} id="filter-all">All</li>
                    <li onClick={(e) => handleFilterSwap(e)} id="filter-default">Default</li>
                    <li onClick={(e) => handleFilterSwap(e)} id="filter-usermade">UserMade</li>
                    <li onClick={(e) => handleFilterSwap(e)} id="filter-favorite">Favorite</li>
                </ul>
            </div>
            <input id="search-input" type="text" placeholder="Search for a quiz..." onChange={handleSearchInput} />
            <FontAwesomeIcon onClick={handleDeleteSearch} className="delete-search hidden" icon={faX} />
            
            
            
        </div>
    );
}

export default SearchBar;