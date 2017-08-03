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