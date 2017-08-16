/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {

// note bottom of TinyTest tests function is eq to TinyTest.run.bind(TinyTest);
//  anytime we run tests() >> in turn runs TinyTest.run(tests) with tests obj
//  structure of tests obj parameter  is "test description": function() {}
//  all our test casese are argument obj that we pass inside of tests
    run: function(tests) {
        // failures changes background color 
        var failures = 0;
        // running all the tests
        // for..in iterate over all the methods in tests obj
        for (var testName in tests) {
            // testsObj[testPropertyName] refers to its method tests is obj
            // testName is property inside of tests obj
            var testAction = tests[testName];
            try {
                // if no error test passes
                testAction.apply(this); // new concept: apply
                console.log('Test:', testName, 'OK');
            } catch (e) {
                // if detected error from try section
                failures++;
                console.error('Test:', testName, 'FAILED', e);
                console.error(e.stack); // new concept: e.stack
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
            }
        }, 0);
    },

    // at the beginning TDD simply fail test; throws error, optionally add message if needed
    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    // assert if evaluates to true
    assert: function(value, msg) {
        // if value not eq to msg, false: value !== msg > throw an error
        // !false > true throw error and opt add msg
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

// same as eq()
    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

// strictEq 
    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

// variable easily access methods in TinyTest
//  each variable (var fail) is set to (bound) specific method (TinyTest.fail) on Tinytest obj
//  binding 'this' context to TinyTest that way in case we want to access to following methods from Tinytest
//  inside of these functions refer to 'this' then it is refering to TinyTest obj
// these variable returns each functions; does not run the function
// only time it runs when we fail() run it ourselves
var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest); // var test is set to TinyTest.run method
