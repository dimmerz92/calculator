let curr = null;
let prev = null;
let operatorPressed = false;
let nextOperation = false;

//acknowledges button presses
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
            numbers(button.textContent)
        } else if (button.classList.contains("operator")) {
            operators(button.id);
        } else if (button.classList.contains("function")) {
            functions(button.id);
        }
    })
})

//displays numbers on screen
const screen = document.getElementById("screen");
function numbers(e) {
    let screenLength = screen.textContent.replace(/[.-]/g,"").length;
    let decimal = screen.textContent.includes(".");
    if (operatorPressed && curr == null) {
        screen.textContent = e;
        curr = Number(screen.textContent);
        return;
    }
    if (screenLength < 9 && curr == 0) {
        screen.textContent += e;
        curr = Number(screen.textContent)
    } else if (screenLength < 9 && !decimal) {
        screen.textContent += e;
        curr = Number(screen.textContent)
    } else if (screenLength < 9 && e != ".") {
        screen.textContent += e;
        curr = Number(screen.textContent)
    }
}

//handles operation keys
let myLong = 0;
function operators(e) {
    if (e != "equals" && !operatorPressed) {
        operatorPressed = true;
        prev = curr;
        curr = null;
        nextOperation = e;
    } else if (e != "equals" && nextOperation) {
        operatorPressed = true;
        prev = operation(nextOperation, prev, curr);
        curr = null;
        nextOperation = e;
    } else if (e == "equals" && nextOperation) {
        operatorPressed = false;
        curr = operation(nextOperation, prev, curr);
        if (curr.toString().length > 9) {
            myLong = curr;
            curr = curr.toFixed(8)
        }
        screen.textContent = curr;
        prev = false;
        nextOperation = false;
    }
}

//arithmetic operations
function operation(e,x,y) {
    if (e == "add") {
        return (x * 100 + y * 100) / 100;
    } else if (e == "subtract") {
        return (x * 100 - y * 100) / 100;
    } else if (e == "multiply") {
        return x * 100 * y / 100;
    } else if (e =="divide") {
        return x / y;
    }
}

//handles function keys
function functions(e) {
    if (e == "clear") {
        curr=prev=operatorPressed=nextOperation = false;
        screen.textContent = "";
    } else if (e == "negpos" && curr != false) {
        curr = 0 - curr;
        screen.textContent = curr;
    } else if (e == "pct") {
        curr = prev * (curr / 100);
    }
}

