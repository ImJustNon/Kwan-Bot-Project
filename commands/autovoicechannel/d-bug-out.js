const { Database } = require("quickmongo");
const db = require('../../database/quickmongo.js');

module.exports = {
    config: {
        name: '_out',
        aliases: [],
    },
    run: async(bot, message, args) => {
        const out = await db.delete(`chatbot_${message.guild.id}`);
        console.log('success')
    }
}