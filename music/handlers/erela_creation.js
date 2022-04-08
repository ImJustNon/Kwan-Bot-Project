const manager = require('./manager.js');

/**
 * 
 * @param {Client} client 
 */
module.exports = async(client) =>{
    require('./erela_handler.js')(client);
    require('./node_event.js')(client);
}