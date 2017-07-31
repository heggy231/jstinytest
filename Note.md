understand forEach from pjs

[1,2,3].forEach(function() {
	console.log('hi');
});

// call back function iterates over array for every item. this example three times
// output: hi hi hi

We wrote forEach implementation function

forEach([1,2,3], function() {
	console.log('hi');
});