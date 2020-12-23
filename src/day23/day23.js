const readFile = require('../inputReader')
const {Node, LinkedList} = require('./LinkedList')

const input = readFile('../resources/day23')

const minLabel = 1
const maxLabel = 1000000

const moveCups = (cupsList, currentNode) => {
    const pickupCups = [currentNode.next, currentNode.next.next, currentNode.next.next.next]
    const pickupCupsData = pickupCups.map(c => c.data)
    let destination = currentNode.data - 1
    if (destination < minLabel) {
        destination = maxLabel
    }
    while (pickupCupsData.includes(destination)) {
        destination--
        if (destination < minLabel) {
            destination = maxLabel
        }
    }
    const destinationNode = cupsList.findData(destination)
    const lastPickupNode = pickupCups[2]
    currentNode.next = lastPickupNode.next
    const destinationNext = destinationNode.next
    destinationNode.next = pickupCups[0]
    lastPickupNode.next = destinationNext
    return currentNode.next
}

const printResult = (cupsList) => {
    let startNode = cupsList.findData(1).next
    const result = []
    while (startNode.data !== 1) {
        result.push(startNode.data)
        startNode = startNode.next
    }
    console.log(result.join(''))
}

const printCupsWithStars = (cupsList) => {
    const node1 = cupsList.findData(1)
    console.log(node1.next.data * node1.next.next.data)
}

const task1 = () => {
    let cupsList = new LinkedList()
    input[0].split('').forEach(item => {
        [cupsList.head, cupsList.tail] = cupsList.insertAtEnd(parseInt(item))
    })
    cupsList.tail.next = cupsList.head
    let leftMoves = 100
    let currentNode = cupsList.head
    while (leftMoves) {
        currentNode = moveCups(cupsList, currentNode)
        leftMoves--
    }
    printResult(cupsList)
}

const task2 = () => {
    let cupsList = new LinkedList()
    input[0].split('').forEach(item => {
        [cupsList.head, cupsList.tail] = cupsList.insertAtEnd(parseInt(item))
    })
    let value = 10
    while (value <= 1000000) {
        [cupsList.head, cupsList.tail] = cupsList.insertAtEnd(value)
        value++
    }
    cupsList.tail.next = cupsList.head
    let leftMoves = 10000000
    let currentNode = cupsList.head
    while (leftMoves) {
        currentNode = moveCups(cupsList, currentNode)
        leftMoves--
    }
    printCupsWithStars(cupsList)
}


// task1()
task2()