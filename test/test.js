'use strict';

// MODULES //

var tape = require( 'tape' );
var getKeys = require( 'object-keys' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var toBits = require( 'math-float64-bits' );
var fromBits = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/bits_1e-200_1e-308.json' );
var medium = require( './fixtures/bits_-1e3_1e3.json' );
var large = require( './fixtures/bits_1e200_1e308.json' );
var subnormal = require( './fixtures/bits_1e-310_5e-324.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof fromBits === 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided all zeros, the function returns `+0`', function test( t ) {
	t.equal( fromBits( toBits( 0 ) ), 0, 'returns +0' );
	t.end();
});

tape( 'if provided a sign bit of 1 and all zeros, the function returns `-0`', function test( t ) {
	var v = fromBits( toBits( -0 ) );
	t.equal( v, 0, 'returns 0' );
	t.equal( 1/v, ninf, 'returns -0' );
	t.end();
});

tape( 'if provided a bit sequence where all exponent bits are 1s and everything else is 0, the function returns positive infinity', function test( t ) {

	t.equal( fromBits( toBits( pinf ) ), pinf, 'returns +infinity' );
	t.end();
});

tape( 'if provided a bit sequence where the sign bit is 1, all exponent bits are 1s, and everything else is 0, the function returns negative infinity', function test( t ) {

	t.equal( fromBits( toBits( ninf ) ), ninf, 'returns -infinity' );
	t.end();
});

tape( 'if provided a bit sequence where the sign bit may be either 1 or 0, all exponent bits are 1s, and the fraction is not all 0s, the function returns `NaN`', function test( t ) {
	var v = fromBits( toBits( NaN ) );
	t.ok( v !== v, 'returns NaN' );
	t.end();
});

tape( 'the function creates double-precision floating-point numbers from literal bit representations for small values', function test( t ) {
	var keys;
	var key;
	var val;
	var x;
	var i;

	keys = getKeys( small );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = fromBits( key );
		val = parseFloat( small[ key ] );
		t.equal( x, val, 'returns a double equal to ' + val + ' from ' + key );
	}
	t.end();
});

tape( 'the function creates double-precision floating-point numbers from literal bit representations for medium values', function test( t ) {
	var keys;
	var key;
	var val;
	var x;
	var i;

	keys = getKeys( medium );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = fromBits( key );
		val = parseFloat( medium[ key ] );
		t.equal( x, val, 'returns a double equal to ' + val + ' from ' + key );
	}
	t.end();
});

tape( 'the function creates double-precision floating-point numbers from literal bit representations for large values', function test( t ) {
	var keys;
	var key;
	var val;
	var x;
	var i;

	keys = getKeys( large );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = fromBits( key );
		val = parseFloat( large[ key ] );
		t.equal( x, val, 'returns a double equal to ' + val + ' from ' + key );
	}
	t.end();
});

tape( 'the function creates double-precision floating-point numbers from literal bit representations for subnormal values', function test( t ) {
	var keys;
	var key;
	var val;
	var x;
	var i;

	keys = getKeys( subnormal );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		x = fromBits( key );
		val = parseFloat( subnormal[ key ] );
		t.equal( x, val, 'returns a double equal to ' + val + ' from ' + key );
	}
	t.end();
});
