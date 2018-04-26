import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
	newReview: any;
	name:any;
	movieName: any;
	Idee: any;
	Errors: any;
  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.newReview = {review: " ", rating: " ", YourName: " ", title: `${this.name}`}
  	this._route.params.subscribe((params: Params) => 
  		this.Idee = params['id']);
  	console.log(this.Idee)
  	this.getMovieName()
  }

onSubmit(){
	let obs = this._httpService.addReview(this.newReview);
		obs.subscribe(data => {
			if(data['errors']){
				this.Errors = data['errors']

			}
			else{
				console.log("review added")
				this._router.navigate(['/'])
			}
		})
}

getMovieName(){
	let obs = this._httpService.findMovie(this.Idee);
	obs.subscribe(
		data =>{
			this.name = data['data'][0]['name'] 
			console.log("Found", data['data'][0]['name'] )
			this.newReview = {review: " ", rating: " ", YourName: " ", title: `${this.name}`}
			console.log(this.name , "is da name")
			
		})
}

}
