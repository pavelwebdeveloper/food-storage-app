const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();
const connectionString = process.env.DATABASE_URL
const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString})

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', getFoodStorageItems)
  .get('/getmanagefoodstoragepage', getManageFoodStoragePage)
  .get('/gethomepage', getHomePage)
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  
  
  // The functions
  
  function getFoodStorageItems (req, res) {
	  
	  pool.query('SELECT * FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
		  // Log this to the console for debugging purposes.
		console.log("Back from DB with result:");
		console.log(result.rows);
		const items = result.rows;
		console.log("items variable:");
		console.log(items);
	
		res.render('pages/index', {
			items: items
		});
	
	  });
	  
	  
	  /* This code is merely for testing purposes to test the app locally*/
	  /*
	  const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
	console.log("items variable:");
	console.log(items);
	
	res.render('pages/index', {
        items: items
    });
	*/
  }
  
  
  function getManageFoodStoragePage(req, res){
	console.log("Getting items from DB");
	
	// This runs the query to get the hotdogs
	
  pool.query('SELECT * FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result.rows);
	const items = result.rows;
	console.log("items variable:");
	console.log(items);
	var infomessage = "";
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		infomessage: infomessage
    });
	
	//callback(null, result.rows);
    });
	
/* This code is merely for testing purposes to test the app locally*/
	  /*
	  const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
	console.log("items variable:");
	console.log(items);
	var infomessage = "";
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		infomessage: infomessage
    });
*/
}


function getHomePage(req, res){
	console.log("Getting items from DB");
	
	// This runs the query to get the hotdogs
	
  pool.query('SELECT * FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result.rows);
	const items = result.rows;
	console.log("items variable:");
	console.log(items);
	var infomessage = "";
	
	res.render('pages/home_page', {
        items: items,
		infomessage: infomessage
    });
	
	//callback(null, result.rows);
    });
	
/* This code is merely for testing purposes to test the app locally*/
	 /* 
	  const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
	console.log("items variable:");
	console.log(items);
	var infomessage = "";
	
	res.render('pages/home_page', {
        items: items,
		infomessage: infomessage
    });
*/
}
  
  
  
  
  
