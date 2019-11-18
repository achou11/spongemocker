const header = document.querySelector('h1')
const mockHeaderButton = document.getElementById('mock-header-button')
const form = document.querySelector('form')
const input = document.getElementById('user-input')
const output = document.getElementById('output')

const SITE_NAME = 'Spongemocker'
const STOP_MOCKING_HEADER_TEXT = 'Please stop mocking the header'
const START_MOCKING_HEADER_TEXT = 'Please mock the header'

const regex = /^[a-z]+$/i

const state = {
  isMockingTitle: false,
  intervalId: null
}

function createMockText (text) {
  if (text.length === 0) return ''

  const result = text
    .split('')
    .map(character => {
      if (regex.test(character)) {
        const boundary = Math.random()
        const determinant = Math.random()

        if (boundary < determinant) {
          return character.toLowerCase()
        }
        return character.toUpperCase()
      }

      return character
    })
    .join('')

  return result
}

function startMockingHeader (state) {
  state.intervalId = setInterval(function () {
    header.textContent = createMockText(header.textContent)
  }, 1000)

  mockHeaderButton.textContent = STOP_MOCKING_HEADER_TEXT
}

function stopMockingHeader (state) {
  clearInterval(state.intervalId)
  header.textContent = SITE_NAME
  mockHeaderButton.textContent = START_MOCKING_HEADER_TEXT
}

function handleStartStopMockingHeader (state) {
  if (state.isMockingTitle) {
    stopMockingHeader(state)
  } else {
    startMockingHeader(state)
  }
  state.isMockingTitle = !state.isMockingTitle
}

function handleTextSubmit (event) {
  event.preventDefault()
  output.textContent = createMockText(input.value)
}

function createSourceLink () {
  const sourceUrl = document.getElementById('source-url')
  const isDat = window.DatArchive && window.location.origin.startsWith('dat:')
  const url = isDat
    ? `beaker://library/${window.location}`
    : 'https://github.com/achou11/spongemocker'

  sourceUrl.href = url
}

document.addEventListener('DOMContentLoaded', createSourceLink)
mockHeaderButton.addEventListener('click', () =>
  handleStartStopMockingHeader(state)
)
form.addEventListener('submit', handleTextSubmit)
