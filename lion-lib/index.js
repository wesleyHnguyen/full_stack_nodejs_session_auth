module.exports.add = function(a, b) { return a + b; };

// create an account on npmjs -- 
// npm adduser  - remember to verify the email
// or : npm login
// then: npm publish -- this will push the package to npmjs registry

// how to pull the published package
// install it as normal: npm i my_own_published_package

// ----------------------------------------------------------------------------
// How to update a published package 

module.exports.multiply = function(a, b) { return a * b; };
// updating the version manually
// or use npm to update the version:   npm version major | minor | patch
// then run: npm publish -- again