const readFile = require('./inputReader')

const input = readFile('./resources/day23')

const moveCups = (idx, cups, minLabel, maxLabel) => {
    const currentCup = cups[idx]
    const pickedUpCups = cups.splice(idx + 1, 3)
    if (pickedUpCups.length < 3) {
        idx -= 3 - pickedUpCups.length
        pickedUpCups.push(...cups.splice(0, 3 - pickedUpCups.length))
    }
    let destination = currentCup - 1
    while (!cups.includes(destination)) {
        destination = destination - 1
        if (destination < minLabel) {
            destination = maxLabel
        }
    }
    const destinationIdx = cups.findIndex(item => item === destination)
    cups.splice(destinationIdx + 1, 0, ...pickedUpCups)
    if (destinationIdx < idx) {
        idx += 3
    }
    idx++
    // idx = cups.findIndex(item => item === currentCup) + 1
    if (idx >= cups.length) {
        idx = 0
    }
    return idx
}

const printResult = (cups) => {
    const idx1 = cups.findIndex(item => item === 1)
    console.log(cups.slice(idx1 + 1).join('') + cups.slice(0, idx1).join(''))
}

const printResult2 = (cups) => {
    const idx1 = cups.findIndex(item => item === 1)
    if (idx1 < cups.length - 2) {
        console.log(cups[idx1 + 1] * cups[idx1 + 2])
    } else if (idx1 === cups.length - 2) {
        console.log(cups[idx1 + 1] * cups[0])
    } else {
        console.log(cups[0] * cups[1])
    }
}

const task1 = () => {
    let cups = input[0].split('').map(item => parseInt(item))
    const minLabel = Math.min(...cups)
    const maxLabel = Math.max(...cups)
    let currentIdx = 0
    let leftMoves = 100
    while (leftMoves) {
        currentIdx = moveCups(currentIdx, cups, minLabel, maxLabel)
        leftMoves--
    }
    printResult(cups)
}

const task2 = () => {
    let cups = input[0].split('').map(item => parseInt(item))
    const minLabel = Math.min(...cups)
    let maxLabel = Math.max(...cups)
    while (maxLabel < 1000000) {
        cups.push(++maxLabel)
    }
    let currentIdx = 0
    let leftMoves = 10000000
    while (leftMoves) {
        currentIdx = moveCups(currentIdx, cups, minLabel, maxLabel)
        leftMoves--
    }
    printResult2(cups)
}

// task1()
task2()