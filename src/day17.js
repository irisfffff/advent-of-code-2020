const readFile = require('./inputReader')

const input = readFile('./resources/day17')
const neighbor = [
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1]
]

const cycle = (state) => {
    let activeCount = 0
    const newState = new Array(20).fill().map(() => Array(20).fill().map(() => Array(20).fill(false)))
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[0].length; j++) {
            for (let k = 0; k < state[0][0].length; k++) {
                let activeNeighbors = 0
                neighbor[0].forEach(x => {
                    neighbor[1].forEach(y => {
                        neighbor[2].forEach(z => {
                            if (!(x === 0 && y === 0 && z === 0) && state[i + z] && state[i + z][j + y] && state[i + z][j + y][k + x]) {
                                activeNeighbors++
                            }
                        })
                    })
                })
                if (state[i][j][k] && (activeNeighbors < 2 || activeNeighbors > 3)) {
                    newState[i][j][k] = false
                } else if (!state[i][j][k] && activeNeighbors === 3) {
                    newState[i][j][k] = true
                } else {
                    newState[i][j][k] = state[i][j][k]
                }
                if (newState[i][j][k]) {
                    activeCount++
                }
            }
        }
    }
    // console.log(newState[10].map((row) => row.map((item) => item ? '#' : '.').join('')).join('\n'))
    return [newState, activeCount]
}

const task1 = () => {
    let state = new Array(20).fill().map(() => Array(20).fill().map(() => Array(20).fill(false)))
    let activeCount = 0
    const base = [6, 6, 10]
    input.forEach((line, y) => {
        const z = 0
        line.split('')
            .map(item => item === '#')
            .forEach((item, x) => {
                state[z+base[2]][y+base[1]][x+base[0]] = item
            })
    })
    let cyclesLimit = 6
    while (cyclesLimit > 0) {
        [state, activeCount] = cycle(state)
        cyclesLimit--
    }
    console.log(activeCount)
}

const cycle2 = (state) => {
    let activeCount = 0
    const newState = new Array(20).fill().map(() => Array(20).fill().map(() => Array(20).fill().map(() => Array(20).fill(false))))
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[0].length; j++) {
            for (let k = 0; k < state[0][0].length; k++) {
                for (let l = 0; l < state[0][0][0].length; l++) {
                    let activeNeighbors = 0
                    neighbor[0].forEach(x => {
                        neighbor[1].forEach(y => {
                            neighbor[2].forEach(z => {
                                neighbor[3].forEach(xx => {
                                    if (!(x === 0 && y === 0 && z === 0 && xx === 0) && state[i + xx] && state[i + xx][j + z] && state[i + xx][j + z][k + y] && state[i + xx][j + z][k + y][l + x]) {
                                        activeNeighbors++
                                    }
                                })
                            })
                        })
                    })
                    if (state[i][j][k][l] && (activeNeighbors < 2 || activeNeighbors > 3)) {
                        newState[i][j][k][l] = false
                    } else if (!state[i][j][k][l] && activeNeighbors === 3) {
                        newState[i][j][k][l] = true
                    } else {
                        newState[i][j][k][l] = state[i][j][k][l]
                    }
                    if (newState[i][j][k][l]) {
                        activeCount++
                    }
                }
            }
        }
    }
    // console.log(newState[10].map((row) => row.map((item) => item ? '#' : '.').join('')).join('\n'))
    return [newState, activeCount]
}

const task2 = () => {
    let state = new Array(20).fill().map(() => Array(20).fill().map(() => Array(20).fill().map(() => Array(20).fill(false))))
    let activeCount = 0
    const base = [6, 6, 10, 10]
    input.forEach((line, y) => {
        const z = 0
        const xx = 0
        line.split('')
            .map(item => item === '#')
            .forEach((item, x) => {
                state[xx+base[3]][z+base[2]][y+base[1]][x+base[0]] = item
            })
    })
    let cyclesLimit = 6
    while (cyclesLimit > 0) {
        [state, activeCount] = cycle2(state)
        cyclesLimit--
    }
    console.log(activeCount)
}

// task1()
task2()
