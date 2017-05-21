/**
 *
 * @module fun-case
 */
;(function () {
  'use strict'

  /* imports */
  var guarded = require('guarded')
  var predicate = require('fun-predicate')
  var curry = require('fun-curry')

  /* exports */
  module.exports = curry(guarded(
    predicate.type('([{p: Function, f: Function}], *)'),
    predicate.t,
    funCase
  ))

  /**
   *
   * @function module:fun-case.funCase
   *
   * @param {Array<Object>} cases - [{ p: predicate, f: function}]
   * @param {*} subject - to apply to case function
   *
   * @return {*} result of applying subject to the appropriate case function
   */
  function funCase (cases, subject) {
    return cases.reduce(function (a, b) {
      return a.p(subject) ? a : b
    }, { p: predicate.f }).f(subject)
  }
})()

