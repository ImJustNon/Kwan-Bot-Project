const manager = require('../../handlers/manager.js');

module.exports = async(client) =>{
    client.on("voiceStateUpdate", async(oldState, newState) =>{
        let player = await manager.players.get(newState.guild.id);

        if(player){
            if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
            if (newState.id !== client.user.id) return;
            
            player.destroy();
            player.disconnect();
        }   
    });
}