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

- note for return value in map
  it will have exactly same number of elements in map as in for each.  Note that filter method will most of the time less than original no of elements as return value since it gets filtered out.

- In map, each original value of element will map to new elements.  length of original array = length of new array 

- at the end of map function, try running map function that you just made in the console that your code is running.

map([1,2,3,4], function(number) {
	return number * 2;
});

// output: [2, 4, 6, 8]

- edge case of MDN calls "missing elements"
// first element is missing

var weirdArray = [, 1, undefined];
weirdArray[0] // undefined, missing element
weirdArray[1] // 1
weirdArray[2] // undefined, but property exists

The result of weirdArray[0] and weirdArray[2] being equal
is weird since [0] is missing val vs [2] is assigned value is undefined.

Let's look at it using object (since array is an obj)
var fakeArray = {
	1: 1,
	2: undefined
}
// note 0: is not defined

fakeArray[0] // undefined, missing element
fakeArray[1] // 1
fakeArray[2] // undefined, but property exists

// The result of fakeArray[0] and fakeArray[2] being equal
is unexpected since they are characteristically different.  [0] is missing val vs [2] is unassigned value.

- How do we check if propertyName exists in obj?
// test if propertyName exisits
// propertyName in object
0 in fakeArray // false no property exist
1 in fakeArray // true property exist
2 in fakeArray // true property exist

propertyName in object sucessfully checks "missing elements" (as referred in MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

- undefined ('missing value') * 2 = NaN

# understanding reduce from elementary level

var numbers = [1, 2, 3, 4];

// 0 + 1 = 1
// 1 + 2 = 3
// 3 + 3 = 6
// 6 + 4 = 10

var sumSoFar = 0;
sumSoFar = sumSoFar + numbers[0] // 0 + 1 = 1
sumSoFar = sumSoFar + numbers[1] // 1 + 2 = 3
sumSoFar = sumSoFar + numbers[2] // 3 + 3 = 6
sumSoFar = sumSoFar + numbers[3] // 6 + 4 =10
// output: 10

function adder(sumSoFar, nextNumber) {
  return sumSoFar + nextNumber;
}

var sumSoFar = 0;
sumSoFar = adder(sumSoFar, numbers[0]) // 0 + 1 = 1
sumSoFar = adder(sumSoFar, numbers[1]) // 1 + 2 = 3
sumSoFar = adder(sumSoFar, numbers[2]) // 3 + 3 = 6
sumSoFar = adder(sumSoFar, numbers[3]) // 6 + 4 =10
// output: 10

var numbers = [1, 2, 3, 4];
var sumSoFar = 0;
for (var i = 0; i < numbers.length; i++){
  sumSoFar = adder(sumSoFar, numbers[i]);
}
// output: 10

- Progression to creating reduce funtion prototype:

function getSum(numbersArray, adderFunction, startingValue) {
	var sumSoFar = startingValue;
	for (var i = 0; i <numbersArray.length; i++) {
		sumSoFar = adderFunction(sumSoFar, numbersArray[i]);
	}
	return sumSoFar;
}

function getSum(numbers, adder, startingValue) {
  var sumSoFar = startingValue;
  for (var i = 0; i < numbers.length; i++) {
    sumSoFar = adder(sumSoFar, numbers[i]);
  }
  return sumSoFar;
}

getSum(numbers, adder, 0);
// output: 10

- Final product reduce prototype: generalize

function reduce(array, callback, startingValue) {
  var resultSoFar = startingValue;
  for (var i = 0; i < array.length; i++) {
    resultSoFar = callback(resultSoFar, array[i]);
  }
  return resultSoFar;
}

reduce(['h', 'e', 'g', 'g', 'y'], function(resultSoFar, nextLetter) {
  return resultSoFar + nextLetter;
}, '');
// output: "heggy"

- Number of times Reduce Runs is Equal to the Number of Elements in array

// If initialValue exist, callback runs array.lenth times
[1].reduce(function() {
	console.log('hi');
}, 0);
// output: 'hi' once
[1, 2, 3].reduce(function() {
	console.log('hi');
}, 0);
// output: 'hi' three times; according to the number of elements in array

// If No initialValue, callback runs (array.length - 1) times
[1, 2, 3].reduce(function() {
	console.log('hi');
});
// output: 'hi' two times; (array.length - 1) times
- Resource from MDN doc:  If no initialValue is provided, then accumulator will be equal 
// to the first value in the array, and currentValue will be equal to the second.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

- Resource 2 from WnC: https://watchandcode.com/courses/77710/lectures/1513011 at 9:50 min

# If initialValue, and array is empty, return initialValue without calling callback.
	[].reduce(function() {
		console.log('No, No, I shouldn\'t be called');
	}, 0);
	// output: 0 // no callback was called only initial value returned


How do we test if array is empty when there is hole?

[,,,,].reduce(function() {
	console.log('No, No, I shouldn\'t be called');
}, 0);
	// output: 0 // same behavior with empty array above with init.Val

- [revisit] How do we check if propertyName exists in obj?
	var testArray = ['a', 'b', 'c'];
	// Does propertyName exists in obj? Does propertyName 0 exist in testArray Obj?
	0 in testArray // true
	1 in testArray // true
	2 in testArray // true
	3 in testArray // false no index (prop names) exists

	var arrayOfHoles = [,,,,];
	0 in arrayOfHoles; // does 0 property name exist in arrayOfHoles?
	// output: false
	4 in arrayOfHoles; // does 0 property name exist in arrayOfHoles?
	// output: false
	// all are false since no property name is assigned; they are holes

- [usecase for key in obj] Skip over holes when taking action.
	var array = [, 1, 2, ];
	for (var i = 0; i < array.length; i++) {
		debugger;
		if (i in array) {
			console.log(i);
		}
	}
	// output: 1, 2

## In conclusion, to test array is empty is to test if there are zero assigned index
- solution: Object.keys(/* array */).length === 0;

	// Object.keys() method returns an array of a given object's own enumerable properties,
	// in the same order as that provided by a for...in loop
	// (the difference being that a for-in loop enumerates properties in the
	// prototype chain as well).
	Object.keys([1, 2, 3])
	// output: ["0", "1", "2"] << only the property key names
	Object.keys([])
	// output: []
	Object.keys([,,])
	// output: []

We can use .length to see if obj key is empty.  Object.keys(/* array */).length === 0;
	// empty array
	Object.keys([]).length === 0;
	// works even with holes!
	Object.keys([,,,]).length === 0;

- To find out array with one element
	Note that you can't check just by [,].length === 1 since there could be holes
	Use earlier method Object.keys() which gives array of its assigned properties
		since holes do not have assigned property names therefore, we can check length
	Object.keys([,,]).length === 1

- To extract single element (Test case: If no initialValue, and array has one element, it should return that element without calling callback.)
	var array = [,1];

	if (Object.keys(array).length === 1) {
		var singleIndex = Object.keys(array)[0];
	}

	singleIndex = "1" // extracted the value of single ('solo') element
	Note: Object.keys(array) // ["1"] just gets the assigned index in array
				Object.keys(array)[0] // "1" gets the value of single element

	- Here is a hack to skip holes but extract the one value in array of one element with holes

	var array = [,1]
	    // If array has one element, return its value w/o callback
    if (Object.keys(array).length === 1) {
      // get the index with assigned value which skips over holes
      // Object.keys() returns array of assigned key names ["0"]
      var singleIndex = Object.keys(array)[0]; // output: 1
      // get the value of that extracted index
      var singleElement = array[singleIndex]; // array[1] = 1
      return singleElement;
    }
	// output: 1

# Test: It should exclude holes. FAILED Error: assertEquals() "NaN" != "6"
since reduce array [, 1, 2, 3] has hole which is undefine.  When adding undefine with number you get " NaN ".
undefine + 1
// output NaN

# How to skip the very first hole when there is no initial value

    // We want to skip holes at the beginning of the array.
    while (/* there are holes at the beginning of the array */) {
      startingIndex++;
    }

		while (/* there are holes at the beginning of the array */) {
      startingIndex++;
    }
- holes at the beginning of the array.
	var array = [, , 1];
	var startingIndex = 0
	while (/* there are holes at the beginning of the array */) {
		startingIndex++;
	}

  array = [, , 1];
	while (startingIndex in array === false) {
		startingIndex++;
	}

# Error handling
// how to handle error with out program puase and break
- try...catch

try {
  [].reduce(function() {});
// pass in error (e) to catch error
} catch (e)	{
  console.log(e);
}

// output: TypeError: Reduce of empty array with no initial value
    at Array.reduce (<anonymous>)
    at <anonymous>:3:6

// we can ignore the error and program can continue running
try {
  [].reduce(function() {});
} catch (e) {
}

// output: TypeError has been ignored

- instanceOf
syntax
object instanceof constructor

parameter: 
object: The object to test
constructor: Function to test against

Look at kind of error that has been thrown using instanceOf

try {
  [].reduce(function() {});
} catch(e) {
  // Is this error actually TypeError?  Is this instanceof TypeError?
  console.log(e instanceof TypeError);
}
// output: true

- List of typeErrors 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

Error types: EvalError, InternalError, RangeError, ReferenceError, SyntaxErro


  - 'If array is empty and no initialValue, throw TypeError.': function() {
    var isTypeError = false;
    try {
      reduce([], function() {}); 
    } catch(e) { // e is object to test
      // Is this error actually TypeError?  Is this instanceof TypeError?
      isTypeError = (e instanceof TypeError);
    }
    eq(isTypeError, true);
  }

READ 1) TypeError (done)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError

READ 2) instanceof (done)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

My favorite example of instanceof
// create a function Object constructor
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car('Honda', 'Accord', 1998);
var a = mycar instanceof Car;    // returns true
var b = mycar instanceof Object; // returns true

READ 3) try...catch (done)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

READ 4) Error (done)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
Note: Error constructor creates an error object.  Instances of Error objects are thrown when runtime


Note:
// what TypeError naitive reduce throws
[].reduce(function() {});
// output error message: "Reduce of empty array with no initial value"

Todos for later day:
- [ ] Go over TDD esp Reduce one more time it is hard one to grabs
- [ ] Play around with my reduce function vs native reduce function