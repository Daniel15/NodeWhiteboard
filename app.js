/**
 * Module dependencies.
 */

var express = require('express'), 
	routes = require('./routes'),
	now = require('now');

var app = module.exports = express.createServer(),
	everyone = now.initialize(app);

// Configuration
app.configure(function()
{
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function()
{
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function()
{
	app.use(express.errorHandler()); 
});

// Routes
//app.get('/', routes.index);
app.get('/', function(req, res)
{
	res.render('index',
	{
		title: 'Whiteboard',
		pageId: 'index'
	})
});


// -------------------------------------------
// Now.js functions
// TODO: Move this all to a separate file
var shapes = {};
everyone.connected(function()
{
	console.log('%s connected', this.user.clientId);
	// Send all the current shapes
	this.now.initShapes(shapes);
});

/**
 * Add a new shape to the drawing. Adds the shape to the shape cache and then broadcasts it to
 * every user.
 * @param	String		Client's shape ID - Starts at 1 and increments for each new shape
 * @param	Object		Shape data
 */
everyone.now.newShape = function(clientShapeId, shape)
{
	var shapeId = this.user.clientId + '_' + clientShapeId;
	console.log('Adding shape %s', shapeId);
	shapes[shapeId] = shape;
	
	everyone.now.shapeAdded(this.user.clientId, shapeId, shape);
};

/**
 * Clear the drawing.
 */
everyone.now.clear = function()
{
	console.log('%s cleared the drawing', this.user.clientId)
	shapes = {};
	everyone.now.cleared();
}
// -------------------------------------------

app.listen(3000);
console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
