# surfacegrid.js
Javascript 3D surface approximation grid

Approximates a 3D surface by storing actual surface values in a grid and calculating values between the grid points with bilinear interpolation.

Can be used to approximate density functions, map temperatures, wind values, and other useful stuff!

All functions used to get and set grid values can take in floating point numbers, and will, if necessary, round them to integers.

Coordinates between [0, MAX_X] and [0, MAX_Y] are accepted, setters silently ignore off-limit values and getter returns null in those cases.