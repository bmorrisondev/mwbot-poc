const Bot = require("./framework")
const HelloWorldCommand = require('@brianmmdev/mwbot-poc-helloworld')
const Logger = require('@brianmmdev/mwbot-poc-logger')

const token = "YOUR_TOKEN_HERE"

const bot = new Bot("!mwbot", token);

// Middleware is run on every single message
bot.use(new Logger())

// Commands are processed individually using a map inside the Bot class
bot.addCommand(new HelloWorldCommand())

bot.run()
