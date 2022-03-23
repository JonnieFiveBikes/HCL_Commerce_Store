/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

const minimist = require("minimist");
const { spawn } = require("child_process");

const opts = {
  //defaults
  string: ["username", "password"],
  default: {
    username: "",
    password: "",
  },
};

const cmdArgs = minimist(process.argv.slice(2), opts);

if (cmdArgs.username === "" || cmdArgs.password === "") {
  throw new Error("Missing username, password");
}

const gitClone = spawn("git", [
  "clone",
  `https://${cmdArgs.username}:${cmdArgs.password}@github01.hclpnp.com/commerce-dev/test-react-store-ui.git`,
  "e2e",
]);

gitClone.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

gitClone.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

gitClone.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
