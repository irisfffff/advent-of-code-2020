const readFile = require('./inputReader')

const input = readFile('./resources/day19')

const readRule = (rule) => {
    const key = rule.split(': ')[0]
    if (rule.split(': ')[1].match(/"[A-Za-z]+"/g)) {
        return [ key, rule.split(': ')[1].slice(1, -1)]
    } else {
        const subRules = rule.split(': ')[1].split(' | ').map(item => item.split(' ').map(i => parseInt(i)))
        return [ key, subRules ]
    }
}

const getValidRule = (key, rules) => {
    if (typeof rules[key] === 'string') {
        return [rules[key]]
    } else {
        const subRules = rules[key].map(subRule => subRule.map(rule => getValidRule(rule, rules)))
        return subRules.flatMap(subRule => subRule.reduce((acc, rule) => acc.flatMap(x => rule.map(y => x + y)), ['']))
    }
}

const task1 = () => {
    let i = 0
    const rules = {}
    for (; input[i]; i++) {
        const [key, value] = readRule(input[i])
        rules[key] = value
    }
    const validRule0 = getValidRule(0, rules)
    let counter = 0
    for (i += 1; i < input.length; i++) {
        if (validRule0.includes(input[i])) {
            counter++
        }
    }
    console.log(counter)
}

const task2 = () => {
    let i = 0
    const rules = {}
    for (; input[i]; i++) {
        const [key, value] = readRule(input[i])
        rules[key] = value
    }
    // Rule 0: 8 11
    // Rule 8: 42 => 8: 42 | 42 8   Rule42+
    // Rule 11: 42 31 => 11: 42 31 | 42 11 31   [Rule42 Rule31]+
    const validRule42 = getValidRule(42, rules) // each length 8
    const validRule31 = getValidRule(31, rules) // each length 8
    let counter = 0
    const ruleLength = 8
    for (i += 1; i < input.length; i++) {
        let countRule31 = 0, countRule42 = 0
        let message = input[i].slice()
        while (true) {
            if (validRule31.includes(message.slice(-ruleLength))) {
                countRule31++
                if (message.length <= ruleLength) {
                    break
                }
                message = message.slice(0, -ruleLength)
            } else {
                break
            }
        }
        let leftMessage = input[i].slice(0, -countRule31*ruleLength)
        while (leftMessage !== '') {
            if (validRule42.includes(leftMessage.slice(0, ruleLength))) {
                countRule42++
                if (leftMessage.length < ruleLength) {
                    break
                }
                leftMessage = leftMessage.slice(ruleLength)
            } else {
                break
            }
        }
        if (leftMessage === '' && countRule42 > countRule31) {
            counter++
        }
    }
    console.log(counter)
}

// task1()
task2()