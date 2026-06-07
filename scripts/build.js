import { execSync } from "node:child_process";
import fs from "node:fs";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

function copyDir(source, target) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

console.log("Installing demo1 dependencies...");
run("npm install --prefix demo1");

console.log("Installing demo2 dependencies...");
run("npm install --prefix demo2");

console.log("Building demo1...");
run("npm run build --prefix demo1");

console.log("Building demo2...");
run("npm run build --prefix demo2");

console.log("Creating public output folder...");
fs.rmSync("public", { recursive: true, force: true });

copyDir("demo1/dist", "public/demo1");
copyDir("demo2/dist", "public/demo2");

console.log("Build complete.");