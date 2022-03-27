const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const setting = require('../data/setting.js');
const chalk = require('chalk');
const connect = require('connect');

const port = setting.website.port;

module.exports = async(client) => {

    //express.static(__dirname + '/css/styles.css')


    app.set("view engine", "html");
    app.set("views", path.join(__dirname, "views"));

    router.get('/',function(req,res){
        res.sendFile(path.join(__dirname+'/source/index.html'));
    });

    router.get('/index.html',function(req,res){
        res.sendFile(path.join(__dirname+'/source/index.html'));
    });
      
    router.get('/commands.html',function(req,res){
        res.sendFile(path.join(__dirname+'/source/commands.html'));
    });

    app.get('/script/lib/cursor.js', (req,res) => {
        res.sendFile(path.join(__dirname+'/source/script/lib/cursor.js'));
    });

    app.get('/script/lib/app.js', (req,res) => {
        res.sendFile(path.join(__dirname+'/source/script/lib/app.js'));
    });

    app.get('/css/styles.css', (req, res) => {
        res.sendFile(path.join(__dirname+'/source/css/styles.css'));
    });
            
    app.use('/', router);
    app.listen(port);
              

    console.log(chalk.cyan.bold('[Web-Server]') + chalk.green.bold(' ------------ [Web-Server] ------------'));
    console.log(chalk.cyan.bold('[Web-Server]') + chalk.white.bold(` Web-Server For ${client.user.tag} `));
    console.log(chalk.cyan.bold('[Web-Server]') + chalk.white.bold(' Now Running On ') + chalk.yellow.bold(`http://localhost:${port}/`));
    console.log(chalk.cyan.bold('[Web-Server]') + chalk.green.bold(' ------------ [Web-Server] ------------'));
}