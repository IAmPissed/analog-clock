// DOM Elements
const timeElem = document.querySelector('[data-time]')
const dateElem = document.querySelector('[data-date]')
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
const darkModeToggle = document.querySelector('#theme-toggle')

// User prefered theme
let themeMode = localStorage.getItem('darkMode')

// Setting Date and Time
const setTime = () => {
    let time = [new Date().getHours(), new Date().getMinutes()]
    return time
}
const setDate = () => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let month = months[new Date().getMonth()]

    const weekDays = ['SUNDAY,', 'MONDAY,', 'TUESDAY,', 'WEDENESDAY,', 'THURSDAY,', 'FRIDAY,', 'SATURDAY,']
    let weekDay = weekDays[new Date().getDay()]

    let dayOfMonth = new Date().getDate()
    return [weekDay, month, dayOfMonth]
}

// Displaying Time
setInterval(() => {
    timeElem.innerText = setTime().map(number => number < 10 ? '0' + number.toString() : number.toString()).join(':')
}, 500);

// Displaying Time and Date when the page loads
window.onload = () => {
    timeElem.innerText = setTime()
        .map(number => number < 10 ? '0' + number.toString() : number.toString())
        .join(':')
    dateElem.innerText = setDate().join(' ')
}

// Adjust hands position in the clock
const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

// Running the clock
const runClock = () => {
    let currentTime = new Date()
    let secondsRatio = currentTime.getSeconds() / 60
    let minutesRatio = (secondsRatio + currentTime.getMinutes()) / 60
    let hoursRatio = (minutesRatio + currentTime.getHours()) / 12

    // Correct Hands' position/degree
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}
runClock()
setInterval(runClock, 1000)

// Enable Dark Theme/Mode
const enableDarkMode = () => {
    // Add dark mode to DOM
    document.body.classList.add('dark-mode')
    // Add theme to localStorage
    localStorage.setItem('darkMode', 'enabled')
}
// Disable Dark Theme/Mode
const disableDarkMode = () => {
    // Remove dark mode
    document.body.classList.remove('dark-mode')
    // Update theme in localStorage
    localStorage.setItem('darkMode', null)
}

// Check for previous selected theme
if (themeMode === 'enabled') {
    enableDarkMode()
}

// Adjust theme
darkModeToggle.addEventListener('change', () => {
    themeMode = localStorage.getItem('darkMode')
    if (themeMode === 'enabled') {
        disableDarkMode()
    } else {
        enableDarkMode()
    }
})