const readFile = require('./inputReader')

const input = readFile('./resources/day16')

const checkValidity = (ticket, validNumbers) => {
    const values = ticket.match(/\d+/g).map(item => parseInt(item))
    const invalidValues = values.filter(value => !validNumbers.some(item => value >= item[0] && value <= item[1]))
    if (invalidValues.length) {
        return [invalidValues.reduce((acc, val) => acc + val), false]
    }
    return [0, true]
}

const isFieldNamePossible = (value, ranges) => {
    return ranges.some(range => value >= range[0] && value <= range[1])
}

const task1 = () => {
    let i = 0
    const validNumbers = []
    // Read rules
    while (input[i] && input[i] !== '') {
        const ranges = input[i].match(/\d+/g).map((item) => parseInt(item))
        validNumbers.push([ranges[0], ranges[1]], [ranges[2], ranges[3]])
        i++
    }
    i += 5 // Skip empty line, your ticket, empty line, nearby tickets
    let errorRate = 0
    const validTickets = []
    // Read nearby tickets
    while (input[i] && input[i] !== '') {
        const result = checkValidity(input[i], validNumbers)
        if (result[1]) {
            validTickets.push(input[i])
        }
        errorRate += result[0]
        i++
    }
    console.log(errorRate)
    return validTickets
}

const task2 = () => {
    let i = 0
    const rules = {}
    // Read rules
    while (input[i] && input[i] !== '') {
        const ranges = input[i].match(/\d+/g).map((item) => parseInt(item))
        rules[input[i].split(':')[0]] = [[ranges[0], ranges[1]], [ranges[2], ranges[3]]]
        i++
    }
    i += 2
    const myTicket = input[i].match(/\d+/g).map((item) => parseInt(item))
    i += 3
    const validTickets = task1()
    const potentialFields = Array(Object.keys(rules).length).fill().map(() => Object.keys(rules))
    const confirmedFields = Array(Object.keys(rules).length).fill('')
    let decoded = false
    while (!decoded) {
        for (let j = 0; j < validTickets.length; j++) {
            const values = validTickets[j].match(/\d+/g).map(item => parseInt(item))
            potentialFields.forEach((potential, idx) => {
                if (confirmedFields[idx] === '') {
                    const newPotential = potential.filter(name =>
                        !confirmedFields.includes(name) && isFieldNamePossible(values[idx], rules[name]))
                    potentialFields[idx] = newPotential
                    if (newPotential.length === 1) {
                        confirmedFields[idx] = newPotential[0]
                    }
                }
            })
            if (confirmedFields.filter(item => item === '').length === 0) {
                decoded = true
                break
            }
        }
    }
    const departureFields = confirmedFields.map((item, idx) => [item, idx]).filter(item => item[0].startsWith('departure'))
    let result = 1
    departureFields.forEach(item => result *= myTicket[item[1]])
    console.log(result)
}


// task1()
task2()