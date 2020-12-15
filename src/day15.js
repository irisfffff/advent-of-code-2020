const readFile = require('./inputReader')

const input = readFile('./resources/day15')[0].split(',').map(item => parseInt(item))

const memoryGame = (turnLimit) => {
    const spoken = new Map() // spoken number: turnOld
    input.forEach((number, idx) => spoken.set(number, idx + 1))
    let prev = input[input.length - 1]
    spoken.delete(prev)
    let newSpoken
    for (let turn = input.length + 1; turn <= turnLimit; turn ++) {
        if (spoken.has(prev)) {
            newSpoken = turn - 1 - spoken.get(prev)
        } else {
            newSpoken = 0
        }
        spoken.set(prev, turn - 1)
        prev = newSpoken
    }
    return newSpoken
}

const task1 = () => {
    console.log(memoryGame(2020))
}

const task2 = () => {
    console.log(memoryGame(30000000))
}

task1()
task2()
