const readFile = require('./inputReader')

const input = readFile('./resources/day1').map(x => parseInt(x))
input.sort((a, b) => a - b)

// Original solution O(n^3)
// const find2020 = () => {
//     let entry1, entry2
//     for (let i = 0; i < input.length; i++) {
//         entry1 = input[i]
//         let j = i + 1
//         for (; j < input.length; j++) {
//             entry2 = input[j]
//             if (entry1 + entry2 > 2020) {
//                 continue
//             }
//             if (input.slice(j + 1).includes(2020 - entry1 - entry2)) {
//                 break
//             }
//         }
//         if (j < input.length) {
//             break
//         }
//     }
//     console.log(entry1 * entry2 * (2020 - entry1 - entry2))
// }

const findSum = (sum) => {
    // For each potential entry1 get desired entry2, descending
    const entry2 = input.map((value) => sum - value)
    let i = 0 // Search cursor in input
    let j = input.length - 1 // Search cursor in entry2
    while(true) {
        if ( i >= input.length || j < 0) {
            break
        }
        if (input[i] === entry2[j] && i !== j) {
            break
        } else if (input[i] <= entry2[j]) {
            i++
        } else if (input[i] >= entry2[j]) {
            j--
        }
    }
    return [i, j]
}

const task1 = () => {
    const [i, j] = findSum(2020)
    console.log(input[i] * input[j])
}

const task2 = () => {
    // For each potential entry3 get desired sum of entry 1 and 2, descending
    const restSumArr = input.map((value) => 2020 - value)
    let k = 0
    let i, j
    for(; k < input.length; k++) {
        [i, j] = findSum(restSumArr[k])
        if (k !== i && k !== j && i < input.length && j >= 0) {
            break
        }
    }
    console.log(input[i] * input[j] * input[k])
}

task1()
task2()