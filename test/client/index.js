var topReducer = require('top-reducer.js')
var expect = require('chai').expect

describe('top-reducer', () => {
  it('should handle NEXT_NODE event', () => {
    const initialState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: -1,
      audioState: 'WAITING'
    }
    const actualState = topReducer(initialState, {type: 'NEXT_NOTE'})
    const expectedState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: 0,
      audioState: 'START_PLAYING_NOTE'
    }
    expect(actualState).to.deep.equal(expectedState)
  })

  it('should not react to NEXT_NODE event if audioState is START_PLAYING_NOTE', () => {
    const initialState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: -1,
      audioState: 'START_PLAYING_NOTE'
    }
    const actualState = topReducer(initialState, {type: 'NEXT_NOTE'})
    const expectedState = {...initialState}
    expect(actualState).to.deep.equal(expectedState)
  })

  it('should not react to NEXT_NODE event if audioState is IS_PLAYING_NOTE', () => {
    const initialState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: -1,
      audioState: 'START_PLAYING_NOTE'
    }
    const actualState = topReducer(initialState, {type: 'NEXT_NOTE'})
    const expectedState = {...initialState}
    expect(actualState).to.deep.equal(expectedState)
  })

  it('should go to first node on the NEXT_NODE event if already at last note', () => {
    const initialState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: 2,
      audioState: 'WAITING'
    }
    const actualState = topReducer(initialState, {type: 'NEXT_NOTE'})
    const expectedState = {...initialState, currentNoteIndex: 0, audioState: 'START_PLAYING_NOTE'}
    expect(actualState).to.deep.equal(expectedState)
  })


  it('should handle PLAYING_STARTED event', () => {
    const initialState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: 0,
      audioState: 'START_PLAYING_NOTE'
    }
    const actualState = topReducer(initialState, {type: 'PLAYING_NOTE_STARTED'})
    const expectedState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: 0,
      audioState: 'IS_PLAYING_NOTE'
    }
    expect(actualState).to.deep.equal(expectedState)
  })

  it('should handle STOP_PLAYING_NOTE event', () => {
    const initialState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: 0,
      audioState: 'IS_PLAYING_NOTE'
    }
    const actualState = topReducer(initialState, {type: 'STOP_PLAYING_NOTE'})
    const expectedState = {
      notes: ['C', 'D', 'E'],
      currentNoteIndex: 0,
      audioState: 'WAITING'
    }
    expect(actualState).to.deep.equal(expectedState)
  })
})
