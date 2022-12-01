import MovieData from './MovieData' 
import MoviesListing from './MoviesListing'

const cardsContainerNode = document.querySelector('.cards-container')
const movieData = new MovieData()
const moviesListing = new MoviesListing(movieData, cardsContainerNode)
moviesListing.init()
