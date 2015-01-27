var express = require('express');
var Q = require('q');
// var database = require('database.config.js');
var router = express.Router();

var sql = require('mssql');

var config = {
	user: '',
	password: '',
	server: '',
	database: '',

	options: {
		// encrypt: true // Use this if you're on Windows Azure
	}
}

var maxage = 36000;

var cache = {
	timeout: 60000,
	data: {},
	urls: {},
	lastrequest: {}
};

// var getData = function(options) {

// 	// options = {
// 	// 	storedproc: '',
// 	// 	inputs: [{ key: '', type: sql.NVarChar,value: ''}]
// 	//  cache: 5000
// 	// }

// 	// store cache ID for the current request
// 	var cacheId = JSON.stringify(options);

// 	var t1 = new Date().getTime();
// 	var t2;

// 	var deferred = Q.defer();

// 	var cacheTimeout;

// 	if(typeof options.cache !== 'undefined'){
// 		cacheTimeout = options.cache;
// 	} else {
// 		cacheTimeout = cache.timeout;
// 	}

// 	// console.log('cache', options.cache);
// 	// console.log('Data is ' + parseInt(new Date().getTime() - cache.lastrequest[cacheId]) + 'ms old (timeout: '+cacheTimeout+')');

// 	if(cache.urls[cacheId] && parseInt(new Date().getTime() - cache.lastrequest[cacheId]) < cacheTimeout) {
// 		t2 = new Date().getTime();
// 		console.log('Cached data served in: ' + parseInt(t2-t1) + 'ms');
// 		deferred.resolve(JSON.parse(cache.data[cacheId]));
// 	} else {

// 		var connection = new sql.Connection(config, function(err) {

// 			if(err) {
// 				deferred.resolve({ error: err });
// 			}


// 			var request = new sql.Request(connection);

// 			for (var i = options.inputs.length - 1; i >= 0; i--) {
// 				request.input(options.inputs[i].key, options.inputs[i].type, options.inputs[i].value);
// 			};

// 			// request.verbose = true;

// 			request.execute(options.storedproc, function(err, recordsets, returnValue) {
// 				if(err) {
// 					deferred.resolve({ error: err });
// 				}


// 				t2 = new Date().getTime();
// 				console.log('Data served in: ' + parseInt(t2-t1) + 'ms');
// 				cache.data[cacheId] = JSON.stringify(formatJSON(recordsets));
// 				cache.urls[cacheId] = true;
// 				cache.lastrequest[cacheId] = new Date().getTime();
// 				deferred.resolve(formatJSON(recordsets));
// 			});
// 		});
// 	}

// 	return deferred.promise;



// };


// router.get('/test', function(req, res) {

// 	// var request = new sql.Request();
// 	// request.execute('MyCustomStoredProcedure', function(err, recordsets, returnValue) {
// 	// 	// ... error checks

// 	// 	console.dir(recordsets[0][0]); // {a: 'hello tvp', b: 777}
// 	// });

// 	// CREATE PROCEDURE MyCustomStoredProcedure (@tvp TestType readonly) AS SELECT * FROM @tvp

// 	var connection = new sql.Connection(config, function(err) {


// 		// var ps = new sql.PreparedStatement(connection);
// 		// ps.input('param', sql.Int);
// 		// ps.input('param2', sql.Int);
// 		// ps.prepare('select 3,NULL as s1, NULL', function(err) {
// 		//     // ... error checks

// 		//     ps.execute({param: 12345}, function(err, recordset) {
// 		//         // ... error checks

// 		//         console.log(recordset); // return 12345
// 		//     });
// 		// });



// 		var request = new sql.Request(connection);

// 		request.execute('[rpt].[Test]', function(err, recordsets, returnValue) {
// 			console.log('error', err, returnValue)
// 			console.dir('data', recordsets); // {a: 'hello tvp', b: 777}
// 		});



// 		// function(err) {
// 		// 		    // ... error checks

// 		// 		    ps.execute({param: 12345, param2: 1}, function(err, recordset) {
// 		// 		        console.log(1, err, recordset)

// 		// 		        ps.unprepare(function(err) {
// 		// 		            console.log(2, err, recordset)

// 		// 		        });
// 		// 		    });
// 		// 		}

// 	});



// });


router.get('/*', function(req, res) {

	res.set({
		'Content-Type': 'application/json',
	// 	'Cache-Control': 'max-age=604800'
	})
	res.sendfile('fakedata'+req.url+'.json');

});


module.exports = router;




