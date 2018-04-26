import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	movies : any;
  timeout = true;


  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.getMovies();
  }



  getMovies(){
  	let Observable = this._httpService.getMovies()
  	Observable.subscribe(
  		data => {
  		this.movies = data['data']
  		console.log(this.movies)
  	}
  		)
  }


  deleteButtonClicked(idee){


  	let Observable = this._httpService.deleteMovies(idee)
  	Observable.subscribe(
  		data =>{
  		console.log("delete Success")
  		this._router.navigate(['/'])
  		})
  }


//  getReviews(){
// 	let observable = this._httpService.getReviews(this.movieName)
// 	observable.subscribe(
// 		data => {
// 			this.reviews = data['data']['rating'];
			
// 		})
	
// }
 
}
