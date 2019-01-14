const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const specialChar = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
const arenas = [];


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
      message.channel.send('Greetings human! I\'m the smash bot!\nTo run a <Command> type "!Smash" followed by a <Command> and the [Values] required.\nIf you need <Command> specific instructions type "!Smash" followed by the <Command>: \n\n__Example__:  !Smash Arena SFJ3C 1234 \n\n__COMMAND__                   __VALUES__\n\n <Arena>           [ID] [Password] / Show / Close');
    }
  }


  function arenaCommand() {
    if (command.toLowerCase() == 'arena') {
      let arena, password;
      if (userMessage.length == 4) {
        arena = userMessage[2];
        password = userMessage[3];
        if (arena.length > 5) {
          message.channel.send(`Invalid Arend [ID]! Too many characters.`);
        } else if (arena.length < 5) {
          message.channel.send(`Invalid Arena [ID]! Not enough characters.`);
        } else if (specialChar.test(arena)){
          message.channel.send(`Invalid Arena [ID]! You know damn well you can't use special characters in an [ID].`)
        } else if (password.length > 8){
          message.channel.send(`Invalid [Password]! Passwords can't exceed 8 characters!`);
        } else if (specialChar.test(password) || isNaN(password)){
          message.channel.send(`Invalid [Password]! Passwords can only be numbers genius!`)
        } else {
          // Save and create arena info
          if (arenas.length == 0) {
            arenas.push({user: messageUser, arena: arena, password: password});
            setInterval(closeArena, 18000000);
            message.channel.send(`\n${messageUser} created an arena:\n\n[Arena ID]: ${arena}\n[Password]: ${password}`);
          } else {
            arenas.map(currentArena => {
              if (messageUser == currentArena.user) {
                currentArena.arena = arena;
                currentArena.password = password;
                setInterval(closeArena, 18000000);
                message.channel.send(`\n${messageUser} updated their arena:\n\n[Arena ID]: ${arena}\n[Password]: ${password}`);
              } else {
                arenas.push({user: messageUser, arena: arena, password: password});
                setInterval(closeArena, 18000000);
                message.channel.send(`\n${messageUser} created an arena:\n\n[Arena ID]: ${arena}\n[Password]: ${password}`);
              }
            });
          }
        }
      } else if (userMessage.length > 4) {
        // If there are too many values after arena command
        message.channel.send('Too many values, human! I only need the arena [ID] followed by the [Password] when creating an arena.');
      } else if (userMessage.length == 3 && userMessage[2].toLowerCase() != 'show' && userMessage[2] != 'close' && userMessage[2].length == 5) {
        // If the user did not input a password
        message.channel.send('No password detected! If you wish to not have a password, enter \'open\' as your [Password].');
      } else if (userMessage.length == 3 && userMessage[2].toLowerCase() == 'show') {
        // Show current arenas
        if (arenas.length == 0) {
          message.channel.send(`No arenas open at the moment. Feel free to create one.`)
        } else {
          // Shows all open arenas
          message.channel.send('Current arena(s) open:');
          arenas.map(currentArena => {
            message.channel.send(`\n${currentArena.user}'s arena:\n\n[Arena ID]: ${currentArena.arena}\n[Password]: ${currentArena.password}\n\n-----------------------------------------`);
          });
        }
      } else if (userMessage.length == 3 && userMessage[2].toLowerCase() == 'close') {
        // Close arena the user has created
        if (arenas.length == 0) {
          message.channel.send(`There are no open arenas.`)
        } else {
          // Finds the user's arena and closes it
          message.channel.send(`${messageUser}'s arena has been closed.`);
          let i = 0;
          arenas.map(currentArena => {
            if (currentArena.user == messageUser) {
              arenas.splice(i, 1);
            } else {
              i++;
            }
          });
        }
      }  else {
        // Instructions for arena command
        message.channel.send('Users can create an arena, view all available arenas, and close their current arena using the <Arena> command. If you already have an arena open and create a new one, your previously created arena will be updated. Below are the [Values] you can use with the <Arena> command, and what they are used for.\n\n__VALUES__                   __RESULT__\n\n[ID][Password] Creates arena\nShow                   Shows all available arenas \nClose                   Closes arena you have created\n\n__Examples__:\n!Smash Arena S2DI4 1234\n!Smash Arena Show\n!Smash Arena Close\n\nP.S. Remember to close your arena when you are done!');
      }
    } else {
      message.channel.send(`You fool! The <${command}> command does not exist!`)
    }
  }
  function closeArena() {
    if (arenas.length == 0) {
      return;
    } else {
      // Finds the user's arena and closes it
      let i = 0;
      arenas.map(currentArena => {
        if (currentArena.user == messageUser) {
          message.channel.send(`${messageUser}'s arena has been closed.`);
          arenas.splice(i, 1);
        } else {
          i++;
        }
      });
    }
  }
});

bot.login(TOKEN);
