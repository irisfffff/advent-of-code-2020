const readFile = require('./inputReader')

const input = readFile('./resources/day25')

const transformSubjectNumber = (loopSize, subjectNumber) => {
    const remainderOf = 20201227
    let value = 1
    while (loopSize) {
        value = value * subjectNumber % remainderOf
        // value *= subjectNumber
        loopSize--
    }
    return value
    // return value % remainderOf
}

const findLoopSize = (publicKey) => {
    const subjectNumber = 7
    const remainderOf = 20201227
    let value = 1, loopSize = 0
    while (value !== publicKey) {
        value = value * subjectNumber % remainderOf
        loopSize++
    }
    return loopSize
}

const task1 = () => {
    const cardPublicKey = parseInt(input[0])
    const doorPublicKey = parseInt(input[1])
    const cardLoopSize = findLoopSize(cardPublicKey)
    const doorLoopSize = findLoopSize(doorPublicKey)
    console.log(cardLoopSize)
    const encryptionKey = transformSubjectNumber(cardLoopSize, doorPublicKey)
    console.log(encryptionKey)
    console.log(transformSubjectNumber(doorLoopSize, cardPublicKey))
}

task1()