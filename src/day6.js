const readFile = require('./inputReader')

const input = readFile('./resources/day6')

const identifyAny = () => {
    const responses  = []
    let newResponse = []
    input.forEach((line) => {
        if (line === '') {
            responses.push(newResponse.filter((item, pos) => newResponse.indexOf(item) === pos))
            newResponse = []
        } else {
            newResponse.push(...line)
        }
    })
    responses.push(newResponse.filter((item, pos) => newResponse.indexOf(item) === pos))
    return responses.flat().length
}

const identifyEvery = () => {
    const responses  = []
    let newResponse = []
    let newGroup = true
    input.forEach((line) => {
        if (line === '') {
            responses.push(newResponse)
            newGroup = true
        } else {
            if (newGroup) {
                newResponse = [...line]
                newGroup = false
            } else {
                newResponse = newResponse.filter((item) => line.includes(item))
            }
        }
    })
    responses.push(newResponse)
    return responses.flat().length
}

const task1 = () => {
    console.log(identifyAny())
}

const task2 = () => {
    console.log(identifyEvery())
}

task1()
task2()
