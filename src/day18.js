const readFile = require('./inputReader')

const input = readFile('./resources/day18')

const findPairedParenthesis = (expression) => {
    const parentheses = expression.map((item, idx) => [item, idx])
        .filter(item => item[0] === '(' || item[0] === ')')
    const pairs = new Map()
    const leftParenthesisStack = []
    parentheses.forEach(item => {
        if (item[0] === '(') {
            leftParenthesisStack.push(item)
        } else {
            pairs.set(leftParenthesisStack.pop()[1], item[1])
        }
    })
    return pairs
}

const evaluateExpression1 = (expression) => {
    let result = 0
    let operator = '+'
    const parenthesesPairs = findPairedParenthesis(expression)
    for (let i = 0; i < expression.length; ) {
        if (typeof expression[i] === 'number') {
            if (operator === '+') {
                result += expression[i]
            } else if (operator === '*') {
                result *= expression[i]
            }
            i++
        } else if (expression[i] === '+') {
            operator = '+'
            i++
        } else if (expression[i] === '*') {
            operator = '*'
            i++
        } else if (expression[i] === '(') {
            const rightParenthesis = parenthesesPairs.get(i)
            if (operator === '+') {
                result += evaluateExpression1(expression.slice(i + 1, rightParenthesis))
            } else if (operator === '*') {
                result *= evaluateExpression1(expression.slice(i + 1, rightParenthesis))
            }
            i = rightParenthesis + 1
        }
    }
    return result
}

const evaluateExpression2 = (expression) => {
    let operator = '+'
    let current = 0
    const multiplyStack = []
    const parenthesesPairs = findPairedParenthesis(expression)
    for (let i = 0; i < expression.length; ) {
        if (typeof expression[i] === 'number') {
            if (operator === '+') {
                current += expression[i]
            } else if (operator === '*') {
                multiplyStack.push(current)
                current = expression[i]
            }
            i++
        } else if (expression[i] === '+') {
            operator = '+'
            i++
        } else if (expression[i] === '*') {
            operator = '*'
            i++
        } else if (expression[i] === '(') {
            const rightParenthesis = parenthesesPairs.get(i)
            if (operator === '+') {
                current += evaluateExpression2(expression.slice(i + 1, rightParenthesis))
            } else if (operator === '*') {
                multiplyStack.push(current)
                current = evaluateExpression2(expression.slice(i + 1, rightParenthesis))
            }
            i = rightParenthesis + 1
        }
    }
    let result = current
    while (multiplyStack.length) {
        result *= multiplyStack.pop()
    }
    return result
}


const task1 = () => {
    let sum = 0
    input.forEach(line => {
        const expression = line.match(/(\d+)|\+|\*|\(|\)/g)
            .map(item => item.match(/\d+/g) ? parseInt(item) : item)
        sum += evaluateExpression1(expression)
    })
    console.log(sum)
}

const task2 = () => {
    let sum = 0
    input.forEach(line => {
        const expression = line.match(/(\d+)|\+|\*|\(|\)/g)
            .map(item => item.match(/\d+/g) ? parseInt(item) : item)
        sum += evaluateExpression2(expression)
    })
    console.log(sum)
}

// task1()
task2()