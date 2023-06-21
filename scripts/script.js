function getButtonValue(e){
    let buttonValue;

    switch(e.target.className){
        case "ac-button":
            buttonValue = "ac";
            clearUserInput();
            return;
        case "c-button":
            buttonValue = "c";
            clearUserInput();
            return;
        case "percent-button":
            buttonValue = " % ";
            operatorCount ++;
            if(operatorCount > 1){
                mod = true;
                operate();
                return;
            }
            break;
        case "divide-button":
            buttonValue = " &divide ";
            operatorCount ++;
            if(operatorCount > 1){
                div = true;
                operate();
                return;
            }
            break;
        case "7-button":
            buttonValue = "7";
            break;
        case "8-button":
            buttonValue = "8";
            break;
        case "9-button":
            buttonValue = "9";
            break;
        case "plus-button":
            buttonValue = " + ";
            operatorCount ++;
            if(operatorCount > 1){
                add = true;
                operate();
                return;
            }
            break;
        case "4-button":
            buttonValue = "4";
            break;
        case "5-button":
            buttonValue = "5";
            break;
        case "6-button":
            buttonValue = "6";
            break;
        case "minus-button":
            buttonValue = " - ";
            operatorCount ++;
            if(operatorCount > 1){
                sub = true;
                operate();
                return;
            }
            break;
        case "1-button":
            buttonValue = "1";
            break;
        case "2-button":
            buttonValue = "2";
            break;
        case "3-button":
            buttonValue = "3";
            break;
        case "mult-button":
            buttonValue = " &#215 ";
            operatorCount ++;
            if(operatorCount > 1){
                mult = true;
                operate();
                return;
            }
            break;
        case "0-button":
            buttonValue = "0";
            break;
        case "dot-button":
            buttonValue = ".";
            break;
        case "equal-button":
            buttonValue = "=";
            lock = true;
            equalButtonHit = true;
            operate();
            return;
    }

    if(lock){
        return;
    }

    updateUserInput(buttonValue);
    
}

function updateUserInput(character){
    if(userInput.split("").length > 22){
        return;
    }
    userInput = userInput + character;
    UserInputScreen.innerHTML = userInput;
}

function operate(){
    let parsedString = userInput.split(" ");

    if(parsedString[0] === undefined || parsedString[1] === undefined || parsedString[2] === undefined || parsedString[0] === "" || parsedString[1] === "" || parsedString[2] === "" && equalButtonHit){
        outputScreen.innerHTML = "Error";
        return;
    }

    if(parsedString[2] === undefined || parsedString[2] === "" && operatorCount > 1){
        if(add){
            userInput = parsedString[0];
            updateUserInput(" + ");
            add = false;
        }
        else if(sub){
            userInput = parsedString[0];
            updateUserInput(" - ");
            sub = false;
        }
        else if(mult){
            userInput = parsedString[0];
            updateUserInput(" &#215 ");
            mult = false;
        }
        else if(div){
            userInput = parsedString[0];
            updateUserInput(" &divide ");
            div = false;
        }
        else{
            userInput = parsedString[0];
            updateUserInput(" % ");
            mod = false;
        }

        return;
    }
    
    if(parsedString[1] === "+"){
        output = Number(parsedString[0]) + Number(parsedString[2]);
    }
    else if(parsedString[1] === "-"){
        output = Number(parsedString[0]) - Number(parsedString[2]);
    }
    else if(parsedString[1] === "&#215"){
        output = Number(parsedString[0]) * Number(parsedString[2]);
    }
    else if(parsedString[1] === "&divide"){
        output = Number(parsedString[0]) / Number(parsedString[2]);
    }
    else if(parsedString[1] === "%"){
        output = Number(parsedString[0]) % Number(parsedString[2]);
    }

    if(equalButtonHit){
        outputScreen.innerHTML = output;
        equalButtonHit = false;
    }

    if(lock){
        return;
    }

    if(!equalButtonHit){
        if(add){
            userInput = output + " + ";
            add = false;
        }
        else if(sub){
            userInput = output + " - ";
            sub = false;
        }
        else if(mult){
            userInput = output + " &#215 ";
            mult = false;
        }
        else if(div){
            userInput = output + " &divide ";
            div = false;
        }
        else if(mod){
            userInput = output + " % ";
            mod = false;
        }

        
        UserInputScreen.innerHTML = userInput;
    }
}

function clearUserInput(){
    operatorCount = 0;
    equalButtonHit = false;
    UserInputScreen.innerHTML = "0";
    userInput = "";
    outputScreen.innerHTML = "";
    output = "";
    add = false;
    sub = false;
    mult = false;
    div = false;
    mod = false;
    lock = false;

}


let buttons = document.querySelectorAll("button");
let userInput = "";
let output = "";
let UserInputScreen = document.querySelector(".user-input");
let outputScreen = document.querySelector(".output");
let lock = false;
let equalButtonHit = false;
let operatorCount = 0;
let add = false;
let sub = false;
let mult = false;
let div = false;
let mod = false;

for(i of buttons){
    i.addEventListener('click', getButtonValue);
}