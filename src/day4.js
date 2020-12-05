const readFile = require('./inputReader')

const input = readFile('./resources/day4')

const properties = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const scanPassport = () => {
    const passports = []
    let newPassport = {}
    // let result = 0
    input.forEach((line) => {
        if (line === '') {
            passports.push(newPassport)
            newPassport = {}
        } else {
            line.split(' ').map((pair) => {
                const [key, value] = pair.split(':')
                newPassport[key] = value
            })
        }
    })
    passports.push(newPassport)
    return passports
}

const verifyPassport = (key, value) => {
    switch (key) {
        case 'byr':
            const byr = parseInt(value)
            if(value.length === 4 && byr && byr >= 1920 && byr <= 2002) {
                return true
            }
            return false
            break
        case 'iyr':
            const iyr = parseInt(value)
            if(value.length === 4 && iyr && iyr >= 2010 && iyr <= 2020) {
                return true
            }
            return false
            break
        case 'eyr':
            const eyr = parseInt(value)
            if(value.length === 4 && eyr && eyr >= 2020 && eyr <= 2030) {
                return true
            }
            return false
            break
        case 'hgt':
            const hgtPattern = /[1-9][0-9]+(cm|in)/
            if (value.match(new RegExp(hgtPattern, 'g'))) {
                const hgt = parseInt(value.slice(0, value.length - 2))
                if (hgt && value[value.length - 1] === 'm') {
                    if (hgt >= 150 && hgt <= 193) {
                        return true
                    }
                }
                if (hgt && value[value.length - 1] === 'n') {
                    if (hgt >= 59 && hgt <= 76) {
                        return true
                    }
                }
            }
            return false
            break
        case 'hcl':
            const hclPattern = /^#[0-9a-f]{6}$/g
            if (value.match(new RegExp(hclPattern))) {
                return true
            }
            return false
            break
        case 'ecl':
            const validecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
            if (validecl.includes(value)) {
                return true
            }
            return false
            break
        case 'pid':
            const pidPattern = /^[0-9]{9}$/g
            if (value.match(new RegExp(pidPattern))) {
                return true
            }
            return false
            break
        case 'cid':
            return true
        default:
            return false
    }
}

const task1 = () => {
    const passports = scanPassport()
    const withAllRequirdFields = passports.filter((passport) => properties.map((property) => property in passport).every(value => value === true))
    console.log(withAllRequirdFields.length)
}

const task2 = () => {
    let result = 0
    const passports = scanPassport()
    const withAllRequirdFields = passports.filter((passport) => properties.map((property) => property in passport).every(value => value === true))
    withAllRequirdFields.forEach((passport) => {
        if (Object.entries(passport).map((entry) => verifyPassport(...entry)).every(value => value === true))
            result++
    })
    console.log(result)
}

task1()
task2()