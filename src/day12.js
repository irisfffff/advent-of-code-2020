const readFile = require('./inputReader')

const input = readFile('./resources/day12')

const dirs = ['N', 'E', 'S', 'W']
const dirMaps = {
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
}

const navigate1 = (r) => {
    let orientation = 'E'
    const pos = [0, 0]
    input.forEach((instruction, index) => {
        const action = instruction[0]
        const value = parseInt(instruction.slice(1))
        switch (action) {
            case 'R':
                orientation = dirs[(dirs.findIndex(key => key === orientation) + value / 90) % 4]
                break
            case 'L':
                orientation = dirs[((dirs.findIndex(key => key === orientation) - value / 90) % 4 + 4) % 4]
                break
            case 'F':
                pos[0] += dirMaps[orientation][0] * value
                pos[1] += dirMaps[orientation][1] * value
                break
            default:
                pos[0] += dirMaps[action][0] * value
                pos[1] += dirMaps[action][1] * value
                break
        }
    })
    return Math.abs(pos[0]) + Math.abs(pos[1])
}

const navigate2 = (r) => {
    const pos = [0, 0]
    const wayPoint = [-1, 10]
    input.forEach((instruction, index) => {
        const action = instruction[0]
        const value = parseInt(instruction.slice(1))
        let dirX, dirY, newX, newY
        const wayPointX = wayPoint[0]
        const wayPointY = wayPoint[1]
        switch (action) {
            case 'R':
                dirX = wayPoint[0] >= 0 ? 'S' : 'N'
                dirY = wayPoint[1] >= 0 ? 'E' : 'W'
                newX = dirs[(dirs.findIndex(key => key === dirX) + value / 90) % 4]
                newY = dirs[(dirs.findIndex(key => key === dirY) + value / 90) % 4]
                wayPoint[0] = dirMaps[newX][0] * Math.abs(wayPointX) + dirMaps[newY][0] * Math.abs(wayPointY)
                wayPoint[1] = dirMaps[newX][1] * Math.abs(wayPointX) + dirMaps[newY][1] * Math.abs(wayPointY)
                break
            case 'L':
                dirX = wayPoint[0] >= 0 ? 'S' : 'N'
                dirY = wayPoint[1] >= 0 ? 'E' : 'W'
                newX = dirs[((dirs.findIndex(key => key === dirX) - value / 90) % 4 + 4) % 4]
                newY = dirs[((dirs.findIndex(key => key === dirY) - value / 90) % 4 + 4) % 4]
                wayPoint[0] = dirMaps[newX][0] * Math.abs(wayPointX) + dirMaps[newY][0] * Math.abs(wayPointY)
                wayPoint[1] = dirMaps[newX][1] * Math.abs(wayPointX) + dirMaps[newY][1] * Math.abs(wayPointY)
                break
            case 'F':
                pos[0] += wayPoint[0] * value
                pos[1] += wayPoint[1] * value
                break
            default:
                wayPoint[0] += dirMaps[action][0] * value
                wayPoint[1] += dirMaps[action][1] * value
                break
        }
    })
    return Math.abs(pos[0]) + Math.abs(pos[1])
}

const task1 = () => {
    console.log(navigate1())
}

const task2 = () => {
    console.log(navigate2())
}

task1()
task2()
