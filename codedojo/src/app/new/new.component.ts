import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { 
FormGroup,
FormBuilder,
Validators,
FormControl
} from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newMovie: any;
	Errors =[];
	MovieError = undefined;
	form: FormGroup;

  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.newMovie = {name: " ", review: " ", rating: " ", YourName: " "}

  	this.form = this.FormBuilder.group({
  		movieName: [null, Validators.required],
  		yourName: [null, Validators.required],
  		rating: [null, Validators.required],
  		review: [null, Validators.required],
  	})
  }

onSubmit(){
	this.SavingMovie()
	this.SavingReview()
	console.log('something going on')
	
}


SavingMovie(){
let Observable = this._httpService.addMovie(this.newMovie);
		Observable.subscribe( data => {
			if(data['errors']){
				this.Errors = data['errors']
				console.log("there are errors", this.Errors)
			}
		if(data['data']){
			console.log("you have sent the new movie")
		}
		})
}

SavingReview(){
	let obs = this._httpService.addReview(this.newMovie);
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

}
