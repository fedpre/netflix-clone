import MovieData from './MovieData.js' 
import MoviesListing from './MoviesListing.js'

const cardsContainerNode = document.querySelector('.cards-container')
const movieData = new MovieData()
const moviesListing = new MoviesListing(movieData, cardsContainerNode)
moviesListing.init()
