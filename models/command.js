const { Schema, model } = require('mongoose');

let Schema = new Schema({
    Guild: String,
    Cmds: Array
});

module.exports = model('example',Schema);