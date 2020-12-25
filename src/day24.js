const readFile = require('./inputReader')

const input = readFile('./resources/day24')

const neighborMap = {
    'e': [2, 0],
    'se': [1, -1],
    'sw': [-1, -1],
    'w': [-2, 0],
    'nw': [-1, 1],
    'ne': [1, 1]
}

const flipTile = (tiles, x, y) => {
    const borderLimit = 1000
    const blackNeighbors = Object.values(neighborMap)
        .map(item => {
            if (item[0] + x < 0 || item[0] + x >= borderLimit || item[1] + y < 0 || item[1] + y >= borderLimit)
                return false
            return tiles[item[0] + x][item[1] + y]
        })
        .filter(item => item)
        .length
    // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
    if (tiles[x][y] && (blackNeighbors === 0 || blackNeighbors > 2)) {
        return false
    } else if (!tiles[x][y] && blackNeighbors === 2) {
        // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
        return true
    }
    return tiles[x][y]
}

const task1 = () => {
    const blackTiles = new Set()
    const regex = /(e)|(se)|(sw)|(w)|(nw)|(ne)/g
    input.forEach(line => {
        const tile = line.match(regex)
            .map(item => neighborMap[item])
            .reduce((acc, val) => [acc[0] + val[0], acc[1] + val[1]])
            .join(',')
        if (blackTiles.has(tile)) {
            blackTiles.delete(tile)
        } else {
            blackTiles.add(tile)
        }
    })
    console.log(blackTiles.size)
    return blackTiles
}

const task2 = () => {
    let tiles = Array(1000).fill().map(() => Array(1000).fill(false)) // True: black, False: white
    const blackTiles = task1()
    const center = 500
    blackTiles.forEach(item => {
        const tile = item.split(',').map(value => parseInt(value) + center)
        tiles[tile[0]][tile[1]] = true
    })
    let leftDays = 100
    while (leftDays) {
        tiles = tiles.map((row, x) => row.map((tile, y) => flipTile(tiles, x, y)))
        leftDays--
        if (leftDays%10 === 0) {
            console.log(tiles.flat().filter(item => item).length)
        }
    }
    console.log(tiles.flat().filter(item => item).length)
}

task2()