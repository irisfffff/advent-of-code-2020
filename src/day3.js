const readFile = require('./inputReader')

const input = readFile('./resources/day3')
const height = input.length
const width = input[0].length

const slideDown = (slope) => {
    let position = [0, 0]
    let treeCount = 0
    while (position[1] < height - 1) {
        position[0] += slope[0]
        position[1] += slope[1]
        if (input[position[1]][position[0] % width] === '#') {
            treeCount++
        }
    }
    return treeCount
}

const task1 = () => {
    const slope = [3, 1]
    console.log(slideDown(slope))
}

const task2 = () => {
    const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    const result = slopes.map((slope) => slideDown(slope)).reduce((acc, cur) => acc * cur)
    console.log(result)
}

task1()
task2()