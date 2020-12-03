/*
 * Title: Generator Password
 * Description: password generetor function
 * Author: Samin Yasar
 * Date: 02/December/2020
 */

// Module Scaffolding
const generator = {};

// Configuration
generator.config = {};

// Define the elements
const upperCaseEl = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseEl = "abcdefghijklmnopqrstuvwxyz";
const numberEl = "1234567890";
const characterEl = "!@{#$}%]^&[*_:;(-=)+/";

// function for uppercase
generator.upperCase = () => {
  return upperCaseEl[Math.floor(Math.random() * upperCaseEl.length)];
};

// function for lowercase
generator.lowerCase = () => {
  return lowerCaseEl[Math.floor(Math.random() * lowerCaseEl.length)];
};

// function for number
generator.number = () => {
  return numberEl[Math.floor(Math.random() * numberEl.length)];
};

// function for character
generator.character = () => {
  return characterEl[Math.floor(Math.random() * characterEl.length)];
};

// Base Function
generator.pwdGenerate = () => {
  const wantedLength = [12, 14, 16, 18];
  const randomNumber = Math.floor(Math.random() * wantedLength.length);
  const pwdLength = wantedLength[randomNumber];
  let password = "";
  for (let i = 0; i <= pwdLength; i++) {
    password += generator.upperCase();
    password += generator.lowerCase();
    password += generator.number();
    password += generator.character();
  }
  password = password.slice(0, pwdLength);
  return password;
};

// Export Module
module.exports = generator;
