let findElement = (selectorName) => document.querySelector(selectorName);

let genreArray=[];
//Custom function
let createNewElement = (tagName) => document.createElement(tagName);


/*Elements*/
let searchForm = findElement(".form");


let movieList = findElement(".movies__list");
let genresSelect = findElement(".js-genres");
let searchInput = findElement(".input");
let sortSelect = findElement(".js-sort")

let modal = findElement(".modal");
let modalCloseBtn=findElement(".modal-btn");

//Movie template
let movieTemplate = findElement("#movie-template").content;

//Get hour function
function date(data) {
    let hour = new Date(data).getHours();
    let minute = new Date(data).getMinutes();
    let second = new Date(data).getSeconds();
    return `${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}:${String(second).padStart(2,"0")}`
}
// Aa-Zz sort function
let sortAz= function (a,b) {
    if(a.title>b.title){
        return 1;
    }
    if(b.title>a.title){
        return -1;
    }
    else{
        return 0;
    }
}
// Zz-Aa sort function
let sortZa= function (a,b) {
    if(a.title>b.title){
        return -1;
    }
    if(b.title>a.title){
        return 1;
    }
    else{
        return 0;
    }
}
//New-Old sort function
let sortNewOld=function (a,b) {
    return a.release_date-b.release_date;
}
//Old-New sort function
let sortOldNew=function (a,b) {
    return b.release_date-a.release_date;
}
// SortsObjects functions
let sortFunction={
    0:sortAz,
    1:sortZa,
    2:sortNewOld,
    3:sortOldNew
}

//Get Movies genre function
function getMovieGenre(genre){
    
    if(!genreArray.includes(genre)){
        genreArray.push(genre);

         let genreOption=createNewElement("option");
         genreOption.textContent=genre;
         genreOption.value=genre;

         genresSelect.appendChild(genreOption);
    }
}

// Create movie element
function createMovie(movie) {
    let elMovie = movieTemplate.cloneNode(true);
     
    elMovie.querySelector(".movie-img").src = movie.poster;
    elMovie.querySelector(".movie-img").width="250";
    elMovie.querySelector(".moive-title").textContent=movie.title;

    movie.genres.forEach(genre =>{
        let newGenreLi=createNewElement("LI");

        newGenreLi.textContent=genre;
        elMovie.querySelector(".movie-genre").appendChild(newGenreLi);




        getMovieGenre(genre);
    })

    elMovie.querySelector(".movie-year").textContent=date(movie.release_date);
    elMovie.querySelector(".js-more-btn").dataset.id=movie.id;
   
    movieList.appendChild(elMovie);
}




//Search movie functions
function searchMovie(evn) {
    evn.preventDefault();
     
    movieList.innerHTML=null;
    let ganreValue = genresSelect.value;
    let searchValue =searchInput.value.trim();
    let sortValue=sortSelect.value;
    console.log(sortValue);

    let newRegexp = new RegExp(searchValue,"gi");
    
    let foundFilms = films.filter(kino =>{
        if(ganreValue==="All"){
            return kino;
        }
          return kino.genres.includes(ganreValue);
    }).filter(kino =>{
        return kino.title.match(newRegexp);
    })

      foundFilms.sort(sortFunction[sortValue]);
      
     
     foundFilms.forEach(kino => createMovie(kino));
}

films.forEach( film =>{
    createMovie(film);
})
searchForm.addEventListener("submit", searchMovie);

movieList.addEventListener("click",function (evt) {
    if(evt.target.matches(".js-more-btn"))
    {
        modal.classList.add("modal-open");

        let foundMovie = films.find((movie) => movie.id===evt.target.dataset.id)
        
        modal.querySelector(".modal__title").textContent=foundMovie.title
        modal.querySelector(".modal__describtion").textContent=foundMovie.overview
         
        // Modal Close functions
        document.addEventListener("keyup",function(evt) {
            if(evt.keyCode===27){
                modal.classList.remove("modal-open");
            }
        })

        modal.addEventListener("click",function (evt) {
            if(evt.target===modal){
                modal.classList.remove("modal-open");
            }
           
        })

        modalCloseBtn.addEventListener("click",function() {
            modal.classList.remove("modal-open");
        })
    }
})



