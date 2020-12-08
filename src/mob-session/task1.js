const readFile = require('../inputReader')

const input = readFile('../resources/task1')

const walk = (orientation, direction, steps) => {
    const map = ['N', 'E', 'S', 'W']
    const orientationIndex = map.findIndex((item) => item === orientation)
    let newOrientation, deltaX = 0, deltaY = 0
    switch (direction) {
        case 'L':
            newOrientation = map[(orientationIndex + 3) % 4]
            break
        case 'R':
            newOrientation = map[(orientationIndex + 1) % 4]
            break
    }
    switch (newOrientation) {
        case 'N':
            deltaY = steps
            break
        case 'E':
            deltaX = steps
            break
        case 'S':
            deltaY = -steps
            break
        case 'W':
            deltaX = -steps
            break
    }
    return [newOrientation, deltaX, deltaY]
}

const task1 = () => {
    const instructions = input[0].split(', ')
    const coordinations = [0, 0]
    let orientation = 'N'
    instructions.forEach((instruction) => {
        const result = walk(orientation, instruction[0], parseInt(instruction.slice(1)))
        orientation = result[0]
        coordinations[0] += result[1]
        coordinations[1] += result[2]
    })
    console.log(Math.abs(coordinations[0]) + Math.abs(coordinations[1]))
}

const task2 = () => {
    const instructions = input[0].split(', ')
    const coordinations = [250, 250]
    let orientation = 'N'
    const visitedMap = Array(500).fill().map(() => Array(500).fill(0))
    visitedMap[250][250] = 1
    let crossing
    for(let j = 0; j < instructions.length; j++) {
        const instruction = instructions[j]
        const result = walk(orientation, instruction[0], parseInt(instruction.slice(1)))
        orientation = result[0]
        const oldCoordinations = coordinations.slice()
        coordinations[0] += result[1]
        coordinations[1] += result[2]
        const x = coordinations[0] > oldCoordinations[0] ? 1 : -1
        const y = coordinations[1] > oldCoordinations[1] ? 1 : -1
        for (let i = oldCoordinations[0] + 1; i <= coordinations[0]; i += x) {
            if (visitedMap[i][coordinations[1]] === 1) {
                crossing = [i, coordinations[1]]
                break
            }
            visitedMap[i][coordinations[1]] = 1
        }
        for (let i = oldCoordinations[1] + 1; i <= coordinations[1]; i += y) {
            if (visitedMap[coordinations[0]][i] === 1) {
                crossing = [coordinations[0], i]
                break
            }
            visitedMap[coordinations[0]][i] = 1
        }
        if (crossing !== undefined) {
            break
        }
    }
    console.log(Math.abs(crossing[0] - 250) + Math.abs(crossing[1] - 250))
}

task2()