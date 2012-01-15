var Whiteboard =
{
	shapes: {},
	maxShapeId: 0,
	
	init: function()
	{
		// Elements
		this.drawingEl = $('drawing');
		this.drawingElPos = this.drawingEl.getPosition();
		this.clearButtonEl = $('clear');
		
		// Events
		this.drawingEl.addEvent('mousedown', this.mouseDown.bind(this));
		this.drawingEl.addEvent('mousemove', this.mouseMove.bind(this));
		this.drawingEl.addEvent('mouseup', this.mouseUp.bind(this));
		this.clearButtonEl.addEvent('click', this.clear.bind(this));
		
		// Now.js
		now.shapeAdded = this.shapeAdded.bind(this);
		now.initShapes = this.initShapes.bind(this);
		now.cleared = this.cleared.bind(this);
	},
	initShapes: function(shapes)
	{
		// Initialize Raphael
		this.paper = new Raphael(this.drawingEl.element, 600, 600);
		// Remove loading indicator
		$('loading').remove();
		
		for (var i in shapes)
		{
			if (shapes.hasOwnProperty(i))
			{
				this.shapeAdded(null, i, shapes[i]);
			}
		}
	},
	createShapeTool: function(x, y, colour)
	{
		var tool = null;
		if ($('rectangle').get('checked'))
			tool = 'Rectangle';
		else if ($('ellipse').get('checked'))
			tool = 'Ellipse';
		else if ($('freehand').get('checked'))
			tool = 'FreeHand';
			
		if (!tool)
			return null;
			
		return new Tools.Shape[tool](this.paper, x, y, colour);
	},
	mouseDown: function(e)
	{
		this.isDrawing = true;
		
		var x = this.drawingStartX = e.pageX - this.drawingElPos.x,
		    y = this.drawingStartY = e.pageY - this.drawingElPos.y;
		   
		// TODO: Support more than just rect
		//this.drawingTool = new Tools.Shape.Rectangle(this.paper, x, y);
		this.drawingTool = this.createShapeTool(x, y, $('colour').get('value'));
	},	
	mouseMove: function(e)
	{
		// We don't care about the mouse if the user is not drawing
		if (!this.isDrawing)
			return;
		
		// Size = mouse position - starting position
		var mouseX = e.pageX - this.drawingElPos.x,
			mouseY = e.pageY - this.drawingElPos.y,
			width = mouseX - this.drawingStartX,
		    height = mouseY - this.drawingStartY;
		
		this.drawingTool.mouseMove(width, height, mouseX, mouseY);
	},
	mouseUp: function(e)
	{
		this.isDrawing = false;
		
		// Ignore the shape if it ended up less than 5 pixels wide
		// TODO
		/*if (this.drawingShape.attr('width') < 5 && this.drawingShape.attr('height') < 5)
		{
			this.drawingShape = null;
			return;
		}*/
		
		var shapeId = this.maxShapeId++,
			shapeData = this.drawingTool.finish();
		
		// Add this shape right away
		this.shapeAdded(now.core.clientId, now.core.clientId + '_' + shapeId, shapeData);
		
		// Send this shape to the server
		now.newShape(shapeId, shapeData);
	},
	
	/**
	 * Called from server - shape was added
	 */
	shapeAdded: function(clientId, shapeId, data)
	{
		// If this shape was already added, ignore it
		if (this.shapes[shapeId])
			return;
			
		// Create the shape
		var shape = this.shapes[shapeId] = this.paper.add([data])[0];
		/*shape.dblclick(function()
		{
			shape.remove();
			// TODO: Send to server
		});*/
			
		//console.log(clientId, shapeId, data);
	},
	clear: function()
	{
		now.clear();
		this.cleared();
		
	},
	cleared: function()
	{
		this.paper.clear();
	}
};

// If on the body, initialise when Now.js is ready
if (document.body.id == 'index')
{
	Whiteboard.init();
}
