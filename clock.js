const timeElem = document.querySelector('[data-time]')
const dateElem = document.querySelector('[data-date]')
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
const darkModeToggle = document.querySelector('#theme-toggle')

const MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY',
    'JUN', 'JUL', 'AUG', 'SEP', 'OCT',
    'NOV', 'DEC'
]
const WEEKDAYS = [
    'SUNDAY,', 'MONDAY,', 'TUESDAY,',
    'WEDENESDAY,', 'THURSDAY,', 'FRIDAY,',
    'SATURDAY,'
]

const LOCAL_STORAGE_THEME_KEY = 'theme.mode'
let preferredThemeOnLastVisit = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)


const getHoursAndMinutes = () => {
    let [hours, minutes] = [new Date().getHours(), new Date().getMinutes()]
    return [hours, minutes]
}
const getCurrentDate = () => {
    const currentMonth = MONTHS[new Date().getMonth()]
    const currentWeekDay = WEEKDAYS[new Date().getDay()]
    const currentDayOfMonth = new Date().getDate()
    return [currentWeekDay, currentMonth, currentDayOfMonth]
}

const displayTime = () => {
    timeElem.innerText = getHoursAndMinutes()
        .map(number => number < 10 ? '0' + number.toString() : number.toString()).join(':')
}
const displayDate = () => {
    dateElem.innerText = getCurrentDate().join(' ')
}
setInterval(() => {
    displayTime()
}, 500);

const setClockHandsRotationDegree = (hand, rotationRatio) => {
    hand.style.setProperty('--rotation', rotationRatio * 360)
}

const getRatioOfClockHand = () => {
    const currentTime = new Date()
    const secondsHandRatio = currentTime.getSeconds() / 60
    const minutesHandRatio = (secondsHandRatio + currentTime.getMinutes()) / 60
    const hoursHandRatio = (minutesHandRatio + currentTime.getHours()) / 12
    return { secondsHandRatio, minutesHandRatio, hoursHandRatio }
}

const runClock = () => {
    const { secondsHandRatio, minutesHandRatio, hoursHandRatio } = getRatioOfClockHand()
    setClockHandsRotationDegree(secondHand, secondsHandRatio)
    setClockHandsRotationDegree(minuteHand, minutesHandRatio)
    setClockHandsRotationDegree(hourHand, hoursHandRatio)
}
runClock()
setInterval(runClock, 1000)

const enableDarkMode = () => {
    document.body.classList.add('dark-mode')
    darkModeToggle.checked = true
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'dark')
}
const disableDarkMode = () => {
    document.body.classList.remove('dark-mode')
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, null)
}

const checkForDarkThemeOnLastVisit = () => {
    if (preferredThemeOnLastVisit === 'dark') enableDarkMode()
}

darkModeToggle.addEventListener('change', () => {
    preferredThemeOnLastVisit = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
    preferredThemeOnLastVisit === 'dark' ? disableDarkMode() : enableDarkMode()
})

window.onload = () => {
    displayTime()
    displayDate()
    checkForDarkThemeOnLastVisit()
}
