const chalk = require("chalk")

const info = (mes) => {
    console.log(chalk.green(mes))
}

const warn = (mes) => {
    console.log(chalk.yellow(mes))
}

const error = (mes) => {
        console.log(chalk.red(mes))
}

module.exports = {
    info,
    warn,
    error
}
