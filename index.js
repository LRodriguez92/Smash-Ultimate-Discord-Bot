const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const specialChar = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);


bot.on('message', function(message){
  const messageUser = message.member.user.username;
  let userMessage = message.content.split(' ')
  let callSmashBot = userMessage[0];
  let command = userMessage[1];

  if (callSmashBot.toLowerCase() == '!smash') {
    if (userMessage.length >= 2) {
      // Insert command functions here
      arenaCommand();
    } else {
      // if message is only '!smash' respond with instructions on how to use smash bot
      message.channel.send('Smash bot instructions');
    }
  }

  function arenaCommand() {
    if (command.toLowerCase() == 'arena') {
      let arena, pw;
      if (userMessage.length == 4) {
        arena = userMessage[2];
        pw = userMessage[3];
        if (arena.length > 5) {
          message.channel.send(`Invalid Arend [ID]! Too many characters`);
        } else if (arena.length < 5) {
          message.channel.send(`Invalid Arena [ID]! Not enough characters`);
        } else if (specialChar.test(arena)){
          message.channel.send(`Invalid Arena [ID]! You know damn well you can't use special characters in an [ID]`)
        } else {
          message.channel.send(`Arena created!\nArenaID: ${arena}\nPassword: ${pw}`);
        }
      } else if (userMessage.length > 4) {
        message.channel.send('Too many values, human! I only need the arena [ID] followed by the [Password] when creating an arena');
      } else if (userMessage.length == 3) {
        message.channel.send('No password detected! If you wish to not have a password, enter \'open\' as your [Password]');
      } else {
        message.channel.send('To use the <arena> command, type: !smash arena [ID] [Password]');
      }
    } else {
      message.channel.send(`You fool! The <${command}> command does not exist!`)
    }
  }

});

bot.login(TOKEN);
