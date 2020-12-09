const readFile = require('./inputReader')

const input = readFile('./resources/day9').map(item => parseInt(item))

const XMAS = (preamble) => {
    const validNumbers = []
    let preambleNumbers = input.slice(0, preamble)
    preambleNumbers.forEach(item => {
        validNumbers.push(...preambleNumbers.map(value => value !== item ? value + item : undefined))
    })
    for (let i = preamble; i < input.length; i++) {
        if (!validNumbers.includes(input[i])) {
            return input[i]
        }
        validNumbers.splice(0, preamble)
        preambleNumbers = input.slice(i-preamble + 1, i + 1)
        validNumbers.push(...preambleNumbers.map(item => item !== input[i] ? item + input[i] : undefined))
    }
}

const findWeakness = (invalidNumber) => {
    for (let i = 0; i < input.length; i++) {
        let sum = input[i] + input[i + 1]
        let j = i + 2
        while (sum < invalidNumber) {
            sum += input[j]
            j++
        }
        if (sum === invalidNumber) {
            const range = input.slice(i, j)
            range.sort((a, b) => a - b)
            return range[0] + range[range.length - 1]
        }
    }
}

const task1 = () => {
    console.log(XMAS(25))
}

const task2 = () => {
    console.log(findWeakness(XMAS(25)))
}

// task1()
task2()
