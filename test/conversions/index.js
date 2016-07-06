var conversions = require('conversions')
var expect = require('chai').expect

describe('conversions', () => {
  it('should convert node name to node id', () => {
    expect(conversions.noteIdFromNoteName('C3')).to.equal(60)
    expect(conversions.noteIdFromNoteName('C3#')).to.equal(61)
    expect(conversions.noteIdFromNoteName('C3##')).to.equal(62)
    expect(conversions.noteIdFromNoteName('C3b')).to.equal(59)
    expect(conversions.noteIdFromNoteName('C3bb')).to.equal(58)
    expect(conversions.noteIdFromNoteName('C3#b#')).to.equal(61)
    expect(conversions.noteIdFromNoteName('D3')).to.equal(62)
    expect(conversions.noteIdFromNoteName('C2')).to.equal(48)
    expect(conversions.noteIdFromNoteName('C1')).to.equal(36)
    expect(conversions.noteIdFromNoteName('C0')).to.equal(24)
    expect(conversions.noteIdFromNoteName('C-1')).to.equal(12)
    expect(conversions.noteIdFromNoteName('D3')).to.equal(62)
    expect(conversions.noteIdFromNoteName('E3')).to.equal(64)
    expect(conversions.noteIdFromNoteName('F3')).to.equal(65)
    expect(conversions.noteIdFromNoteName('G3')).to.equal(67)
    expect(conversions.noteIdFromNoteName('A3')).to.equal(69)
    expect(conversions.noteIdFromNoteName('B3')).to.equal(71)
  })
})
