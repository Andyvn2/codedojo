import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http:HttpClient) { }

getMovies(){
	console.log("getting Movies")
	return this._http.get('/movie')
}

deleteMovies(idee){
	return this._http.delete('/movie/'+idee)
}

addMovie(newmovie){
	console.log("adding new movie", newmovie)
	return this._http.post('/movie', newmovie)
}

findMovie(movieID){
	console.log("finding Movie", movieID)
	return this._http.get('/movie/' + movieID)
}

updateMovie(Movie, idee){
	console.log("updating", Movie)
	return this._http.put('/movie/'+idee, Movie)
}

addReview(newreview){
	console.log('adding review', newreview)
	return this._http.post('/reviews', newreview)
}

getReviews(movieID){
	console.log("getting REviews")
	return this._http.get('/reviews/'+ movieID)
}

deleteReview(reviewID){
	console.log("getting REviews")
	return this._http.delete('/reviews/'+ reviewID)
}

}
