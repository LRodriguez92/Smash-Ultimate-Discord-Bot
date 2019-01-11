const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('message', function(message){
  if (message.content == 'Hello') {
    message.reply('Hello there')
  }
});
