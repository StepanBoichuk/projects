const chalk = require("chalk")

const info = (product, version) => {
    console.log(chalk.green("Вы успешно обновили " + product + " До версии " + version))
}

const warn = (symbol, line) => {
    console.log(chalk.yellow("Пропущен " + symbol + " на линии " + line))
}

const error = (nickname, isindatabase) => {
    if (isindatabase == true) {
        console.log(chalk.red("Ошибка! Никнейм " + nickname + " уже занят"))
    }
}

module.exports = {
    info,
    warn,
    error
}