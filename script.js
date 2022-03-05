
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// UX preference: Would not include this additional step however homework specification
    window.onload=function(){
        var r=confirm("Please specify password criteria");
        }

// WHEN prompted for password criteria
// THEN I select which criteria to include in the password


// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters

// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters

// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected

// Getting the DOM Elements
const resultDOM = document.getElementById("result");
const copybtnDOM = document.getElementById("copy");
const lengthDOM = document.getElementById("length");
const lowercaseDOM = document.getElementById("lowercase");
const uppercaseDOM = document.getElementById("uppercase");
const numbersDOM = document.getElementById("numbers");
const symbolsDOM = document.getElementById("symbols");
const generatebtn = document.getElementById("generate");
const form = document.getElementById("password-generator");

// Generating Character Codes For The Application
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

 // Character Code Generating Function
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  } 
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// The Password Generating Function
let generatePassword = (
    characterAmount,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) => {
    //  UX preference: would include the line-> let charCodes = LOWERCASE_CODES; to make lowecase default inclusion and remove the first line below
    let charCodes = LOWERCASE_CODES;
    if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CODES);
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
}


// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// Copy password button
 
copybtnDOM.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const passwordToCopy = resultDOM.innerText;
    // A Case when Password is Empty
    if (!passwordToCopy) return;
    // Copy Functionality
    textarea.value = passwordToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password Copied to Clipboard");
  });

  // Checking the options that are selected and setting the password
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(uppercaseDOM.checked)
    if( !lowercaseDOM.checked && !uppercaseDOM.checked && !numbersDOM.checked && !symbolsDOM.checked){
        alert("Please specify at least 1 character type")
    }else{
        const characterAmount = lengthDOM.value;
        const includeLowercase = lowercaseDOM.checked;
        const includeUppercase = uppercaseDOM.checked;
        const includeNumbers = numbersDOM.checked;
        const includeSymbols = symbolsDOM.checked;
        const password = generatePassword(
            characterAmount,
            includeLowercase,
            includeUppercase,
            includeNumbers,
            includeSymbols
        );
        resultDOM.innerText = password;
}});