##Understand forEach from pjs

[1,2,3].forEach(function() {
	console.log('hi');
});

// call back function iterates over array for every item. this example three times
// output: hi hi hi

We wrote forEach implementation function

forEach([1,2,3], function() {
	console.log('hi');
});

- optional this argument
pjs version Under view > displayTodos method
'this' points to view obj as this points to object it is on.

##Understand filter method

MDN: filter() calls a provided callback function once for each element in an array, and constructs a new array of all the values for which callback returns a value that coerces to true. 
or

Callback is function to test each element of the array.  Invoked with arguments (element, index, array).  Return true to keep the element, false otherwise.

var filteredArray = [1, 2, 3].filter(function(element, index, array) {
	// callback function that is return all false therefore don't keep any
	return false;
});

filteredArray; // output: [] since callback function returns false for each element in array

var filteredArray = [1, 2, 3].filter(function(element, index, array) {
	// callback function now returns true; all elements pass test
	return true;
});

filteredArray; // output: [1, 2, 3]

var filteredArray = [1, 2, 3].filter(function(element, index, array) {
	var include = false;
	
	if (element > 1) {
		include = true;
	}
	
	return include;
});

filteredArray; // output: [2, 3]

// refactor above code with strength and economy
var filteredArray = [1, 2, 3].filter(function(element, index, array) {
	return element > 1;
});
filteredArray; // output: [2, 3]

// see if we have access to element, index, array
var filteredArray = [1, 2, 3].filter(function(element, index, array) {
	console.log(element, index, array);
	return element > 1;
});

output: 
element, index, array
1 0 [ 1, 2, 3 ]
2 1 [ 1, 2, 3 ]
3 2 [ 1, 2, 3 ]

## lesson on filter method's optional this argument
var filteredArray = [1, 2, 3].filter(function(element, index, array) {
	// this refers to optional this argument with 'PJ Sandwich' value
	// it will print out PJ Sandwich the no of elements in array
	console.log(this.myFavoriteSnack);
}, {myFavoriteSnack: 'PJ Sandwich'});

// output: PJ Sandwich PJ Sandwich PJ Sandwich
// https://repl.it/JpjS/1

- MDN ex)
var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

var longWords = words.filter(function(word) {
	console.log(this.favoriteSnack);
	return word.length > 6;
}, {favoriteSnack: "gum"});
// output: 'gum' 6 times
longWords;
// output: ["exuberant", "destruction", "present"]

ES6:
var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
// var longWords = words.filter(function(word){ 
// 	return word.length > 6;
// });
// Filtered array longWords is ["exuberant", "destruction", "present"]
var longWords = words.filter(word => word.length > 6);

- To count which index a letter is
use charAt() or bracket notation
var quote = "Stay awhile and listen!";
quote.charAt(6); // output: "w"

or 

console.log(quote[6]); // w

- Array.isArray 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
Array.isArray() function determines whether the passed value is an Array.
Array.isArray([1, 2, 3]);  // true
Array.isArray({foo: 123}); // false

- Filter TDD's tricky parts review this: 
https://watchandcode.com/courses/77710/lectures/1404003
39:00
* 'It should return an array' (using isArray method to check if it is an array)
* 'It should return a new array, not the array being filtered.'
* 'It should return a new array that only has elements where callback returns true.'

# map 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
definition of map: original element will map to new element
callback function is description for its relationship btwn original element to returned output

- simple example that demonstrates power of .map()
https://watchandcode.com/courses/77710/lectures/1429573

[1, 1, 1].map(function(num) {
	return num * 20;
});
// output: [20, 20, 20]

[1, 1, 1].map(function(num) {
	// it could be boolean string undefined 
	return true;
});
// output: [true, true, true]

[1, 1, 1].map(function(num) {
	return;
});
// output: undefined, undefined, undefined


