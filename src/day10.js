const readFile = require('./inputReader')

const input = readFile('./resources/day10').map(item => parseInt(item))
input.sort((a, b) => a - b)
// built-in joltage adapter
input.push(input[input.length - 1] + 3)

const testAllAdapters = () => {
    const outlet = 0
    const difs = input.map((joltage, idx) => idx === 0 ? joltage - outlet : joltage - input[idx - 1])
    const dif1 = difs.filter(dif => dif === 1).length
    const dif3 = difs.filter(dif => dif === 3).length
    return [dif1, dif3]
}

const dp = (difs, currentJoltage, adapterJoltage) => {
    adapterJoltage += difs[0]
    if (difs.length === 1) {
        if (adapterJoltage - currentJoltage <= 3) {
            return 1
        } else {
            return 0
        }
    }
    return dp(difs.slice(1), currentJoltage + difs[0], adapterJoltage) +
        dp(difs.slice(1), currentJoltage, adapterJoltage)
}

const computeWays = () => {
    const outlet = 0
    const difs = input.map((joltage, idx) => idx === 0 ? joltage - outlet : joltage - input[idx - 1])
    const newDifs = []
    let currentDifsArr = []
    for(let i = 0; i < difs.length; i++) {
        if(difs[i] === 3) {
            if (currentDifsArr.length > 1) {
                newDifs.push(currentDifsArr)
            }
            currentDifsArr = []
        } else {
            currentDifsArr.push(difs[i])
        }
    }
    return newDifs.map((difs) => dp(difs, 0, 0)).reduce((acc, val) => acc * val)
}


const task1 = () => {
    const [dif1, dif3] = testAllAdapters()
    console.log(dif1 * dif3)
}

const task2 = () => {
    console.log(computeWays())
}

task1()
task2()
