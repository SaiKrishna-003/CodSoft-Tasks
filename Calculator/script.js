document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value) {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstOperand = '';
        secondOperand = '';
        display.textContent = '';
    });

    equalsButton.addEventListener('click', () => {
        if (firstOperand && operator && currentInput) {
            secondOperand = currentInput;
            const result = calculate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
            display.textContent = result;
            currentInput = result;
            firstOperand = '';
            secondOperand = '';
            operator = '';
        }
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operator')) {
                if (currentInput) {
                    if (!firstOperand) {
                        firstOperand = currentInput;
                        operator = button.getAttribute('data-value');
                        currentInput = '';
                    } else if (currentInput && firstOperand && operator) {
                        secondOperand = currentInput;
                        const result = calculate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
                        display.textContent = result;
                        firstOperand = result;
                        operator = button.getAttribute('data-value');
                        currentInput = '';
                    }
                }
            }
        });
    });
});
