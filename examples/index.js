'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var toBits = require( 'math-float64-bits' );
var fromBits = require( './../lib' );

var frac;
var sign;
var exp;
var b;
var x;
var y;
var i;

// Convert random numbers to literal bit representations and then convert them back...
for ( i = 0; i < 100; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	frac = Math.random() * 10;
	exp = round( Math.random()*100 );
	if ( Math.random() < 0.5 ) {
		exp = -exp;
	}
	x = sign * frac * pow( 2, exp );
	b = toBits( x );
	y = fromBits( b );
	console.log( '%d => %s => %d', x, b, y );
	console.log( x === y );
}
