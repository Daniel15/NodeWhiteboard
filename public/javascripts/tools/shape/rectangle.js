/**
 * Constructor for Rectangle.
 * @param	Object		Raphael paper for the drawing
 * @param	int			Starting X position
 * @param	int			Starting Y position
 */
Tools.Shape.Rectangle = function(paper, startX, startY, colour)
{
	this.paper = paper;
	this.startX = startX;
	this.startY = startY;
	this.shape = this.paper.rect(startX, startY, 0, 0);
	this.shape.attr({
		fill: colour,
		opacity: 0.4,
		stroke: 'black',
		'stroke-width': 1
	});
}

Tools.Shape.Rectangle.prototype =
{
	/**
	 * Called when the mouse is moved.
	 * @param	int		Width of the shape
	 * @param	int		Height of the shape
	 * @param	int		X position of the mouse
	 * @param	int		Y position of the mouse
	 */
	mouseMove: function(width, height, mouseX, mouseY)
	{
		this.shape.attr({
			width: width,
			height: height
		});
	},
	
	/**
	 * Get information about the shape in its current form.
	 * @return	Hash	Data about the shape
	 */
	getShape: function()
	{
		return {
			type: 'rect',
			x: this.shape.attr('x'),
			y: this.shape.attr('y'),
			width: this.shape.attr('width'),
			height: this.shape.attr('height'),
			fill: this.shape.attr('fill'),
			stroke: this.shape.attr('stroke'),
			'stroke-width': this.shape.attr('stroke-width')
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
