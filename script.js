

const buttons = document.querySelectorAll("button");
const displayEml = document.querySelector("#result")
const symbol = ["+", "-", "*", "/"];
let textToDisplay = "";

buttons.forEach( (btn) =>{
    //console.log(btn, "jhkhl");

    
    btn.addEventListener("click", () => {
        //console.log(btn)

        // change colors
        displayEml.style.backgroundColor = "";
        displayEml.style.color = "";


        const val = btn.innerText; // each button click then display its value

        const lastCha = textToDisplay[textToDisplay.length -1];
        

         // CHALLENGE METHOD 1
        // if . exists, then don't let user enter nothing
        // if(val === "." && textToDisplay.includes(".") &&!textToDisplay.includes("-") &&!textToDisplay.includes("+") &&!textToDisplay.includes("*") &&!textToDisplay("/")) return;

        // CHALLENGE METHOD 2
        //console.log(noSymbol);
        // create substring
        let noSymbol = !(symbol.some(element => 
            textToDisplay.includes(element)));

        const operatorLastIndexArray = [];
        symbol.forEach(operator =>operatorLastIndexArray.push(textToDisplay.lastIndexOf(operator))); // to check in the sub string

        operatorLastIndexArray.sort((a, b) => b-a)
        lastIndexOperator = operatorLastIndexArray[0]

        // const lastIndexPlusOperator = textToDisplay.lastIndexOf("+");
        // const lastIndexMinusOperator = textToDisplay.lastIndexOf("-");
        // const lastIndexMulOperator = textToDisplay.lastIndexOf("*");
        // const lastIndexDivOperator = textToDisplay.lastIndexOf("/");
        // const lastIndexOperator1 = Math.max(lastIndexPlusOperator, lastIndexMinusOperator);
        // const lastIndexOperator2 = Math.max(lastIndexDivOperator, lastIndexMulOperator);
        // const lastIndexOperator = Math.max(lastIndexOperator1, lastIndexOperator2); 
        //console.log(lastIndexOperator);
        let subString = textToDisplay.slice(lastIndexOperator);
        //console.log(lastIndexOperator)
        //console.log(subString) 
        let textToCheck = noSymbol ? textToDisplay : subString;
        
        
        // if(noSymbol) {
        //     textToCheck = textToDisplay;
        // }else{
        //     textToCheck = subString;
        // }

        if(val === "." && textToCheck.includes(".")){
            return;
        }
        

        // ------ END CHALLENGE -------
        
        // now we are checking if there's nothing and if it includes any of the 4 operators then return nothing.
        if(textToDisplay.length < 1 && symbol.includes(val)) return;

        // if an operator is already existed then replace with a new one
        if(symbol.includes(lastCha) && symbol.includes(val)) {
            textToDisplay = textToDisplay.slice(0, -1);
            
        }



        if(val === "=") {
            // if the last character is symbol, then clear that character. Use C 
            
            if(symbol.includes(lastCha)) {
                textToDisplay = textToDisplay.slice(0, -1); // start from the beginning but exclude the last char
            }
            return onTotal();
        }

        // clear all characters 
        if(val === "AC") {
            return resetDisplay();
        }

        // cut the last character from the display
        if(val === "C") {
            textToDisplay = textToDisplay.slice(0, -1);
            return display(textToDisplay);
        }

       
        textToDisplay += val;
        
        display(textToDisplay);
        //console.log(val);


        
    });

});

const display = (toDisplay) => {
    displayEml.innerText = toDisplay; 
}

const onTotal = () => {
    const prankNum = randomNumber();

    const total = eval(textToDisplay) + prankNum; // eval: convert the string to formula
    console.log(prankNum);

    display(total);
    textToDisplay = "";  // go back to empty after display total

    // prank and animation
    if(prankNum > 0) {
        displayEml.style.backgroundColor = "red";
        displayEml.style.color = "white";

        //animation
        displayEml.classList.add("prank");

        //remove the class name after animation ends
        displayEml.addEventListener("animationend", () =>
            displayEml.classList.remove("prank"));

    }


}

const resetDisplay = () => {
    display("0.00");
    textToDisplay = ""; // go back to empty after AC
};


// faking data
const randomNumber = () => {
    const num = Math.round(Math.random() * 10);  // 0-10
    //console.log(num, "from randomNumber");
    return num <= 3 ? num : 0;
};




//console.log(buttons)