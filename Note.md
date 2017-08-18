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

# SimpleTest 1: Error handling, setTimeout

- Manual way to print values individually
var student = {
	name: "Heggy",
	hiChew: true,
	pencil: true
};

console.log(student.name);
console.log(student.hiChew);
console.log(student.pencil);

- what if we don't know the keys that an object has. In that case, looping is a much better idea. 
- for...in loop to iterate through an object (ex: student)
var student = {
	name: "Heggy",
	hiChew: true,
	pencil: true
};

// singleKey is variable here so name it whatever you like
for(var singleKey in student){
	console.log(student[singleKey]);
}

// output: "Heggy" true true

- Bonus: if..in: Determine if a key exists in an object 
ref: https://www.rithmschool.com/courses/javascript/javascript-objects-iteration
var obj = {
	chicken: 55,
	waterMellon: 'red'
}

// does chicken prop (key) exist in obj?
if ("chicken" in obj){
	console.log("chicken for dinner!");
}
// output: "chicken for dinner!"

if ("hiChew" in obj){
	console.log("hiChew for dessert!");
}
// output: nothing since there is no key name "hiChew"

- test what you learn:
Note: solution video: https://www.rithmschool.com/courses/javascript/javascript-objects-exercises
1) Given the following object below, write code to print the value then the key to the console separated by '=>':

var namesAndHobbies = {
    elie: "JavaScript",
    matt: "jogging",
    janey: "table building",
    tim: "sailing"
}

// Output should be:
// JavaScript => elie
// jogging => matt
// table building => janey
// sailing => tim

for(var key in namesAndHobbies) {
	console.log( key + " => " + namesAndHobbies[key]);
}


2) Add a key for your name, and a value for your favorite hobby to the namesAndHobbies object.

name


3) Write an if statement that console.logs your name and hobby to the console if the key of your name is contained in the object.

# under tinytest.js, new concept: 1) apply

var tests = {testName: function(){}, testName2: function(){}, testName2: function(){}}
var testAction = tests[testName];
// apply would bind this keyword and run it for you
testAction.apply(this);

Note: var fail = TinyTest.fail.bind(TinyTest), you would only bind this keyword and you have to run it when you are ready by 

- [ ] Challenge for Heggy do TDD for .apply() 

# stack
stack trace: series of function calls that led to the error you got

# window load priority:
- What's your window doing first in the background when the page is loading (listed in order of importance)? 
  1. JavaScript (priority 1)
  2. Update the DOM (if it is first time, create DOM)
      ex) window.document, document.body if any changes to DOM it will auto update DOM
  3. Extra tasks (e.g. callbacks passed into setTimeout) therefore, we are using setTimeout to ensure delay action

	Therefore, tinytest.js has this line of code.
	// Give document a chance to complete
	setTimeout(function() {
		if (window.document && document.body) {
			document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
		}
	}, 0);

	Try this in console to fully witness that DOM not being ready inside your js file.

		if (window.document && document.body) {
		document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
	} else {
		console.log('DOM is not ready yet!');
	}

Note: try this in DOM for fun.  
document.body.style.backgroundColor = '#ff9999';
document.body.style.backgroundColor = '#99ff99'; 

- Part of TinyTest.js part 1. Required videos to watch. 

## more resources: window rendering scope complex things
1) https://www.youtube.com/watch?v=8aGhZQkoFbQ
Philip Roberts: What the heck is the event loop anyway? | JSConf EU 2014
min 15:30 sec

Note: pay attend to Phil's talk at 22:52, render que is DOM set up, Callback Queue is ex: setTimeout(callback)

- main topics of Phil's talk: Demystifies event-loop”, “non-blocking”, “callback”, “asynchronous”, “single-threaded” and “concurrency”.

https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html

- Phil's loupe app link
http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

Note:
Does v8 have call stack, event loop, callback queue, apis?
V8 has call stack and heap.

## topic: demystify runtime, callback
- V8: JavaScript run time inside Chrome (https://github.com/v8/v8/wiki)
- heap: where memory allocation happen
- callstack: where stackframes lives

V8 codebase clone such as DOM, setTimeout, XML, httprequest and realize there is no setTime in code base.

JavaScript is single thread programming language.
- Call stack: data structure which records where in the program we are.
stack - put on top and pop off top when you reach return statment or implicitly when you arrived at end of the function.

// http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSxiKSB7CiAgcmV0dXJuIGEgKiBiOwp9CgpmdW5jdGlvbiBzcXVhcmUobikgewogIHJldHVybiBtdWx0aXBseShuLCBuKTsKfQoKZnVuY3Rpb24gcHJpbnRTcXVhcmUobikgewogIHZhciBzcXVhcmVkID0gc3F1YXJlKG4pOwogIGNvbnNvbGUubG9nKHNxdWFyZWQpOwp9CgpwcmludFNxdWFyZSg0KTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// watch walk thru his latentflip.com @ 5 min on Phil's video
https://www.youtube.com/watch?v=8aGhZQkoFbQ

function multiply(a,b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  var squared = square(n);
  console.log(squared);
}

printSquare(4);

// next example for callstack when error is thrown.

function foo () {
  throw new Error('Oops!');
}

function bar() {
  foo();
}

function baz() {
  bar();
}

baz();

// error shows stack trace in the console.
194fb93f-0d91-4dac-9c11-5484d166af12:236 Uncaught Error: Oops!
foo @ 194fb93f-0d91-4dac-9c11-5484d166af12:236
bar @ 194fb93f-0d91-4dac-9c11-5484d166af12:240  
baz @ 194fb93f-0d91-4dac-9c11-5484d166af12:245  // second function call that ran
(anonymous) @ 194fb93f-0d91-4dac-9c11-5484d166af12:249 // this is main function

// *** next example infinite function (recursive function)
function foo () {
  return foo();
}
foo();

/// recursive with no end; your browser kills recursive after awhile
// error message: "RangeError: Maximum call stack size exceeded"


Look at philEx.js for more examples.

# Blocking (slow code):
- console.log not slow
- while loop 1 to 10 bill may be slow
- network request, image processing slow

Things that are slow and codes that are on the stack > Blocking

// Network request good ex of blocker.  slower than computers and it takes to while to run through each line of code.
// jquery is like ajax request

var foo = $.getSync('//foo.com'); // processing network request on top of stack1
var bar = $.getSync('//bar.com'); // once foo network request processed (popOff) bar is up next
// note: some network request may not ever finish
var qux = $.getSync('//qux.com');

// finally, network requesting blocking behaviours complete and next lines of code is in stack
// now we can clear the stack
console.log(foo);  // console.log is fast
console.log(bar);
console.log(qux);

Lesson: since JavaScript is single threaded there it needs to wait for the network request to finish. there is no other way to handle blockers before faster things

Why is blocking a problem?  b/c we are running code in browsers.  
Once stack is blocked browsers can't render anything in synchronous call.  

- How do we handle blocking?  asynchronous callbacks
Asynchronous helps make blocking go away in browsers.  ex) callback
console.log('Hi');

// setTimeout callback 
// setTimeout(callback);  callback function goes into Webapis waits for the timer to hit 5 sec.  (note: callback is not blocking stack)
// once the webapis done it push its api into

setTimeout(function () {
  console.log('There');
}, 5000);

console.log('JSConfEU');

- How does browser remember to go back and process setTimeout()?
Concurrency & the Event Loop
	Reason JavaScript can do more than one thing at a time (concurrently) in runtime, the browser is more than just runtime.  ex) WebAPIs are threads where DOM, AJAX request, CALLbacks which concurrency can kicks in.  

- WebAPIs: threads with priorities DOM, ajax, callbacks go here

- event loop: job is to watch the stack and task queue if stack is empty then push items from task queue to stack.

When wrapping a function inside of setTimeout() is when we want to deferring your function until stack is cleared which then event loop will push you inside stack from task queue.

- ajax request

console.log('Hi');

// ajax request does not live JSruntime but lives on webapis
// calls XHR() / callback
$.get('url', function cb(data) {
	console.log(data);
}); 

console.log('JSConfEu');

This is demo of how your code can continue to run while callback gets its job done in webapis then task queue then event loop push callback into (only if stack is empty) stack.
This does not block the runtime stack.

** another example:

console.log('Started');

// .on() is web Apis and when clicked it get on the callback Queue
$.on('button', 'click', function onClick () {
	console.log('Clicked');
}); 

setTimeout(function onTimeout () {
	console.log('Timeout Finished');
}, 5000);

console.log('Done');

** another example:
// setTimeout 4 times with 1 sec delays
//  timeout callbacks get queued therefore setTimeout 1 sec delay 
//  doesn't get run really long while until call stack is all cleared
setTimeout(function timeout() {
	console.log('hi');
}, 1000);

setTimeout(function timeout() {
	console.log('hi');
}, 1000);

setTimeout(function timeout() {
	console.log('hi');
}, 1000);

setTimeout(function timeout() {
	console.log('hi');
}, 1000);

Lesson: idea about async apis and its behaivor of setTimeout()
setTimeout(callback(), 1sec) is not guranteed time to execution but minimum time to execution.

Just the same with setTimeout(callback(), 0sec); doesn't run immediately but just wait until call stack first get cleared which is nextish..

*** another example ***
// Synchronous for forEach running in current stack
[1,2,3,4].forEach(function (i) {
	console.log(i);
});

// Asynchronous
function asyncForEach(array, cb) {
	array.forEach(function () {
		setTimeout(cb, 0);
	});
}

asyncForEach([1,2,3,4], function (i) {
	console.log(i);
})

// make each element print out Asynchronously
function asyncForEach(array, cb) {
  array.forEach(function (k) {
		// bind this callback and pass in argument k 
    setTimeout(cb.bind(this, k), 0);
  });
}

debugger;
asyncForEach([1,2,3,4], function (i) {
  console.log("hi-"+ i);
})

*** delay function cb example ***
// Synchronous for forEach running in current stack
[1,2,3,4].forEach(function (i) {
	console.log('processing sync');
	delay();
});

// make each element print out Asynchronously
function asyncForEach(array, cb) {
	array.forEach(function () {
		setTimeout(cb, 0);
	});
}

asyncForEach([1,2,3,4], function (i) {
	console.log("processing async", i);
})

- browser renders 16 frames a sec.  render is like callback which it runs when call stack is empty. when render is block, you can't select things on the screen, see the next response..
synchronous will block the rendering
but asynchronous will not.


*** scroll handler example ***
function animateSomething() {
	delay();
}

$.on('document', 'scroll', animateSomething);

// when scroll animateSomething will queue up on event handler which may get cause issue.
// one way to resolve queuing up issue is let's wait until user stops scrolling or let's process this every 3 min.+

2) https://www.youtube.com/watch?v=QyUFheng6J0&t=1189s
Arindam Paul - JavaScript VM internals, EventLoop, Async and ScopeChains
Topic covered: scopes and closures

*** recommended course: ***
- Structure and Interpretation of Computer Programshttps://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/syllabus/

- topic to cover:
* JavaScript Interpretation and Memory Model
* Compilation and Variable Hoisting
* Function Execution
* Scope Chains and Closure
* JavaScript Runtime and Event loop
* Async Examples
* Single Threaded parallel execution


** example code
var a = 2;
b = 1;

function f(z) {
	b = 3;
	c = 4;
	var d = 6;
	e = 1;

	function g() {
		var e = 0;
		d = 3 * d;
		return d;
	}

	return g();
	var e;
}

f(1); // 18 due to d = 3 * d where d is 6

function makeAdder(n) {
	var inc = n;
	var sum = 0;
	return function add() {
		sum = sum + inc;
		return sum;
	};
}

var adder3 = makeAdder(3);
adder3(); // 3 and it keeps increasing by 3

*** sync example 1 by Arindam ***
// Asynchronous
setTimeout(function timeout() {
    console.log('hi');
}, 2000);

*** sync example 2 by Arindam ***
// suppose we have a slow function s.a. process()
function process(num) {
    // function to delay
    delay();
    console.log(num);
}

// Synchronus
[1,2,3,4,5,6].forEach(function(i){
    process(i);
});

*** async example 2 by Arindam ***
function process(num) {
    // function to delay
    delay();
    console.log(num);
}

// ASynchronus
[1,2,3,4,5,6].forEach(function(i){
	// no need to set i here since it is out of reference it will
	//  be available through closure 
    setTimeout(function() {
      process(i);        
    });
});

# tinyTest video 2

- Ternary operator
convert if/else statement 
// document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999'); 

var failures = 0;
var color = (if(failures === 0) then 'green' else 'red');

// document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999'); 
// terniary operator break down
var failures = 0;
var color = (failures === 0 ? 'green' : 'red');
console.log(color);  // output: 'green'



- object constructor
use new keyword when creating brand new object using object constructor
// constructor function: main function is to create obj easily.
// ex: tinytest.js code: new Error('fail(): ' + msg);

// define constructor function
// by convention capitalize constructor function name
//  which is reminder to use new keyword to create obj
function Person(name) {
  // name - Gordon
  // species - Human

  // this = {} empty object
  this.name = name;
  this.species = 'human';
  // at the end return this;
}

new Person('Gordon');

// what is happening when you don't use new keyword?
function Person (name) {
	this.name = name;
	this.species = 'human';
}

debugger;
Person('Gordon');

// Person object this is assigned to default value window.
// species and names are assigned to global window obj
// Under Local, return value: undefined which you see as a output