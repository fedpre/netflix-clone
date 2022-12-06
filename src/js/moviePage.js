import MovieData from "./MovieData.js";
import { footerDate, getLocalStorage, setLocalStorage } from "./utils.js";
const movieData = new MovieData()

// Get the movie id from the URL
const url = new URL(window.location.href)
const movieId = url.searchParams.get('movie')

// Get the movie
const movie = await movieData.getMovieById(movieId)
const moviesSimilar = await movieData.getSimilarMovies(movieId)
const movieGenres = await movieData.getGenres()

// Set the title of the page
const title = document.querySelector('title')
title.innerText = `Netflax | ${movie.title}`

// Set the main header
const heading = document.querySelector('.title-heading')
heading.innerText = movie.title

// Set the img
const img = document.querySelector('.detail-img')
img.src = movieData.imgURL + movie.poster_path

// Set description
const description = document.querySelector('.description')
description.innerText = movie.overview

// Set release date
const releaseDate = document.querySelector('.release-date')
releaseDate.innerText = `Release date: ${movie.release_date}`

// Set movie genres
const genresNode = document.querySelector('.genre')
movie.genres.map(g => {
  const span = document.createElement('span')
  span.innerText = g.name
  span.setAttribute('class', 'movie-genre-span-detail')
  genresNode.appendChild(span)
})

// get template element
const template = document.querySelector('#movie-card-carousel')
moviesSimilar.results.map(movie => {
  const clone = template.content.cloneNode(true)
  const posterImg = clone.querySelector('.movie-img')
  posterImg.src = movieData.imgURL + movie.poster_path 
  const dataId = clone.querySelector('.movie-card')
  dataId.setAttribute('data-id', movie.id)
  const title = clone.querySelector('.movie-title')
  title.innerText = movie.title
  const rating = clone.querySelector('.movie-rating')
  rating.innerText = movie.vote_average
  const genresNode = clone.querySelector('.movie-genre')
  const movieGenreNames = movieData.movieGenreNames(movieGenres.genres, movie.genre_ids)
  movieGenreNames.map(g => {
    const span = document.createElement('span')
    span.innerText = g
    span.setAttribute('class', 'movie-genre-span')
    genresNode.appendChild(span)
  })
  const aTag = clone.querySelector('.movie-anchor')
  aTag.href = `./index.html?movie=${movie.id}`
  document.querySelector('.similar-movies-container').appendChild(clone)
})

const favIcon = document.querySelector('#favorite')
favIcon.addEventListener('click', async () => {
  let favoriteLocal = await getLocalStorage('favorites')
  let movieFilter = []
  if (favoriteLocal !== null ) {
    movieFilter = favoriteLocal.filter(i => i.id === Number(movieId))
  }
  if (favoriteLocal === null || favoriteLocal.length === 0) {
    await setLocalStorage('favorites', [movie])
    favIcon.style.fontVariationSettings = "'FILL' 100"
    console.log('movie added to your favorite list!')
    console.log(await getLocalStorage('favorites'))
  } 
  else if (movieFilter.length > 0) {
    console.log('movie already in your favorite list')
    const newFavList = favoriteLocal.filter(i => i.id !== Number(movieId))
    await setLocalStorage('favorites', [...newFavList])
    favIcon.style.fontVariationSettings = "'FILL' 0"
    console.log(await getLocalStorage('favorites'))
  }
  else {
    await setLocalStorage('favorites', [...favoriteLocal, movie])
    favIcon.style.fontVariationSettings = "'FILL' 100"
    console.log('movie added to your favorite list!')
  }
  const favoriteNew = await getLocalStorage('favorite')
  
} ,false)

let favMovies = await getLocalStorage('favorites') || []
const movieFilter = favMovies.filter(i => i.id === Number(movieId))
if (movieFilter.length > 0) {
  favIcon.style.fontVariationSettings = "'FILL' 100"
}

footerDate()
