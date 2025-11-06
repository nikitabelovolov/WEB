let display = document.getElementById('display');

function appendToDisplay(value) {
    const currentText = display.textContent || display.innerText;
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(value)) {
        const lastChar = currentText.slice(-1);
        if (operators.includes(lastChar)) {
            const spans = display.getElementsByTagName('span');
            if (spans.length > 0) {
                const lastSpan = spans[spans.length - 1];
                lastSpan.textContent = value;
                return;
            }
        }
    }

    if (currentText.length > 0) {
        display.innerHTML = `<span style="color: #666">${currentText}</span>`;
    }

    const newChar = document.createElement('span');
    newChar.textContent = value;
    newChar.style.color = 'black';
    display.appendChild(newChar);
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
    display.innerHTML = '';
}

function deleteLast() {
    const spans = display.getElementsByTagName('span');
    if (spans.length > 0) {
        const lastSpan = spans[spans.length - 1];
        if (lastSpan.textContent.length > 1) {
            lastSpan.textContent = lastSpan.textContent.slice(0, -1);
            if (lastSpan.textContent === '') {
                display.removeChild(lastSpan);
            }
        } else {
            display.removeChild(lastSpan);
        }
    }
}

function calculate() {
    try {
        const expression = display.textContent || display.innerText;
        const result = eval(expression);
        display.innerHTML = `<span style="color: black">${result}</span>`;
    } catch (error) {
        display.innerHTML = '<span style="color: black">Ошибка</span>';
        setTimeout(() => {
            display.innerHTML = '';
        }, 1000);
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.borderColor = '#00bfff';
    });
    button.addEventListener('mouseup', function() {
        this.style.borderColor = '#b0b0b0';
    });
    button.addEventListener('mouseleave', function() {
        this.style.borderColor = '#b0b0b0';
    });
});

display.addEventListener('input', function(e) {
    e.preventDefault();
});

display.addEventListener('paste', function(e) {
    e.preventDefault();
});

display.addEventListener('keydown', function(e) {
    e.preventDefault();
});
