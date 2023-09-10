const { Schema, model } = require('mongoose');

let schema = new Schema({
    Guild: String,
    Cmds: Array
});

module.exports = model('example',schema);