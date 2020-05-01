const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();
const connectionString = process.env.DATABASE_URL
const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString})
//var items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}];

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', getFoodStorageItems)
  .get('/getmanagefoodstoragepage', getManageFoodStoragePage)
  .get('/gethomepage', getHomePage)
  .post('/additem', addItem)
  .delete('/deleteitem', deleteItem)
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  
  
  // The functions
  
  function getFoodStorageItems (req, res) {
	  var itemsnumber = 0;
	  
	  pool.query('SELECT COUNT(id) FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with the number of items in the items table");
	console.log(result.rows);
	itemsnumber = result.rows.count;
	console.log("items number");
	console.log(itemsnumber);
    });
	  
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
			items: items,
			itemsnumber: itemsnumber
		});
	
	  });
	  
	  
	  
	  /* This code is merely for testing purposes to test the app locally*/
	  /*
	  //const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
	console.log("items variable:");
	console.log(items);
	
	res.render('pages/index', {
        items: items
    });
	*/
  }
  
  
  function getManageFoodStoragePage(req, res){
	  var itemsnumber = 0;
	console.log("Getting items from DB");
	
	
	pool.query('SELECT COUNT(id) FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with the number of items in the items table");
	console.log(result.rows);
	itemsnumber = result.rows;
	console.log("items number");
	console.log(itemsnumber);
    });
	
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
	var successmessage = "";
	var warnmessage = "";
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		successmessage: successmessage,
		warnmessage: warnmessage,
		itemsnumber: itemsnumber
		});
    });
	
	
/* This code is merely for testing purposes to test the app locally*/
	 /* 
	 // const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
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
	var itemsnumber = 0;
	console.log("Getting items from DB");
	
	pool.query('SELECT COUNT(id) FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with the number of items in the items table");
	console.log(result.rows);
	itemsnumber = result.rows;
	console.log("items number");
	console.log(itemsnumber);
    });
	
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
		infomessage: infomessage,
		itemsnumber: itemsnumber
		});
    });
	
	
/* This code is merely for testing purposes to test the app locally*/
	  
	  //const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
	  /*
	console.log("items variable:");
	console.log(items);
	var infomessage = "";
	
	res.render('pages/home_page', {
        items: items,
		infomessage: infomessage
    });
*/
}


function addItem(req, res) {
		var infomessage = "";
		var itemsnumber = 0;
		//var nextItemNumber = 0;
	console.log("Add Item Info:");
	console.log(req.query.itemname);
	console.log(req.query.itemamount);
	if(!req.query.itemname || !req.query.itemamount) {
	warnmessage = "Please, provide all the required information.";
		res.render('pages/manage_food_storage_page', {
        warnmessage: warnmessage
    });	
	} else {
		// This runs the query to get the items number
		
  pool.query('SELECT COUNT(id) FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with the number of items in the items table");
	console.log(result.rows);
	itemsnumber = result.rows;
	console.log("items number");
	console.log(itemsnumber);
    });
		
		// This runs the query to add an item
  pool.query('INSERT INTO items (itemname, amount) VALUES ($1, $2)', [req.query.itemname, req.query.itemamount], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    // Log this to the console for debugging purposes.
    console.log("Back from DB with result of adding an item:");
	console.log(result);
	console.log(result.rowCount);
	
	
	// This runs the query to get the items
  pool.query('SELECT * FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	 
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:");
	console.log(result.rows);
	const items = result.rows;
	console.log("items variable: $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
	console.log(items);
	successmessage = "Success! You have successfully added " + req.query.itemname + " !";
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		successmessage: successmessage,
		itemsnumber: itemsnumber
    });

    }); 
    });
	}
	/* This code is merely for testing purposes to test the app locally*/
	/*
	{
		
		// This runs the query to add an item
		var newItem = {id:0,itemname:'',amount:0};
		console.log("items before adding a new item");
		console.log(items);
		newItem.id = items.length + 1;
		newItem.itemname = req.query.itemname;
		newItem.amount = req.query.itemamount;
		items.push(newItem);
		console.log("items after adding a new item");
		console.log(items);
		
		
		var infomessage = "";
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		infomessage: infomessage
    });		
	}
	*/
}


function deleteItem(req, res) {
	var itemsnumber = 0;
	  console.log("Id of Item that is going to be deleted:");
	  //var itemname = req.query.itemname;
	  var successmessage = "";
	console.log(req.query.id);
	pool.query('DELETE FROM items WHERE id=$1', [req.query.id], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result);
	
	//callback(null, result.rows);
    });
	
	  pool.query('SELECT COUNT(id) FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with the number of items in the items table");
	console.log(result.rows);
	itemsnumber = result.rows;
	console.log("items number");
	console.log(itemsnumber);
    });
	
	
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
	successmessage = "You have successfully deleted " + req.query.itemname;
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		successmessage: successmessage,
		itemsnumber: itemsnumber
		});
    });
  }
  
  
  
  
  
