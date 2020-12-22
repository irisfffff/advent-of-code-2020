const readFile = require('./inputReader')

const input = readFile('./resources/day22')

const processInput = () => {
    const deck1 = []
    const deck2 = []
    let i = 1
    while (input[i]) {
        deck1.push(parseInt(input[i++]))
    }
    i += 2
    while (input[i]) {
        deck2.push(parseInt(input[i++]))
    }
    return [deck1, deck2]
}

const playRound = (deck1, deck2) => {
    const top1 = deck1.shift()
    const top2 = deck2.shift()
    if (top1 > top2) {
        deck1.push(top1, top2)
    } else {
        deck2.push(top2, top1)
    }
}

const playRecursive = (deck1, deck2) => {
    const deckSet = new Set()
    deckSet.add(deck1.join(',') + '-' + deck2.join(','))
    while (deck1.length && deck2.length) {
        const top1 = deck1.shift()
        const top2 = deck2.shift()
        if (top1 <= deck1.length && top2 <= deck2.length) {
            const winner = playRecursive(deck1.slice(0, top1), deck2.slice(0, top2))
            if (winner === 1) {
                deck1.push(top1, top2)
            } else {
                deck2.push(top2, top1)
            }
        } else if (top1 > top2) {
            deck1.push(top1, top2)
        } else {
            deck2.push(top2, top1)
        }
        const newDeckCombination = deck1.join(',') + '-' + deck2.join(',')
        // Player 1 wins if same cards in same order appeared in this game
        if (deckSet.has(newDeckCombination)) {
            return 1
        }
        deckSet.add(newDeckCombination)
    }
    if (deck1.length) {
        return 1
    } else {
        return 2
    }
}

const calcWinningScore = (deck) => {
    let score = 0
    for (let i = 0; i < deck.length; i++) {
        score += deck[i] * (deck.length - i)
    }
    return score
}

const task1 = () => {
    const [deck1, deck2] = processInput()
    while (deck1.length && deck2.length) {
        playRound(deck1, deck2)
    }
    const winningScore = deck1.length ? calcWinningScore(deck1) : calcWinningScore(deck2)
    console.log(winningScore)
}

const task2 = () => {
    const [deck1, deck2] = processInput()
    const winner = playRecursive(deck1, deck2)
    const winningScore = winner === 1 ? calcWinningScore(deck1) : calcWinningScore(deck2)
    console.log(winningScore)
}

task1()
task2()