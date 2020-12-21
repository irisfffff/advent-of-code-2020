const readFile = require('./inputReader')

const input = readFile('./resources/day21')
const allergenMap = new Map()

const processAllergen = (ingredients, allergen) => {
    if (!allergenMap.has(allergen)) {
        allergenMap.set(allergen, ingredients.slice())
    } else {
        const commonIngredients = allergenMap.get(allergen).filter(ingredient => ingredients.includes(ingredient))
        allergenMap.set(allergen, commonIngredients)
    }
}

const removeKnownIngredient = (ingredient, allergen) => {
    const iterator = allergenMap.entries()
    let mapEntry = iterator.next().value
    while (mapEntry) {
        const [key, value] = mapEntry
        const index = value.findIndex(item => item === ingredient)
        if (key !== allergen && index !== -1) {
            value.splice(index, 1)
        }
        mapEntry = iterator.next().value
    }
}

const task1 = () => {
    const ingredientsList = input.map(line => line.split(' (')[0].split(' '))
    const allergensList = input.map(line => line.split(' (')[1].slice(0, -1).split(' ').slice(1).map(item => item.replace(/,/g, ''))) // Remove word contains
    allergensList.forEach((allergens, idx) => {
        allergens.forEach(allergen => processAllergen(ingredientsList[idx], allergen))
    })

    const potentialAllergenIngredients = []
    const iterator = allergenMap.values()
    let currentIngredients = iterator.next().value
    while (currentIngredients) {
        potentialAllergenIngredients.push(...currentIngredients)
        currentIngredients = iterator.next().value
    }

    const nonAllergenIngredients = ingredientsList.flat().filter(ingredient => !potentialAllergenIngredients.includes(ingredient))
    console.log(nonAllergenIngredients.length)
    return [...new Set(potentialAllergenIngredients)]
}

const task2 = () => {
    const undecidedAllergenIngredients = task1()
    while (undecidedAllergenIngredients.length) {
        const iterator = allergenMap.entries()
        let mapEntry = iterator.next().value
        while (mapEntry) {
            const [allergen, ingredients] = mapEntry
            if (ingredients.length === 1 && undecidedAllergenIngredients.includes(ingredients[0])) {
                undecidedAllergenIngredients.splice(undecidedAllergenIngredients.findIndex(item => item === ingredients[0]), 1)
                removeKnownIngredient(ingredients[0], allergen)
            }
            mapEntry = iterator.next().value
        }
    }
    console.log(allergenMap)
    const sortedAllergenIngredients = new Map([...allergenMap.entries()].sort())
    console.log(sortedAllergenIngredients)
    const result = [...sortedAllergenIngredients.values()].join(',')
    console.log(result)
}

task2()