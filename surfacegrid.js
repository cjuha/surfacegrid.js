var surfacegrid = function(MAX_X, MAX_Y, initial_value) {
	/******************************************************
		3D SURFACE APPROXIMATION GRID 
		http://kirkas.info/
		Last updated 17 May 2015

		Approximates a 3D surface by storing actual surface 
		values in a grid and calculating values between 
		the grid points with bilinear interpolation.

		Can be used to approximate density functions,
		wind values, and other useful stuff!

		All functions used to get and set grid values
		can take in floating point numbers, and will,
		if necessary, round them to integers.

		Coordinates between [0, MAX_X] and [0, MAX_Y] 
		are accepted, setters silently ignore off-limit
		values and getter returns null in those cases.
	******************************************************/
	var me = {},
		i, j;

	initial_value = initial_value || 0;

	// Set up 2D grid the size of (MAX_X+2)*(MAX_Y+2)
	//   (so that any coordinate within [0, max] has 
	//    points around it)
	me.grid = Array();
	for (i = 0; i <= MAX_X+1; i++) {
		me.grid.push(Array());

		for (j = 0; j <= MAX_Y+1; j++) {
			me.grid[i].push(initial_value);
		}
	}


	me.set = function(x, y, value) {
		// Set this grid point to exactly this value
		if (x < 0 || x > MAX_X || y < 0 || y > MAX_Y)
			return;

		var xi = Math.round(x),
			yi = Math.round(y);

		me.grid[Math.round(x)][Math.round(y)] = value;
	};


	me.add = function(x, y, value) {
		// Add this value to the grid point
		if (x < 0 || x > MAX_X || y < 0 || y > MAX_Y)
			return;

		// Avoid NaNs
		if (!isNaN(value))
			me.grid[Math.round(x)][Math.round(y)] += value;
	};


	me.get = function(x, y) {
		// Get the value in [x,y]
		if (x < 0 || x > MAX_X || y < 0 || y > MAX_Y)
			return null; // out of bounds

		// Floored values
		var ii = x|0;
		var jj = y|0;

		// Remainder between coordinates and values; 
		//   these are within [0,1]
		var xi = x-ii;
		var yj = y-jj;

		// Bilinear interpolation
		return me.grid[ii][jj] * (1-xi)*(1-yj) +
			   me.grid[ii+1][jj] * xi*(1-yj) +
			   me.grid[ii][jj+1] * (1-xi)*yj +
			   me.grid[ii+1][jj+1] * xi*yj;
	};

	return me;
};