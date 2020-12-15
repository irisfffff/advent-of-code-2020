const readFile = require('./inputReader')

const input = readFile('./resources/day13')

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcm = (a, b) => a * b / gcd(Math.max(a, b), Math.min(a, b))

const findTimestamp1 = (a, b, diff) => {
    let i = 1
    while (true) {
        const timestamp = i * a
        if ((timestamp + diff) % b === 0) {
            return timestamp
        }
        i++
    }
}

const findTimestamp2 = (a, b, lcmA, lcmB) => {
    let i = 1
    while (true) {
        const timestamp = i * lcmA + a
        if ((timestamp - b) % lcmB === 0) {
            return timestamp
        }
        i++
    }
}

// Compute timestamps for bus0 to satisfy multiple busses
const processTimestamps = (timestamps, lcms) => {
    const newTimestamps = []
    const newLcms = []
    for (let i = 0; i < timestamps.length - 1; i += 2) {
        newTimestamps.push(findTimestamp2(timestamps[i], timestamps[i+1], lcms[i], lcms[i+1]))
        newLcms.push(lcm(lcms[i], lcms[i+1]))
    }
    if (timestamps.length % 2 === 1) {
        newTimestamps.push(timestamps[timestamps.length - 1])
        newLcms.push(lcms[lcms.length - 1])
    }
    if (newTimestamps.length === 1) {
        return newTimestamps[0]
    }
    return processTimestamps(newTimestamps, newLcms)
}

const task1 = () => {
    const earliestTimestamp = parseInt(input[0])
    const busses = input[1].split(',').map((item) => item === 'x' ? -1 : parseInt(item))
    const departTimes = busses.map((id) => id === -1 ? Infinity :
        Math.ceil(earliestTimestamp / id) * id
    )
    const busId = busses[departTimes.findIndex(item => item === Math.min(...departTimes))]
    console.log((Math.min(...departTimes) - earliestTimestamp) * busId)
}

const task2 = () => {
    const busses = input[1].split(',').map((item, idx) => item === 'x' ? [-1, idx] : [parseInt(item), idx]).filter((bus) => bus[0] !== -1)
    // Compute timestamps for bus0 in order to satisfy later busses
    const timestamps = []
    // Lowest common multipliers to have bus0 and other busses depart at the same time
    const lcms = []
    for (let i = 1; i < busses.length; i++) {
        timestamps.push(findTimestamp1(busses[0][0], busses[i][0], busses[i][1]))
        lcms.push(lcm(busses[0][0], busses[i][0]))
    }
    console.log(processTimestamps(timestamps, lcms))
}

task1()
task2()