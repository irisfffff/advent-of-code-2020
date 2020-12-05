const readFile = require('./inputReader')

const input = readFile('./resources/day5')

const scanSeat = (seat) => {
    const row = parseInt([...seat.slice(0, 7)].map(x => x === 'F' ? 0 : 1).join(''), 2)
    const column = parseInt([...seat].slice(7).map(x => x === 'L' ? 0 : 1).join(''), 2)
    return row * 8 + column
}


const task1 = () => {
    const seatIds = input.map(seat => scanSeat(seat))
    console.log(Math.max(...seatIds))
    return seatIds
}

const task2 = () => {
    const seatIds = task1()
    seatIds.sort((a, b) => a - b)
    const missingSeat = seatIds.find((id, index) => seatIds[index + 1] === id + 2) + 1
    console.log(missingSeat)
}

task2()