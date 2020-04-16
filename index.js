const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL
const { Pool } = require('pg')
const pool = new Pool({connectionString: connectionString})

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', getFoodStorageItems)
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  function getFoodStorageItems (req, res) {
	  pool.query('SELECT itemname, amount FROM items', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result.rows);
	const hotdogs = result.rows;
	console.log("items variable:");
	console.log(items);
	
	res.render('pages/index', {
        items: items
    });
	
	//callback(null, result.rows);
	  });
  }
  
  
  
  
