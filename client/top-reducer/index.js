// module.exports = function (state = {note: null} , action) {

var defaultState =  {
    notes: ['C3', 'C3#', 'D3'],
    currentNoteIndex: -1,
    audioState: 'WAITING'
}

// state:   WAITING   ->   IS_STARTING_PLAYING_NOTE    ->   IS_PLAYING_NOTE      ->     IS_STOPPING_PLAYING_NOTE    ->    WAITING
// action:        NEXT_NOTE               PLAYING_NOTE_STARTED    PLAYING_NOTE_TIMED_OUT       PLAYING_NOTE_STOPPED

module.exports = function (state = defaultState, action) {
  switch (action.type) {
    case 'NEXT_NOTE':
        if (state.audioState !== 'WAITING') {
            return state
        }
        if (state.currentNoteIndex >= state.notes.length - 1) {
            return {...state,
                currentNoteIndex: 0,
                audioState: 'IS_STARTING_PLAYING_NOTE'
              }
        }
        return {...state,
            currentNoteIndex: state.currentNoteIndex + 1,
            audioState: 'IS_STARTING_PLAYING_NOTE'
          }
          break
    case 'PLAYING_NOTE_STARTED':
        return {...state,
          audioState: 'IS_PLAYING_NOTE'
        }
        break

    case 'PLAYING_NOTE_TIMED_OUT':
        return {...state,
          audioState: 'IS_STOPPING_PLAYING_NOTE'
        }
        break
    case 'PLAYING_NOTE_STOPPED':
        return {...state,
            audioState: 'WAITING'
          }
          break
    default:
          break

  }
  return state
}
