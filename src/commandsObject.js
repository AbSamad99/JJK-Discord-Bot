//all art commands
const addArtCharacterCommand = require('./Commands/Art/addArtCharacterCommand');
const addArtCommand = require('./Commands/Art/addArtCommand');
const editArtCharacterCommand = require('./Commands/Art/editArtCharacterCommand');
const getArtNamesCommand = require('./Commands/Art/getArtNamesCommand');
const getArtCommand = require('./Commands/Art/getArtCommand');
const removeArtCharacterCommand = require('./Commands/Art/removeArtCharacterCommand');
const removeArtCommand = require('./Commands/Art/removeArtCommand');

//all debate commands
const debateCommand = require('./Commands/Debate/debateCommand');
const addDebateCharacterCommand = require('./Commands/Debate/addDebateCharacterCommand');
const removeDebateCharacterCommand = require('./Commands/Debate/removeDebateCharacterCommand');
const editDebateCharacterCommand = require('./Commands/Debate/editDebateCharacterCommand');
const getDebateNamesCommand = require('./Commands/Debate/getDebateNamesCommand');

//all emote commands
const addEmoteCommand = require('./Commands/Emote/addEmoteCommand');
const archiveEmoteCommand = require('./Commands/Emote/archiveEmoteCommand');
const deleteEmoteCommand = require('./Commands/Emote/deleteEmoteCommand');
const editEmoteCommand = require('./Commands/Emote/editEmoteCommand');

//all bot message commands
const botMessageCommand = require('./Commands/Messaging/botMessageCommand');
const botEmbedMessageCommand = require('./Commands/Messaging/botEmbedMessageCommand');

//all moderation commands
const banCommand = require('./Commands/Moderation/banCommand');
const kickCommand = require('./Commands/Moderation/kickCommand');
const muteCommand = require('./Commands/Moderation/muteCommand');
const unMuteCommand = require('./Commands/Moderation/unmuteCommand');
const strikeCommand = require('./Commands/Moderation/strikeCommand');
const unstrikeCommand = require('./Commands/Moderation/unStrikeCommand');
const purgeCommand = require('./Commands/Moderation/purgeCommand');

//all misc commands
const chapterAnnouncement = require('./Commands/Other/chapterAnnouncement');
const strikeCountCommand = require('./Commands/Other/strikeCountCommand');
const suggestionCommand = require('./Commands/Other/suggestionCommand');
const helpCommand = require('./Commands/Other/helpCommand');
const miscCommands = require('./Commands/Other/miscCommands');

//all role commands
const roleAssignCommand = require('./Commands/Role/roleAssignCommand');
const roleListCommand = require('./Commands/Role/roleListCommand');

//all welcome commands
const welcomeCommands = require('./Commands/Other/welcomeCommands');

//seed command
const seedUsers = require('./Helpers/seeder');
const unBanCommand = require('./Commands/Moderation/unbanCommand');

module.exports = {
  addart: addArtCommand,
  addartchar: addArtCharacterCommand,
  help: helpCommand,
  editartchar: editArtCharacterCommand,
  getartnames: getArtNamesCommand,
  getart: getArtCommand,
  remartchar: removeArtCharacterCommand,
  remart: removeArtCommand,
  debate: debateCommand,
  adddebchar: addDebateCharacterCommand,
  remdebchar: removeDebateCharacterCommand,
  editdebchar: editDebateCharacterCommand,
  getdebnames: getDebateNamesCommand,
  addemote: addEmoteCommand,
  archiveemote: archiveEmoteCommand,
  deleteemote: deleteEmoteCommand,
  editemote: editEmoteCommand,
  message: botMessageCommand,
  embedmessage: botEmbedMessageCommand,
  ban: banCommand,
  unban: unBanCommand,
  kick: kickCommand,
  mute: muteCommand,
  unmute: unMuteCommand,
  strike: strikeCommand,
  unstrike: unstrikeCommand,
  purge: purgeCommand,
  chapter: chapterAnnouncement,
  strikecount: strikeCountCommand,
  suggest: suggestionCommand,
  role: roleAssignCommand,
  rolelist: roleListCommand,
  todo: welcomeCommands,
  welcome: welcomeCommands,
  shy: welcomeCommands,
  guy: welcomeCommands,
  wiki: miscCommands,
  chart: miscCommands,
  catalogue: miscCommands,
  prequel: miscCommands,
  fujo: miscCommands,
  encyclopedia: miscCommands,
  seed: seedUsers,
};
