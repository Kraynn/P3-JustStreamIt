const catBestMovies = ["#bestMovies", "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&page=1", "bM"];
const catBestAnimation = ["#animationMovies", "http://localhost:8000/api/v1/titles/?genre=Animation&sort_by=-imdb_score&page_size=7&page=1", "bA"];
const catBestDrama = ["#dramaMovies", "http://localhost:8000/api/v1/titles/?genre=Drama&sort_by=-imdb_score&page_size=7&page=1", "bD"];
const catBestThriller = ["#thrillerMovies", "http://localhost:8000/api/v1/titles/?genre=Thriller&sort_by=-imdb_score&page_size=7&page=1", "bT"];
const allUrls = [catBestMovies, catBestAnimation, catBestDrama, catBestThriller];
const modal = document.querySelector("#modal");
const closeModal = document.querySelector(".closeButton");

// Fonction pour remplir le site.

function populateAll(urls) {
  getBestMovieData(catBestMovies);
  for (const elem of urls){
    populateCat(elem);
    carousel(elem)
  }
}

// Fonction qui remplit une catégorie d'informations

async function populateCat(url) {
  const response = await fetch(url[1]);
  const data = await response.json();
  const ul = document.querySelector(url[0]);
  ul.setAttribute("style", "display:flex;")
  for (i=0; i<7; i++){
      var li = document.createElement("li")
      const img = document.createElement('img')
      img.setAttribute('src', data.results[i].image_url)
      img.setAttribute('alt', "description")
      img.setAttribute('id', data.results[i].id)
      img.classList.add('slideImg')
      img.addEventListener('click', () => displayModal(img.id))
      li.classList.add("carouselSlide")
      li.appendChild(img)
      ul.append(li)
  }
}

// Fonction pour charger les informations du film le mieux noté

async function getBestMovieData(url) {
  const page = await fetch(url[1]);
  const movies = await page.json();
  const newId = movies.results[0].id;
  const response = await fetch("http://localhost:8000/api/v1/titles/"+ newId);
  const data = await response.json();
  document.getElementById("bTitle").textContent = data.title;
  document.getElementById("bImg").src = data.image_url;
  const content = document.querySelector(".bestMovieInfos");
  content.innerHTML = (
    "Résumé : " + data.description
   + "<br><br>Genre : " + data.genres
   + "<br>Année : " + data.year
   + "<br>Note : " + data.imdb_score
   + "<br>Realisateur : " + data.directors
   + "<br>Acteurs : " + data.actors
   + "<br> Durée : " + data.duration + "minutes"
   + "<br> Pays d'origine : " + data.countries
  )
}

// Fonctions relatives à la construction du modal

async function getModalData(id) {
  const response = await fetch("http://localhost:8000/api/v1/titles/"+ id);
  const data = await response.json();
  const imgDisplay = document.querySelector(".movieImg");
  const movieDetails = document.querySelector(".movieInfos")
  const img = document.createElement('img');
  img.setAttribute('src', data.image_url);
  img.setAttribute('alt', data.title);
  img.classList.add('slideImg');
  imgDisplay.append(img);
  movieDetails.innerHTML = (
   "<br>Résumé : " + data.description
  + "<br><br>Genre : " + data.genres
  + "<br>Année : " + data.year
  + "<br>Note : " + data.imdb_score
  + "<br>Realisateur : " + data.directors
  + "<br>Acteurs : " + data.actors
  + "<br> Durée : " + data.duration + "minutes"
  + "<br> Pays d'origine : " + data.countries + "<br><br>"
);
}

function displayModal(id){
 getModalData(id);
 modal.showModal();
}

closeModal.addEventListener("click", () => {
 document.querySelector(".movieImg").innerHTML = ""
 modal.close();
});

// Fonction qui crée un carousel 

async function carousel(url){
  const track = document.querySelector(url[0])
  let nextButton = track.parentElement.nextElementSibling;
  console.log(nextButton)
  nextButton.addEventListener("click", e => {
    track.style.transform += "translateX(-250px)"
  })
  let prevButton = track.parentElement.previousElementSibling;
  console.log(prevButton)
  prevButton.addEventListener("click", e => {
    track.style.transform += "translateX(+250px)"
})
}

populateAll(allUrls);