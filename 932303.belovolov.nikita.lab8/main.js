document.addEventListener('DOMContentLoaded', function() {
    const elementsContainer = document.getElementById('elements-container');
    const addButton = document.getElementById('add-element');
    const saveButton = document.getElementById('save');
    const output = document.getElementById('output');
    
    let elements = [];

    function addElement() {
        const element = {
            id: Date.now() + Math.random(),
            name: '',
            value: ''
        };
        elements.push(element);
        renderElements();
    }

    function renderElements() {
        elementsContainer.innerHTML = '';
        
        elements.forEach((element, index) => {
            const row = document.createElement('div');
            row.className = 'element-row';
            
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'element-input';
            nameInput.placeholder = 'Название';
            nameInput.value = element.name;
            nameInput.oninput = function() {
                element.name = this.value;
            };
            
            const valueInput = document.createElement('input');
            valueInput.type = 'text';
            valueInput.className = 'element-input';
            valueInput.placeholder = 'ID';
            valueInput.value = element.value;
            valueInput.oninput = function() {
                element.value = this.value;
            };
            
            const upBtn = document.createElement('button');
            upBtn.className = 'btn';
            upBtn.textContent = '↑';
            upBtn.onclick = function() {
                moveUp(index);
            };
            
            const downBtn = document.createElement('button');
            downBtn.className = 'btn';
            downBtn.textContent = '↓';
            downBtn.onclick = function() {
                moveDown(index);
            };
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-delete';
            deleteBtn.textContent = 'Х';
            deleteBtn.onclick = function() {
                deleteElement(element.id);
            };
            
            row.appendChild(nameInput);
            row.appendChild(valueInput);
            row.appendChild(upBtn);
            row.appendChild(downBtn);
            row.appendChild(deleteBtn);
            
            elementsContainer.appendChild(row);
        });
    }

    function moveUp(index) {
        if (index > 0 && elements.length > 1) {
            const temp = elements[index];
            elements[index] = elements[index - 1];
            elements[index - 1] = temp;
            renderElements();
        }
    }

    function moveDown(index) {
        if (index < elements.length - 1 && elements.length > 1) {
            const temp = elements[index];
            elements[index] = elements[index + 1];
            elements[index + 1] = temp;
            renderElements();
        }
    }

    function deleteElement(id) {
        elements = elements.filter(e => e.id !== id);
        renderElements();
    }

    function save() {
        const result = [];
        elements.forEach(element => {
            if (element.name && element.value) {
                result.push([element.name, element.value]);
            }
        });
        output.textContent = JSON.stringify(result);
    }

    addButton.addEventListener('click', addElement);
    saveButton.addEventListener('click', save);
    
    addElement();
});