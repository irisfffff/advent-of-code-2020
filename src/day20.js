const readFile = require('./inputReader')

const input = readFile('./resources/day20')

const bordersMap = new Map()
const isTileBorderAligned = new Map()
const tileImages = new Map()
const seaMonsterImage = [
    '                  # ',
    '#    ##    ##    ###',
    ' #  #  #  #  #  #   '
]

const flipImage = (image) => {
    return image.map(row => row.reverse())
}

const rotateClockwise90 = (image) => {
    return image[0].map((val, index) => image.map(row => row[index]).reverse())
}

const processBorder = (border, tileId, side) => {
    const borderCopy = border.join('')
    const borderReverseCopy = border.reverse().join('')
    const sideMap = {
        'top': 0,
        'right': 1,
        'bottom': 2,
        'left': 3,
    }
    if (bordersMap.has(borderCopy)) {
        const [adjacentId, adjacentSide] = bordersMap.get(borderCopy)[0].split('-')
        bordersMap.get(borderCopy).push(tileId + '-' + side + '-flipped')
        // Set the adjacent tile & side for current tile & side
        isTileBorderAligned.get(tileId)[sideMap[side]] = bordersMap.get(borderCopy)[0] + '-flipped'
        isTileBorderAligned.get(parseInt(adjacentId))[sideMap[adjacentSide]] = tileId + '-' + side + '-flipped'
    } else if (bordersMap.has(borderReverseCopy)) {
        const [adjacentId, adjacentSide] = bordersMap.get(borderReverseCopy)[0].split('-')
        bordersMap.get(borderReverseCopy).push(tileId + '-' + side)
        isTileBorderAligned.get(tileId)[sideMap[side]] = bordersMap.get(borderReverseCopy)[0]
        isTileBorderAligned.get(parseInt(adjacentId))[sideMap[adjacentSide]] = tileId + '-' + side
    } else {
        bordersMap.set(borderCopy, [tileId + '-' + side])
    }
}

const processRight = (right, rowImage, isFlipped) => {
    const [rightTileId, rightTileSide] = right.split('-')
    let rightImage = tileImages.get(parseInt(rightTileId))
    const newIsFlipped = (right.includes('flipped') && !isFlipped) || (!right.includes('flipped') && isFlipped)
    if (newIsFlipped) {
        rightImage = flipImage(rightImage)
    }
    const rotateMap = {
        top: 3,
        right: 2,
        bottom: 1,
        left: 0
    }
    const flippedRotateMap = {
        top: 3,
        right: 0,
        bottom: 1,
        left: 2
    }
    let rotateTimes = newIsFlipped ? flippedRotateMap[rightTileSide] : rotateMap[rightTileSide]
    while (rotateTimes) {
        rightImage = rotateClockwise90(rightImage)
        rotateTimes--
    }
    rightImage = rightImage.map(row => row.join(''))
    let imageLength = 8
    const newRowImage = []
    while(imageLength) {
        newRowImage.push(rowImage[8 - imageLength].concat(rightImage[8 - imageLength]))
        imageLength--
    }
    const rightMap = {
        top: 2, // When top on left, Bottom is right
        right: 3, // When right on left, Left is right
        bottom: 0, // When bottom on left, Top is right
        left: 1, // When left on left, Right is right
    }
    return [isTileBorderAligned.get(parseInt(rightTileId))[rightMap[rightTileSide]], newRowImage, newIsFlipped]
}

const processRow = (right, initialRowImage, isFlipped) => {
    let rowImage = initialRowImage.map(row => row.slice())
    while (right) {
        [right, rowImage, isFlipped] = processRight(right, rowImage, isFlipped)
    }
    console.log(rowImage)
    return rowImage
}

const findSeaMonster = (initialX, initialY, image) => {
    // Positions of # in the sea monster
    const seaMonster = {
        0: [18],
        1: [0, 5, 6, 11, 12, 17, 18, 19],
        2: [1, 4, 7, 10, 13, 16]
    }
    for(const [key, value] of Object.entries(seaMonster)) {
        for(let i = 0; i < value.length; i++) {
            if (image[initialX + parseInt(key)][initialY + value[i]] !== '#') {
                return false
            }
        }
    }
    Object.keys(seaMonster).forEach(key => {
        seaMonster[key].forEach(value => {
            image[initialX+parseInt(key)][initialY+value] = 'O'
        })
    })
    return true
}

const findAllSeaMonsters = (image) => {
    let seaMonsterCounter = 0
    for (let i = 0; i < image.length - 2; i++) {
        for (let j = 0; j < image[0].length - 19; j++) {
            if (findSeaMonster(i, j, image)) {
                seaMonsterCounter++
            }
        }
    }
    return seaMonsterCounter
}

const task1 = () => {
    let i = 0
    while (input[i]) {
        const tileId = parseInt(input[i].match(/\d+/g)[0])
        i++
        // Save border in clockwise direction
        const tileTop = input[i].split('')
        const tileLeft = []
        const tileRight = []
        let tileLength = 10
        const image = []
        while (tileLength) {
            tileLeft.push(input[i][0])
            tileRight.push(input[i][9])
            if (tileLength > 1 && tileLength < 10) {
                image.push(input[i].slice(1, 9).split(''))
            }
            tileLength--
            i++
        }
        tileImages.set(tileId, image)
        const tileBottom = input[i-1].split('')
        tileLeft.reverse()
        tileBottom.reverse()
        isTileBorderAligned.set(tileId, [false, false, false, false])
        processBorder(tileTop, tileId, 'top')
        processBorder(tileRight, tileId, 'right')
        processBorder(tileBottom, tileId, 'bottom')
        processBorder(tileLeft, tileId, 'left')
        i++ // skip empty line
    }
    const iterator = isTileBorderAligned.entries();
    const corners = []
    while (true) {
        const value = iterator.next().value
        if (!value) {
            break
        }
        if (value[1].filter(item => item === false).length === 2) {
            corners.push(value[0])
        }
    }
    // console.log(bordersMap)
    // console.log(isTileBorderAligned)
    console.log(corners.reduce((acc, val) => acc * val))
    return corners
}

const task2 = () => {
    const corners = task1()
    console.log(isTileBorderAligned.get(corners[3]))
    // Take corners[3] as the starting point which has top and right edges aligned, rotate 90 degrees
    // In example use corners[0]
    let initialRowImage = rotateClockwise90(tileImages.get(corners[3])).map(row => row.join(''))
    let right = isTileBorderAligned.get(corners[3])[0]
    let bottom = isTileBorderAligned.get(corners[3])[1]
    let image = processRow(right, initialRowImage, false)
    // false for example
    let isFlipped = false
    while (bottom) {
        const [bottomTileId, bottomTileSide] = bottom.split('-')
        initialRowImage = tileImages.get(parseInt(bottomTileId))
        isFlipped = (bottom.includes('flipped') && !isFlipped) || (!bottom.includes('flipped') && isFlipped)
        if (isFlipped) {
            initialRowImage = flipImage(initialRowImage)
        }
        const rotateMap = {
            top: 0,
            right: 3,
            bottom: 2,
            left: 1
        }
        const flippedRotateMap = {
            top: 0,
            right: 1,
            bottom: 2,
            left: 3
        }
        let rotateTimes = isFlipped ? flippedRotateMap[bottomTileSide] : rotateMap[bottomTileSide]
        while (rotateTimes) {
            initialRowImage = rotateClockwise90(initialRowImage)
            rotateTimes--
        }
        initialRowImage = initialRowImage.map(row => row.join(''))
        const rightMap = {
            top: 1,
            right: 2,
            bottom: 3,
            left: 0
        }
        const flippedRightMap = {
            top: 3,
            right: 0,
            bottom: 1,
            left: 2,
        }
        image = image.concat(
            processRow(isTileBorderAligned.get(parseInt(bottomTileId))[
                isFlipped ? flippedRightMap[bottomTileSide] : rightMap[bottomTileSide]
                ], initialRowImage, isFlipped)
        )
        const bottomMap = {
            top: 2,
            right: 3,
            bottom: 0,
            left: 1
        }
        bottom = isTileBorderAligned.get(parseInt(bottomTileId))[bottomMap[bottomTileSide]]
    }

    // Successfully generated image!!
    console.log(image)
    const allHashtags = image.map(row => row.match(/#/g).length).reduce((acc, val) => acc + val)
    const hashtagsInSeaMonster = seaMonsterImage.map(row => row.match(/#/g).length).reduce((acc, val) => acc + val)
    image = image.map(row => row.split(''))
    let rotateCounter = 4
    while (rotateCounter) {
        let result = findAllSeaMonsters(image)
        if (result > 0) {
            image.forEach(row => {console.log(row.join(''))})
            return allHashtags - hashtagsInSeaMonster * result
        }
        image = rotateClockwise90(image)
        rotateCounter--
    }
    image = flipImage(image)
    rotateCounter = 4
    while (rotateCounter) {
        let result = findAllSeaMonsters(image)
        if (result > 0) {
            image.forEach(row => {console.log(row.join(''))})
            return allHashtags - hashtagsInSeaMonster * result
        }
        image = rotateClockwise90(image)
        rotateCounter--
    }
}

console.log(task2())
// task2()
