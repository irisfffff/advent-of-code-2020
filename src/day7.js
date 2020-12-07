const readFile = require('./inputReader')

const input = readFile('./resources/day7')

const processParent = () => {
    const graph = {}
    input.forEach((line) => {
        const regex = /bags?/gi
        const [parent, children] = line.slice(0, line.length - 1).replace(regex, '').split(' contain ').map((item) => item.trim())
        const childArray = children.split(',')
        if (!graph[parent]) {
            graph[parent] = []
        }
        childArray.forEach((item) => {
            const child = item.trim()
            if(child !== 'no other') {
                const amount = parseInt(child[0])
                const bagType = child.slice(1).trim()
                if (!graph[bagType]) {
                    graph[bagType] = []
                }
                const node = {}
                node.parent = parent
                node.amount = amount
                graph[bagType].push(node)
            }
            return
        })
    })
    let result = 0
    if (graph['shiny gold']) {
        const parentArray = graph['shiny gold'].map((node) => node.parent)
        const countedBags = []
        while (parentArray.length) {
            if (!countedBags.includes(parentArray[0])) {
                if (graph[parentArray[0]]) {
                    parentArray.push(...graph[parentArray[0]].map((node) => node.parent))
                }
                countedBags.push(parentArray[0])
                result ++
            }
            parentArray.shift()
        }
    }
    return result
}

const processChild = () => {
    const graph = {}
    input.forEach((line) => {
        const regex = /bags?/gi
        const [parent, children] = line.slice(0, line.length - 1).replace(regex, '').split(' contain ').map((item) => item.trim())
        const childArray = children.split(',')
        graph[parent] = []
        childArray.forEach((item) => {
            const child = item.trim()
            if(child !== 'no other') {
                const amount = parseInt(child[0])
                const bagType = child.slice(1).trim()
                const node = {}
                node.child = bagType
                node.amount = amount
                graph[parent].push(node)
            }
            return
        })
    })

    let result = 0
    if (graph['shiny gold']) {
        const childArray = graph['shiny gold']
        while(childArray.length) {
            result += childArray[0].amount
            if (graph[childArray[0].child] && graph[childArray[0].child].length) {
                const parentAmount = childArray[0].amount
                childArray.push(...graph[childArray[0].child].map((node) => {
                    return { child: node.child, amount: node.amount * parentAmount }
                }))
            }
            childArray.shift()
        }
    }
    return result
}

const task1 = () => {
    console.log(processParent())
}

const task2 = () => {
    console.log(processChild())
}

// task1()
task2()
