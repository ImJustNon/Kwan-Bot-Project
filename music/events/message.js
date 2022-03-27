const db = require('quick.db')
const setting = require('../../data/setting.js');

module.exports = {
    name: "message",
    exec: async (client, msg) => {
        if (!msg.guild) return;
        if (msg.author.bot) return;    
        
        let prefix;
        if (msg.author.bot || msg.channel.type === "dm") return;
            try {
                let fetched = await db.fetch(`prefix_${msg.guild.id}`);
                if (fetched == null) {
                    prefix = setting.mainbot.Prefix
                } else {
                    prefix = fetched
                }
            } catch (e) {
                console.log(e)
            };

        //const prefix = msg.content.startsWith(client.prefix) ? client.prefix : `<@!${client.user.id}>`;
        if (!msg.content.startsWith(prefix)) return;

        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        if (command) {
            try {
                let logchannel = require('../../log/musiclog.js');
                logchannel(client,msg,args,command)
                await command.exec(msg, args);
            } catch (e) {
                console.error(e);
            }
        }
    }
};
