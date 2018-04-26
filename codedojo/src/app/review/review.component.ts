import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
	Idee: Number;
	reviews: any;
	movieName = undefined;
	name = "hello"
	location = "/movies"
  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => 
  		this.Idee = params['id']);
  	console.log(this.Idee)
  	this.getMovieName()

  	
  }

  refresh(){
  	this._router.navigate(['/movies/'+ this.Idee])
  }

deleteButton(IDee){
	let Observable = this._httpService.deleteReview(IDee)
  	Observable.subscribe(
  		data =>{
  		console.log("delete Success");
  		this._router.navigate(['/movies/'+ this.Idee])
  	
  		})



}

findAverage(){
	var average = 0;
	var counter = 0;
	for( let key in this.reviews) {
		console.log(this.reviews[key].rating)
		average += this.reviews[key].rating
		counter += 1
	}
	average = average/counter
	console.log(counter, average)
}



deleteButtonClicked(){
  	let Observable = this._httpService.deleteMovies(this.Idee)
  	Observable.subscribe(
  		data =>{
  		console.log("delete Success")
  		this._router.navigate(['/'])
  		})
  
}


getMovieName(){
	let obs = this._httpService.findMovie(this.Idee);
	obs.subscribe(
		data =>{
			this.movieName = data['data'][0]['name'] 
			console.log("Found", data['data'][0]['name'] )
			this.getReviews()
		})
}


getReviews(){
	console.log("grabbing Reviews", this.movieName)
	let observable = this._httpService.getReviews(this.movieName)
	observable.subscribe(
		data => {
			this.reviews = data['data'];
			console.log("this is the reviews", this.reviews)
			this.findAverage()
		})
	
}

}
