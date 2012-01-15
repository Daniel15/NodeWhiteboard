/**
 * Constructor for Ellipse.
 * @param	Object		Raphael paper for the drawing
 * @param	int			Starting X position
 * @param	int			Starting Y position
 */
Tools.Shape.Ellipse = function(paper, startX, startY, colour)
{
	this.paper = paper;
	this.startX = startX;
	this.startY = startY;
	this.shape = this.paper.ellipse(startX, startY, 0, 0);
	this.shape.attr({
		fill: colour,
		opacity: 0.4,
		stroke: 'black',
		'stroke-width': 1
	});
}

Tools.Shape.Ellipse.prototype =
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
		// The centre is half-way
		var centreX = this.startX + (width / 2),
			centreY = this.startY + (height / 2);
			
		this.shape.attr({
			cx: centreX,
			cy: centreY,
			rx: width,
			ry: height
		});
	},
	
	/**
	 * Get information about the shape in its current form.
	 * @return	Hash	Data about the shape
	 */
	getShape: function()
	{
		return {
			type: 'ellipse',
			cx: this.shape.attr('cx'),
			cy: this.shape.attr('cy'),
			rx: this.shape.attr('rx'),
			ry: this.shape.attr('ry'),
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
