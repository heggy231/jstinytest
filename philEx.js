// http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSxiKSB7CiAgcmV0dXJuIGEgKiBiOwp9CgpmdW5jdGlvbiBzcXVhcmUobikgewogIHJldHVybiBtdWx0aXBseShuLCBuKTsKfQoKZnVuY3Rpb24gcHJpbnRTcXVhcmUobikgewogIHZhciBzcXVhcmVkID0gc3F1YXJlKG4pOwogIGNvbnNvbGUubG9nKHNxdWFyZWQpOwp9CgpwcmludFNxdWFyZSg0KTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// watch walk thru on 5 min on https://www.youtube.com/watch?v=8aGhZQkoFbQ



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

// next example for callstack
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

// error shows the stack trace in console.
194fb93f-0d91-4dac-9c11-5484d166af12:236 Uncaught Error: Oops!
foo @ 194fb93f-0d91-4dac-9c11-5484d166af12:236
bar @ 194fb93f-0d91-4dac-9c11-5484d166af12:240
baz @ 194fb93f-0d91-4dac-9c11-5484d166af12:245
(anonymous) @ 194fb93f-0d91-4dac-9c11-5484d166af12:249 // this is main function

// *** next example infinite function
function foo () {
  return foo();
}
foo();

/// recursive with no end; your browser kills for you and you can find your bug
// error message: "RangeError: Maximum call stack size exceeded"

// Network request is slower than computers and it takes to while to run through each line of code.
var foo = $.getSync('//foo.com');
var bar = $.getSync('//bar.com');
// some network request may not ever finish
var qux = $.getSync('//qux.com');

// finally, blocking behaviours complete and now we can clear the stack
console.log(foo);
console.log(bar);
console.log(qux);



//****next example */
console.log('Hi');

// setTimeout callback 
setTimeout(function () {
  console.log('There');
}, 5000);

console.log('JSConfEU');

