;(function () {
  'use strict'

  /* imports */
  var arrange = require('fun-arrange')
  var predicate = require('fun-predicate')
  var funTest = require('fun-test')
  var fn = require('fun-function')
  var object = require('fun-object')

  var guardTests = [
    predicate.throwsWith([3, 3]),
    predicate.throwsWith([{}, 3]),
    predicate.throwsWith([[{}], 3]),
    predicate.throwsWith([[{ p: predicate.t }], 3]),
    predicate.throwsWith([[{ f: fn.k(1) }], 3]),
    predicate.not(predicate.throwsWith)([[{ p: predicate.t, f: fn.k(1) }], 3])
  ].map(object.of('predicate'))
    .map(object.merge({ inputs: [], contra: fn.k }))

  var testInput = [
    {
      p: predicate.type('String'),
      f: fn.k('S')
    },
    {
      p: predicate.type('Boolean'),
      f: fn.k('B')
    },
    {
      p: predicate.type('Number'),
      f: fn.k('N')
    }
  ]

  var functionalityTests = [
    [[testInput.slice(0, 1), 'string'], predicate.equal('S')],
    [[testInput, 'string'], predicate.equal('S')],
    [[testInput, true], predicate.equal('B')],
    [[testInput, 4], predicate.equal('N')]
  ].map(arrange({ inputs: 0, predicate: 1 }))

  /* exports */
  module.exports = functionalityTests.concat(guardTests).map(funTest.sync)
})()

