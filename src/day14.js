const readFile = require('./inputReader')

const input = readFile('./resources/day14')
let memory = {}

const readMask = (mask) => {
    const mask0 = []
    const mask1 = []
    const maskX = []
    mask.split('').forEach((item, idx) => {
        switch (item) {
            case '0':
                mask0.push(idx)
                break
            case '1':
                mask1.push(idx)
                break
            case 'X':
                maskX.push(idx)
                break
            default:
                break
        }
    })
    return [mask0, mask1, maskX]
}

const writeFloating = (floating, pos, val) => {
    if (floating.length === 0) {
        memory[parseInt(pos, 2)] = val
        return
    }
    writeFloating(floating.slice(1), pos.slice(0, floating[0]) + '0' + pos.slice(floating[0] + 1), val)
    writeFloating(floating.slice(1), pos.slice(0, floating[0]) + '1' + pos.slice(floating[0] + 1), val)
    return
}

const task1 = () => {
    memory = {}
    let mask0 = []
    let mask1 = []
    const frontZero = '0'
    input.forEach((item) => {
        if(item.startsWith('mem')) {
            const pos = parseInt(item.slice(4).split(']')[0])
            let val = parseInt(item.split('=')[1].trim()).toString(2)
            val = frontZero.repeat(36 - val.length) + val
            mask0.forEach((idx) => {
                val = val.slice(0, idx) + '0' + val.slice(idx + 1)
            })
            mask1.forEach((idx) => {
                val = val.slice(0, idx) + '1' + val.slice(idx + 1)
            })
            memory[pos] = parseInt(val, 2)
        } else if (item.startsWith('mask')) {
            [mask0, mask1] = readMask(item.split('=')[1].trim())
        }
    })
    console.log(Object.values(memory).reduce((acc, val) => acc + val))
}

const task2 = () => {
    memory = {}
    let mask1 = []
    let maskX = []
    const frontZero = '0'
    input.forEach((item) => {
        if(item.startsWith('mem')) {
            let pos = parseInt(item.slice(4).split(']')[0]).toString(2)
            const val = parseInt(item.split('=')[1].trim())
            pos = frontZero.repeat(36 - pos.length) + pos
            mask1.forEach((idx) => {
                pos = pos.slice(0, idx) + '1' + pos.slice(idx + 1)
            })
            writeFloating(maskX, pos, val)
        } else if (item.startsWith('mask')) {
            [, mask1, maskX] = readMask(item.split('=')[1].trim())
        }
    })
    console.log(Object.values(memory).reduce((acc, val) => acc + val))
}

task1()
task2()