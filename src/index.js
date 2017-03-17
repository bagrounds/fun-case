/**
 *
 * @module fun-case
 */
;(function () {
  'use strict'

  /* imports */
  var guarded = require('guarded')
  var compose = require('fun-compose')
  var funAssert = require('fun-assert')
  var funPredicate = require('fun-predicate')

  var isFunction = funAssert.type('Function')

  /* exports */
  module.exports = guarded({
    inputs: [funAssert.type('[{p: Function, f: Function}]')],
    f: funCase,
    output: isFunction
  })

  /**
   *
   * @function module:fun-case.funCase
   *
   * @param {Array} options arguments
   *
   * @return {Function} case function
   */
  function funCase (options) {
    return function (subject) {
      var result = options.reduce(function (a, b) {
        return a.p(subject) ? a : b
      }, { p: funPredicate.no() })

      return compose(result.f, funAssert.fromPredicate(result.p))(subject)
    }
  }
})()

