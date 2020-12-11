const readFile = require('./inputReader')

const input = readFile('./resources/day11')
const seats = input.slice().map(row => row.split(''))

const adjacent = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]

const findAdjacent = (i, j, currentSeats) => {
    return adjacent.filter(pos =>
        currentSeats[i + pos[0]] && currentSeats[i + pos[0]][j + pos[1]] && currentSeats[i + pos[0]][j + pos[1]] === '#'
    ).length
}

const findVisible = (i, j, currentSeats) => {
    let occupied = 0
    adjacent.forEach((pos) => {
        let ii = i, jj = j
        while(true) {
            ii += pos[0]
            jj += pos[1]
            if (!currentSeats[ii] || !currentSeats[ii][jj] || currentSeats[ii][jj] !== '.')
                break
        }
        if (currentSeats[ii] && currentSeats[ii][jj] && currentSeats[ii][jj] === '#')
            occupied++
    })
    return occupied
}

const changeSeat = (rule, occupiedLimit) => {
    let occupied = 0
    let seatChanged = true
    while (seatChanged) {
        const currentSeats = seats.map(row => row.slice())
        seatChanged = false
        currentSeats.forEach((row, i) => {
            row.forEach((seat, j) => {
                switch (seat) {
                    case '.':
                        break
                    case 'L':
                        if (rule(i, j, currentSeats) === 0) {
                            seats[i][j] = '#'
                            occupied++
                            seatChanged = true
                        }
                        break
                    case '#':
                        if (rule(i, j, currentSeats) >= occupiedLimit) {
                            seats[i][j] = 'L'
                            occupied--
                            seatChanged = true
                        }
                        break
                }
            })
        })
    }
    return occupied
}

const task1 = () => {
    console.log(changeSeat(findAdjacent, 4))
}

const task2 = () => {
    console.log(changeSeat(findVisible, 5))
}

// task1()
task2()
