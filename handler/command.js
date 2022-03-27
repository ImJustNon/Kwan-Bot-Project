const { readdirSync } = require("fs");
const chalk = require("chalk");


module.exports = (bot) => {
  const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
      let pull = require(`../commands/${dirs}/${file}`);
      console.log(chalk.yellow.bold(`[Main-Client] `) + chalk.magenta.bold(`Loading command : `) + chalk.cyan.bold(`${file}`));
      bot.commands.set(pull.config.name, pull);
      if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
    };
  };
  [
    'info',
    'edit-image',
    'disgames',
    'secret',
    'tools',
    'search',
    'meme-gif-image',
    'nsfw',
    'nsfw2',
    'rp-nsfw',
    'porn',
    'edit-image2',
    'moderation',
    'doujin',
    'random',
    'customcommands',
    'autovoicechannel',
    'commands-toggle',
    'serverstats',
    'chatbot',
    'xp',
    'cmdCHsetup',
    'fun',
    'captcha',
    'welcome',
    'goodbye',
  ].forEach(x =>{ 
    load(x)
  }); 
};