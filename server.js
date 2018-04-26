var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var session = require('session');



app.use(bodyParser.urlencoded({ extended: true}));


app.use(bodyParser.json());


app.use(express.static( __dirname + '/codedojo/dist' ));
app.use(express.static(path.join(__dirname, './views')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/basic_mongoose');

mongoose.Promise = global.Promise;


var MovieSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Movie name is required!!!"], minlength: [3, "Name too short.Name must be longer than 3 characters!"], unique: true},
	created_at: {type: Date, default: Date()},
	updated_at: {type: Date, default: Date()}
	}, {timestamps: true });
mongoose.model('Movie', MovieSchema);
var Movie = mongoose.model('Movie')


var ReviewsSchema = new mongoose.Schema({
	movieID: {type: String, required: [true]},
	name: {type: String, required: [true, "Your name is required!!!"], minlength: [3, "Your Name is too short.Name must be longer than 3 characters!"]},
	rating: {type: Number, required: [true], min: [1, "needs to be between 1-5"], max: [5, 'Needs to be netween 1-5']},
	review: {type: String, required: [true, "review Required!"], minlength:[3,"Review Minimum needs to be 3!!!"]},
	created_at: {type: Date, default: Date()},
	updated_at: {type: Date, default: Date()}
	}, {timestamps: true });
mongoose.model('Reviews', ReviewsSchema);
var Revs = mongoose.model('Reviews')



app.post('/reviews', function(req,res){
	var rev = new Revs ({
		movieID: req.body.title,
		name: req.body.YourName,
		rating: req.body.rating,
		review: req.body.review,
		created_at: Date(),
		updated_at: Date()
	})
	rev.save(function(err, results){
		if(err){
			console.log(err)
			res.json({message:"fail", errors:err})
		}
		else{
			console.log(results)
			res.json({message: "Success", data: results})
		}
	})
})

app.get('/reviews/:id', function(req, res){
	console.log("this is server", req.params.id)
	Revs.find({movieID: req.params.id}).sort({rating: -1}).exec(function(err, reviews){
		if(err){
			console.log(err);
			res.json({message:"error", error: err})
		}
		else{
			res.json({message:"Success", data: reviews})
		}
	})
})

app.delete('/reviews/:id', function(req,res){
	Revs.remove({_id: req.params.id}, function(err){
		console.log("removed Successful")
		res.json({message: "success"})
})
})
app.delete('/movie/:id', function(req,res){
	Movie.remove({_id: req.params.id}, function(err){
		console.log("removed Successful")
		res.json({message: "success"})
})
})


app.put('/movie/:id', function(req,res){
var opts = { runValidators: true};
console.log("this is the name", req.body.genre)
	Movie.update({_id: req.body._id} ,{ $set: {
		name : req.body.name, 
		genre: req.body.genre}}
		, opts, 
		function(err, rest){
		if(err){
			res.json({message:"errors", errors: err})
		}
		else{
			res.json({message:"success", data: rest})
		} 
	}
		)
	
})


app.post('/movie', function(req,res){
	// console.log("*****THIS IS RES",res)
	var movie = new Movie({
		name: req.body.title,
		created_at: Date(),
		updated_at: Date()
	})

	movie.validate()
	movie.save(function(err, results){
		if(err){
			console.log(err)
			res.json({message: "fail", errors: err})
		}
		else{
			console.log(results)
			res.json({message: "success", data: results})
		}
	})
	
})

app.get('/movie', function(req, res){
	Movie.find({}, function(err, movies){
		if(err){
			console.log(err);
			res.json({message:"error", error: err})
		}
		else{
			res.json({message:"Success", data: movies})
		}
	})
})

app.get('/movie/:id', function(req,res){
	Movie.find({_id: req.params.id}, function(err, movies){
		if(err){
			console.log(err)
		}
		else{
			res.json({message: "Success", data: movies})
		}
	})
})

app.all("*", (req, res, next) => {
	res.sendFile(path.resolve("./codedojo/dist/index.html"))
})




app.listen(8000, function(){
	console.log("listening on port 8000, hello")
})
