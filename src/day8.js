const readFile = require('./inputReader')

const input = readFile('./resources/day8')

const executeInstruction = (operation, argument, acc, idx) => {
    switch (operation) {
        case 'acc':
            acc += argument
        case 'nop':
            idx += 1
            break
        case 'jmp':
            idx += argument
            break
    }
    return [acc, idx]
}

const bootCode = (instructions) => {
    let acc = 0
    let idx = 0
    const visited = Array(instructions.length).fill(false)
    while(true) {
        if (visited[idx]) {
            break
        }
        visited[idx] = true
        const instruction = instructions[idx]
        const operation = instruction.slice(0, 3)
        const argument = parseInt(instruction.slice(4))
        const result = executeInstruction(operation, argument, acc, idx)
        acc = result[0]
        idx = result[1]
        if (idx === instructions.length) {
            break
        }
    }
    return [acc, idx]
}

const task1 = () => {
    console.log(bootCode(input)[0])
}

const task2 = () => {
    let acc = 0
    for (let i = 0; i < input.length; i++) {
        const instructions = input.slice()
        const operation = instructions[i].slice(0, 3)
        if (operation === 'acc') {
            continue
        } else if (operation === 'nop') {
            instructions[i] = 'jmp' + instructions[i].slice(3)
        } else {
            instructions[i] = 'nop' + instructions[i].slice(3)
        }
        const result = bootCode(instructions)
        if (result[1] === input.length) {
            acc = result[0]
            break
        }
    }
    console.log(acc)
}

task1()
task2()
