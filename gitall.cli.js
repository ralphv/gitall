#!/usr/bin/env node

//region requires
const fs = require("fs");
const path = require("path");
const child_process = require('child_process');
//endregion

//region variables
const cmdArguments = process.argv.slice(2).join(" ");
var errors = 0;
//endregion

//region functions
function pause() {
  console.log("\r\n \x1b[4m\x1b[33m%s\x1b[0m", "< PRESS ENTER TO CONTINUE >");
  child_process.spawnSync("read _ ", {shell: true, stdio: [0, 1, 2]});
}

function execGit(cwd) {
  if(!cmdArguments) {
    return;
  }
  try {
    child_process.execSync("git " + cmdArguments, {stdio: [0, 1, 2], cwd: cwd});
  }
  catch(e) {
    errors++;
    pause();
  }
}

function traverseFolders(cwd) {
  const dirs = fs.readdirSync(cwd);
  dirs.forEach(function(dir) {
    dir = path.join(cwd, dir);
    var stat = fs.lstatSync(dir);
    if(stat.isDirectory() && !stat.isSymbolicLink()) {
      processDirectory(dir);
      traverseFolders(dir);
    }
  });
}

function processDirectory(dir) {
  if(fs.existsSync(path.join(dir, ".git"))) {
    processRepo(dir);
  }
}

function processRepo(dir) {
  //http://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  console.log("\x1b[4m\x1b[1m\x1b[33m%s\x1b[0m", "git repo:", "[", path.relative(cwd, dir), "]");
  execGit(dir);
  console.log();
}
//endregion

// main:
const cwd = process.cwd();
traverseFolders(cwd);
if(errors) {
  console.error("\x1b[1m\x1b[31m%s\x1b[0m", "gitall total errors:", errors, "\r\n");
}
