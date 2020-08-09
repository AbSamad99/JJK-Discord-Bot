/*Function to handle the help command*/

const { MessageEmbed } = require('discord.js');

const helpCommand = (msg) => {
  let helpEmbed = new MessageEmbed();

  if (
    msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
    msg.member.roles.cache.has('447512449248395267') /*admin role*/
  ) {
    helpEmbed
      .setTitle('**List of commands for the server staff**')
      .setDescription(
        `Commands the server staff are split into the following categories:
1. Art Commands
2. Debate Commands
3. Emote Commands
4. Messaging Commands
5. Moderation Commands
6. Role Commands
7. Welcome Commands
8. Other Commands`
      )
      .addField(
        '**__Art Commands:__**',
        `The art commands are as follows:

Command to add an art link for a character:
> -addart <characterName> <links(links must be seperated by a space)>

Command to remove an art link for a character:
> -remart <characterName> <link(only one)>

Command to get random link for a character:
> -getart <characterName>

Command to gat all links for a character:
> -getallart <characterName>

Command to get list of all the characters along with the number of links for each character:
> -getartnames

Command to add a character to the database:
> -addartchar <characterName>

Command to remove a character from the database:
> -remartchar <characterName>

Command to edit a characters name in the database:
> -editartchar <characterName>`
      )
      .addField(
        '**__Debate Commands__**',
        `The debate commands are as follows:
      
Command to start a debate:
> -debate
      
Command to get list of all the characters:
> -getdebnames
      
Command to add a character to the database:
> -adddebchar <characterName>
      
Command to remove a character from the database:
> -remdebchar <characterName>
      
Command to edit a characters name in the database:
> -editdebchar <characterName>`
      )
      .addField(
        '**__Emote Commands__**',
        `The emote commands are as follows:

Command to add emote:
> -addemote <name> <link>
Note: If you do not have a link, you can add an image as attachment along with the command
        
Command to delete emote:
> -deleteemote <emote>
        
Command to edit emote name:
> -editemote <emote> <new name> 
        
Command to archive emote:
> -archiveemote <emote>`
      )
      .addField(
        '**__Bot Messaging Commands__**',
        `The bot message commands are as follows

Bot message command:
> -message <channel> <message>

Bot Embedded Message:
> -embedmessage <channel>
> [type::<type of message>]
> [title::<title>]
> [description::<Body of the message>]
> [thumbnail::<link>]
> [fields::{fieldTitle1--abc1}{fieldTitle2--abc2}{fieldTitle3--abc3}]
> [image::<link>]
**Important! Don't ignore the following points:**
1. The various types are: general, announcement(pings everyone), server event(pings server events role)
2. Thumbnail must be a link. If you do not have any link to provide, just put null.
3. We can have upto 25 fields. If fields are unneeded, just say null
4. Image must be a link. If you do not have any link to provide, just say null. Alternatively you can upload a picture and put in null in the image field
5. Make sure you dont have any '{' or '[' or '--'(includes the message striking syntax) or '::' and '--' in your fields or description. this will result in command failing`
      )
      .addField(
        '**__Moderation Commands__**',
        `The moderation commands are as follows:

Command to ban users:
> -ban <tag user here> <reason> 
      
Command to kick users:
> -kick <tag user here> <reason>
      
Command to mute users:
> -mute <tag user here> <number> <time> <reason>
      
Command to issue strikes to users:
> -strike <tag user here> <reason>
      
Command to purge messages:
> -purge <number>`
      )
      .addField(
        '**__Role Commands__**',
        `The role commands are as follows:
      
Command to assign a character role:
> -role <CharName>

Command to list all assignable roles:
> -rolelist`
      )
      .addField(
        '**__Welcome Commands',
        `The welcome commands are as follows:
Command for the welcome questions:
> -welcome

Command for the todo question:
> -todo

Command for the shy panel:
> -shy

Command for the guy panel:
> -guy`
      )
      .addField(
        '**__Other Commands__**',
        `The other misc commands are as follows:

Command for the chapter announcement:
> -chapter <chapNo> <vizLink> <mplusLink>

Command to get the number of strikes a user may have:
> -strikecount <tag user here or provide id>
Note: tagging user is optional, not providing it will get the strikes of the person who input the command

>Command to provide a suggestion:
> -suggest <your suggestion body>
Note: A single image can also be provided but it must be attached to the message in which the command is issued. The body of the suggestion must have at least 10 words`
      );
  } else if (
    !(msg.channel.id === '447513472427622410') /*bot commands channel*/
  ) {
    helpEmbed
      .setTitle('**List of commands for users**')
      .setDescription(
        `Commands for user are split into the following categories:
1. Art Commands
2. Debate Commands
3. Role Commands
4. Welcome Commands
5. Other Commands`
      )
      .addField(
        '**__Art Commands:__**',
        `The art commands are as follows:

Command to add an art link for a character:
> -addart <characterName> <links(links must be seperated by a space)>
Note: Only for people with the community role

Command to remove an art link for a character:
> -remart <characterName> <link(only one)>
Note: Only for people with the community role

Command to get random link for a character:
> -getart <characterName>

Command to get list of all the characters along with the number of links for each character:
> -getartnames`
      )
      .addField(
        '**__Debate Commands__**',
        `The debate commands are as follows:
  
Command to start a debate:
> -debate
  
Command to get list of all the characters:
> -getdebnames`
      )
      .addField(
        '**__Role Commands__**',
        `The role commands are as follows:
  
Command to assign a character role:
> -role <CharName>

Command to list all assignable roles:
> -rolelist`
      )
      .addField(
        '**__Welcome Commands__**',
        `The welcome commands are as follows:

Command for the welcome questions:
> -welcome

Command for the todo question:
> -todo

Command for the shy panel:
> -shy

Command for the guy panel:
> -guy`
      )
      .addField(
        '**__Other Commands__**',
        `The other misc commands are as follows:

Command to get the number of strikes a user may have:
> -strikecount <tag user here>
Note: tagging user is optional, not providing it will get the strikes of the person who input the command

>Command to provide a suggestion:
> -suggest <your suggestion body>
Note: A single image can also be provided but it must be attached to the message in which the command is issued. The body of the suggestion must have at least 10 words`
      );
  }

  msg.channel.send(helpEmbed).catch(console.log);
};

module.exports = helpCommand;
