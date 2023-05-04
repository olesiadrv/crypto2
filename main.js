const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const cipherData = fs.readFileSync("./key.json");
const { key, algorithm } = JSON.parse(cipherData);

// task 1

function encryptionFile() {
  const iv = crypto.randomBytes(8).toString("hex");
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const data = fs.readFileSync("./text.txt", "utf8");
  let crypted = cipher.update(data, "utf-8", "hex");
  crypted += cipher.final("hex");

  const temp = `${crypted}:${iv}`;
  fs.writeFileSync("./text.txt", temp, (err) => {
    if (err) throw err;
  });
  console.log("the file is encrypted");
}

// task 2

function decryptedFile() {
  const data = fs.readFileSync("./text.txt", "utf8");
  const [crypted, iv] = data.split(":");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(crypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  fs.writeFileSync("./text.txt", decrypted, (err) => {
    if (err) throw err;
  });
  console.log("the file is decrypted");
}

// task *

function encryption() {
  const iv = crypto.randomBytes(8).toString("hex");
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const data = fs.readFileSync("./text2.txt", "utf8");
  let crypted = cipher.update(data, "utf-8", "hex");
  crypted += cipher.final("hex");

  const temp = `${crypted}:${iv}`;
  const newFile = "text2.enc";
  fs.writeFileSync(newFile, temp, (err) => {
    if (err) throw err;
  });
  fs.unlink("./text2.txt", () => {});
  console.log("the file is encrypted");
}

// task *

function decrypted() {
  const data = fs.readFileSync("./text2.enc", "utf8");
  const [crypted, iv] = data.split(":");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(crypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  const newFile = "text2.txt";
  fs.writeFileSync(newFile, decrypted, (err) => {
    if (err) throw err;
  });
  fs.unlink("./text2.enc", () => {});
  console.log("the file is decrypted");
}

//encryptionFile();
//decryptedFile();
//encryption();
decrypted();
