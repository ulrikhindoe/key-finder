const _ = require('lodash')

const parts = (name) => {
  let r = null
  let m
  if (m = /^([A-G])(-?\d+)([#b]*)$/.exec(name)) {
    r = {}
    r.name = m[1]
    r.octave = m[2]
    r.accidentals = m[3]
  }
  return r
}

const modification = (accidentals) => {
  const cs = accidentals.split('')
  return _.filter(cs, x => x == '#').length - _.filter(cs, x => x == 'b').length
}

const nodeId = (parts) => {
  const m = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
  const base = parts.octave * 12 + 24
  return base + m[parts.name] + modification(parts.accidentals)
}

module.exports = {
  noteIdFromNoteName: (name) => {
    return nodeId(parts(name))
  // const p = parts(name)
  }
}
