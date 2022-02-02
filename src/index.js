#!/usr/bin/env node

//I coded this when I felt down. Alot of stuff has been happening
//affecting me mentally. This project made me forget whatever was going on and made the nights I worked on this feel like a peace and safe space
//I really hope either you can learn from this code or help me and others by ... the code. It will addup on your worth. Know what you are worth and follow your goals.
//Easier said than done. But better to do and not. -TRS.g

/*
 TODO:

 DONE: 1. Somehow get words from somewhere

 DONE: 2. Allow for user input

 3. Check if the letters are in the word

 4. check if the letters are in the word and in the right place

 5. make it terminal only for the real people *insert sunglasses emoji*
 TODO
 */

//variable dumb

//node\\
const term = require('terminal-kit').terminal;
const config = require("./config.json");
const request = require('request');

//code\\
let word;
let letters = [];
let guessLetters = [];

//ROVA's function Milieubrengstation. //function dump
function showSplash() {
    //art :,)
    const splash = "" +
        "░██╗░░░░░░░██╗░█████╗░██████╗░██████╗░██╗░░░░░███████╗░████████╗███████╗██████╗░███╗░░░███╗██╗███╗░░██╗░█████╗░██╗░░░░░\n" +
        "░██║░░██╗░░██║██╔══██╗██╔══██╗██╔══██╗██║░░░░░██╔════╝░╚══██╔══╝██╔════╝██╔══██╗████╗░████║██║████╗░██║██╔══██╗██║░░░░░\n" +
        "░╚██╗████╗██╔╝██║░░██║██████╔╝██║░░██║██║░░░░░█████╗░░░░░░██║░░░█████╗░░██████╔╝██╔████╔██║██║██╔██╗██║███████║██║░░░░░\n" +
        "░░████╔═████║░██║░░██║██╔══██╗██║░░██║██║░░░░░██╔══╝░░░░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║██║██║╚████║██╔══██║██║░░░░░\n" +
        "░░╚██╔╝░╚██╔╝░╚█████╔╝██║░░██║██████╔╝███████╗███████╗░░░░██║░░░███████╗██║░░██║██║░╚═╝░██║██║██║░╚███║██║░░██║███████╗\n" +
        "░░░╚═╝░░░╚═╝░░░╚════╝░╚═╝░░╚═╝╚═════╝░╚══════╝╚══════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝"

    if (config.showSplash === "true") term.green(splash);
}
function clearConsole(){
    if (config.allowClearConsole === "true"){
        console.clear();
    }
}
function getWord(){
    letters = [];
    //receive a word from my website
    request('https://tim-slager.newdeveloper.nl/wordleterminal', function (error, response, body) {
        if (error)  console.error('error:', error);

        //since the request responds with the string inside the <body> tag + the whole doctype HTML,
        // We will only need the first 5 characters
        word = body.substring(0, 5);
        if (config.debugMode === "true") console.log('\nword:', word);
            for (let i = 0; i < word.length; i++) {
                letters.push(word.charAt(i));
                if (config.debugMode === "true") {
                    console.log(word.charAt(i));
                    console.log(letters);
                }
            }
            guessWord();
    });
}
function guessWord(){
    guessLetters = [];
    term( 'Ready to guess?... START! ' );
    term.inputField(function(error, input){
        if(config.debugMode === "true") {
            term.green("\nGuessed word: '%s'\n", input);
        }
        //The user guessed a 5 letter word, Now we are going to check the word by executing the checkWord() function including the input as a parameter.
        checkWord(input);
        });
}

function checkWord(input){
    if (input.length > 5){
        term.red("Too many letters. Every wordle Terminal word is exactly 5 characters\n");
        guessWord();
    } else if (input.length < 5){
        term.red("Missing letters. Every wordle Terminal word is exactly 5 characters\n");
        guessWord();
    } else {
    for (let i = 0; i < input.length; i++) {
        guessLetters.push(input.charAt(i));
        if (config.debugMode === "true") {
            console.log("word guessed: " + input)
            console.log(input.charAt(i));
            console.log(guessLetters);
            }
        //check if the letter is inside the letter array
        if (letters.includes(input.charAt(i), i)){
            console.log("yes")
            } else console.log("no")
        }
    }
}

//code
showSplash();
clearConsole();
getWord();