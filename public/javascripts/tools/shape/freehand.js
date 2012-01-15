/**
 * Constructor for free-hand drawing tool.
 * @param	Object		Raphael paper for the drawing
 * @param	int			Starting X position
 * @param	int			Starting Y position
 */
Tools.Shape.FreeHand = function(paper, startX, startY, colour)
{
	this.paper = paper;
	this.startX = startX;
	this.startY = startY;
	this.points = [[startX, startY]];
	this.shape = this.paper.path(this.getPath());
	this.shape.attr({
		opacity: 0.4,
		stroke: colour,
		'stroke-width': 1,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round'
	});
}

Tools.Shape.FreeHand.prototype =
{
	/**
	 * Get the SVG path for this shape
	 */
	getPath: function()
	{
		var count = this.points.length;
			
		if (count == 0)
			return null;
			
		var path = 'M' + this.points[0][0] + ',' + this.points[0][1];
		// Skipping the first point
		for (var i = 1; i < count; i++)
		{
			path += 'L' + this.points[i][0] + ',' + this.points[i][1];
		}
		
		return path;
	},
	
	/**
	 * Called when the mouse is moved.
	 * @param	int		Width of the shape
	 * @param	int		Height of the shape
	 * @param	int		X position of the mouse
	 * @param	int		Y position of the mouse
	 */
	mouseMove: function(width, height, mouseX, mouseY)
	{
		this.points.push([mouseX, mouseY]);
		this.shape.attr('path', this.getPath());
	},
	
	/**
	 * Get information about the shape in its current form.
	 * @return	Hash	Data about the shape
	 */
	getShape: function()
	{
		return {
			type: 'path',
			path: this.getPath(),
			stroke: this.shape.attr('stroke'),
			'stroke-width': this.shape.attr('stroke-width'),
			'stroke-linecap': this.shape.attr('stroke-linecap'),
			'stroke-linejoin': this.shape.attr('stroke-linejoin')
		};
	},
	
	/**
	 * Finish drawing this shape - Remove the temporary version from the drawing, and return its 
	 * data.
	 */
	finish: function()
	{
		var shape = this.getShape();
		this.shape.remove();
		this.shape = null;
		return shape;
	}
};
