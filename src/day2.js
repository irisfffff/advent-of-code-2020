const readFile = require('./inputReader')

const input = readFile('./resources/day2')

const countValidPwd = (rule) => {
    let result = 0
    input.forEach((policy) => {
        const res = policy.split(' ')
        const [val1, val2] = res[0].split('-').map((x) => parseInt(x))
        const letter = res[1][0]
        const pwd = res[2]
        if (rule(val1, val2, letter, pwd)) {
            result++
        }
    })
    return result
}

const task1 = () => {
    const rule = (val1, val2, letter, pwd) => {
        const count = (pwd.match(new RegExp(letter, 'g')) || []).length;
        return count >= val1 && count <= val2
    }
    console.log(countValidPwd(rule))
}

const task2 = () => {
    const rule = (val1, val2, letter, pwd) => (pwd[val1-1] === letter && pwd[val2-1] !== letter) || (pwd[val1-1] !== letter && pwd[val2-1] === letter)
    console.log(countValidPwd(rule))
}

task1()
task2()