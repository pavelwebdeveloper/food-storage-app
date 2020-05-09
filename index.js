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
  .put('/updateitem', updateItem)
  
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
	  //const items = [{id:1,itemname:'fish',amount:150},{id:2,itemname:'cheese',amount:30}]
	console.log("items variable:");
	console.log(items);
	
	res.render('pages/index', {
        items: items
    });
	*/
  }
  
  
  function getManageFoodStoragePage(req, res){
		 
	
	// This runs the query to get the hotdogs
	console.log("Getting items from DB");
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
	
	var successmessage;
	var infomessage = "";
	const itemname = "";
	const itemamount = 0;
	
	if(!req.query.itemname){
	successmessage = "";
	} else {
		successmessage = "Success! You have successfully deleted " + req.query.itemname + " !";
	}
	
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		successmessage: successmessage,
		infomessage: infomessage,
		itemname: itemname,
		itemamount: itemamount
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
		var successmessage = "";
		//var nextItemNumber = 0;
	console.log("Add Item Info:");
	console.log(req.query.itemname);
	console.log(req.query.itemamount);
		
	if(!req.query.itemname || !req.query.itemamount) {
		
		// This runs the query to get the items
  pool.query('SELECT * FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }	  
	  	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:");
	console.log(result.rows);
	const items = result.rows;
	const itemname = req.query.itemname;
	const itemamount = req.query.itemamount;
	console.log("items variable: $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
	console.log(items);
	
	infomessage = "Please, provide all the required information.";
		res.render('pages/manage_food_storage_page', {
        infomessage: infomessage,
		successmessage: successmessage,
		items: items,
		itemname: itemname,
		itemamount: itemamount
    });
    }); 
	
		
	} else if(req.query.itemamount<0) {
		// This runs the query to get the items
  pool.query('SELECT * FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }	  
	  	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:");
	console.log(result.rows);
	const items = result.rows;
	const itemname = req.query.itemname;
	const itemamount = req.query.itemamount;
	console.log("items variable: $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
	console.log(items);
	
	infomessage = "The amount value should not be negative";
		res.render('pages/manage_food_storage_page', {
        infomessage: infomessage,
		successmessage: successmessage,
		items: items,
		itemname: itemname,
		itemamount: itemamount
    });
    }); 
	} else {
		var foundExistingItem = false;
		// This runs the query to get the items number
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
	
		items.forEach(function(item) {
		if(item.itemname == req.query.itemname){
			infomessage = req.query.itemname + " is already included in the list";
			successmessage = "";
			const itemname = req.query.itemname;
			const itemamount = req.query.itemamount;
			
			res.render('pages/manage_food_storage_page', {
        items: items,
		successmessage: successmessage,
		infomessage: infomessage,
		itemname: itemname,
		itemamount: itemamount
			});
			
			foundExistingItem = true;
		}
	});

		if(!foundExistingItem){
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
	const itemname = "";
	const itemamount = 0;
	
	
	res.render('pages/manage_food_storage_page', {
        items: items,
		successmessage: successmessage,
		infomessage: infomessage,
		itemname: itemname,
		itemamount: itemamount
    });

    }); 
    });
	
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
	
    }); 
		

		

	}
	
}


function deleteItem(req, res) {
	  console.log("Id of Item that is going to be deleted:");
	  //var itemname = req.query.itemname;
	  var successmessage = "";
	  var infomessage = "";
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
		infomessage: infomessage
		});
    });
  }
  
  
    function updateItem(req, res) {
	  var infomessage = "";
	  var newamount = 0;
	  var oldamount = 0;
	  var updateamount = req.query.updateamount;
	  console.log("itemamount variable:))))))))))))))))))))");
	console.log(updateamount);
	isNaN(updateamount);
	  console.log("Update Item: %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
	  
	  // This runs the query to get the hotdogs
  pool.query('SELECT amount FROM items WHERE id = $1', [req.query.id], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with the amount:");
	console.log(result.rows);
	oldamount = result.rows[0].amount;
	console.log("oldamount variable:");
	console.log(oldamount);
	
	newamount = oldamount + updateamount;
	
	console.log("New amount before if:");
	console.log(newamount);
	
	if(newamount<0){
		newamount = 0;
	}

	console.log("New amount after if:");
	console.log(newamount);
    });
	
	

 /*
	pool.query('UPDATE hotdogs SET hotdogname = $2, description = $3, price = $4 WHERE id = $1', [Number(obj.id), obj.hotdogname, obj.hotdogdescription, obj.hotdogprice], function(err, result) {
	console.log("Result from DB with ");
	console.log(result);

	
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  pool.query('SELECT hotdogs.id, hotdogname, description, price, images.image FROM hotdogs JOIN images ON hotdogs.image = images.id', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result.rows);
	const hotdogs = result.rows;
	console.log("hotdogs variable:");
	console.log(hotdogs);
	infomessage = "The information about " + obj.hotdogname + " has been successfully updated !";
	
	res.render('pages/manage_hot_dogs_page', {
        hotdogs: hotdogs,
		infomessage: infomessage
    });
	
	//callback(null, result.rows);
    });
	  
});
*/


  }
  
  
  
  
  
