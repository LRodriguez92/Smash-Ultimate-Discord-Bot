const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

let arena;
let pw;

bot.on('message', function(message, arendaId, password){
  userMessage = message.content.split(' ');
  callSmashBot = `${userMessage[0]} ${userMessage[1]}`;
  keywords = `${userMessage[0]} ${userMessage[1]} ${userMessage[2]}`;

  if (callSmashBot.toLowerCase() == 'smash bot') {
    if (userMessage.length > 2) {
      // Detect what command was said after calling smash bot
      if (userMessage[2].toLowerCase() == 'arena') {
        // if (userMessage.length == 5) {
        //   arena = userMessage[3];
        //   pw = userMessage[4];
        //   message.channel.send(`Arena created!\nArenaID: ${arena}\nPassword: ${pw}`);
        // } else if (userMessage.length > 5){
        //   message.channel.send('Error: Detected too many values. Please make sure you type the arenaID followed by the Password when creating an arena');
        // }
        message.channel.send('what\'s the ID and Password?');
      }
    } else {
      // if message is only 'smash bot' respond with instructions on how to use smash bot
      message.channel.send('Smash bot instructions');
    }
  }

});

bot.login(TOKEN);
