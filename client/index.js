var React = require('react')
var ReactDOM = require('react-dom')
const { createStore } = require('redux')

const conversions = require('conversions')

const topReducer = require('top-reducer')

window.Base64 = require('../Midi.js/inc/shim/Base64.js')
window.Base64Binary = require('../Midi.js/inc/shim/Base64binary.js')
window.MIDI = {}
require('../Midi.js/build/MIDI.js')

const domReady = function (callback) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
}

const click = () => {
  store.dispatch({type: 'NEXT_NOTE'})
//  store.dispatch({type: 'PLAYING_NOTE_STARTED'})
// store.dispatch({type: 'IS_STOPPING_PLAYING_NOTE'})
}

document.body.onkeydown = function (event) {
  console.log('key down')
  if (event.keyCode === 32) {
    event.preventDefault()
    click()
  }
}

const KeyTrainer = React.createClass({
  render: function () {
    var notes = this.props.state.notes.map((note, index) => {
      let style = {}
      if (index === this.props.state.currentNoteIndex) {
        style = {background: 'yellow'}
      }
      return <div style={style} key={index}>
               {note.toString()}
             </div>})
    return (
      <div>
        <div>
          <em>key-trainerr</em>
        </div>
        <div style={{background: 'pink'}}>
          {notes}
        </div>
        <div>
          <button onClick={click}>
            Next
          </button>
        </div>
      </div>
    )
  }
})

const store = createStore(topReducer)

const render = (state) => {
  ReactDOM.render(
    <KeyTrainer state={state} />,
    document.getElementById('app')
  )
}

const playAudio = (state) => {
  let noteIndex
  switch (state.audioState) {
    case 'IS_STARTING_PLAYING_NOTE':
      noteIndex = conversions.noteIdFromNoteName(state.notes[state.currentNoteIndex])
      console.log('Play note ' + state.notes[state.currentNoteIndex])
      MIDI.noteOn(0, noteIndex, 127, 0)
      store.dispatch({type: 'PLAYING_NOTE_STARTED'})
      setTimeout(() => store.dispatch({type: 'PLAYING_NOTE_TIMED_OUT'}), 3000)
      break
    case 'IS_STOPPING_PLAYING_NOTE':
      noteIndex = conversions.noteIdFromNoteName(state.notes[state.currentNoteIndex])
      console.log('Stop Play note ' + state.notes[state.currentNoteIndex])
      MIDI.noteOff(0, noteIndex, 0)
      store.dispatch({type: 'PLAYING_NOTE_STOPPED'})
      break
    default:
      break
  }
}

console.log('window.MIDI ', window.MIDI)

domReady(() => {
  MIDI.loadPlugin({
    soundfontUrl: 'midi/soundfont/',
    instrument: 'acoustic_grand_piano',
    onprogress: function (state, progress) {
      console.log(state, progress)
    },
    onsuccess: function () {
      MIDI.setVolume(0, 127)
      const play = (note, length, delay) => {
        const velocity = 127 // how hard the note hits
        MIDI.noteOn(0, note, velocity, delay)
        MIDI.noteOff(0, note, delay + length)
      }

      // play(48, 0.25, 0)
      //   play(50, 0.25, 2)
      //   play(52, 4, 4)
      //   play(54, 4, 4)

    // callback()
    }
  })

  render(store.getState())
  store.subscribe(() => render(store.getState()))
  store.subscribe(() => playAudio(store.getState()))
})
