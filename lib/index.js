'use strict';

// MODULES //

var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var pow = require( 'math-power' );
var toDouble = require( './todouble.js' );


// VARIABLES //

var BIAS = 1023;


// FROM BITS //

/**
* FUNCTION: fromBits( bstr )
*	Creates a double-precision floating-point number from a literal bit representation.
*
* @param {String} bstr - string which is a literal bit representation
* @returns {Number} double
*/
function fromBits( bstr ) {
	var sign;
	var frac;
	var exp;

	// Sign bit:
	sign = ( bstr[0] === '1' ) ? -1 : 1;

	// Exponent bits:
	exp = parseInt( bstr.substring(1,12), 2 ) - BIAS;

	// Fraction bits:
	frac = toDouble( bstr.substring( 12 ) );

	// Detect `0` (all 0s) and subnormals (exponent bits are all 0, but fraction bits are not all 0s)...
	if ( exp === -BIAS ) {
		if ( frac === 0 ) {
			return ( sign === 1 ) ? 0 : -0;
		}
		exp = -1022; // subnormals are special
	}
	// Detect `+-inf` (exponent bits are all 1 and fraction is 0) and `NaN` (exponent bits are all 1 and fraction is not 0)...
	else if ( exp === BIAS+1 ) {
		if ( frac === 0 ) {
			return ( sign === 1 ) ? pinf : ninf;
		}
		return NaN;
	}
	// Normal numbers...
	else {
		// Account for hidden/implicit bit (2^0):
		frac += 1;
	}
	return sign * frac * pow( 2, exp );
} // end FUNCTION fromBits()


// EXPORTS //

module.exports = fromBits;
