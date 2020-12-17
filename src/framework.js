const Discord = require("discord.js");

class Bot {
  _isRunning = false
  _options = {}
  _middleware = []
  _commands = {}

  constructor(prefix, token, options) {
    this._prefix = prefix;
    this._token = token;
    this._client = new Discord.Client();
    if(options) {
      this._options = options;
    }
  }

  use(middleware) {
    this._middleware.push(middleware)
  }

  addCommand(command) {
    this._commands[command._commandString] = command.exec
  }

  run() {
    if(this._isRunning === true) {
      console.warn("Bot is already running...")
      return
    }

    if(this._options.onReady) {
      this._client.on("ready", this._options.onReady)
    }

    this._client.on("message", async (message) => {
      if(message.author.bot && this._options.allowBotToBotInteraction !== true) return;

      this._middleware.forEach(mw => mw.exec(message))

      if(message.content.startsWith(this._prefix)) {
        const cmd = message.content.split(' ')[1];
        if(this._commands[cmd]) {
          this._commands[cmd](message)
        }
      }
    })

    this._client.login(this._token)
    this._isRunning = true;
  }
}

module.exports = Bot