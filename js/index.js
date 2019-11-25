function run() {
    let btn = document.querySelector('#todo-add');
    btn.addEventListener('click', addNewToDo);
    loadToDos();
}

function loadToDos() {
    const db = window.localStorage;
    const list = document.querySelector('#todo-list');
    Object.keys(db).forEach((todoItem) => {
        const node = document.createRange().createContextualFragment(db.getItem(todoItem));
        const id = node.querySelector('input').id;
        
        list.appendChild(node);

        const item = list.querySelector(`#${id}`);

        if ('style' in item) {
            item.addEventListener('mousemove', updateItemBg);
        }
    });
}

function checkBoxUpdate(cb) {
    if (cb.checked) {
        cb.setAttribute('checked', cb.checked);
    } else {
        cb.removeAttribute('checked');
    }
    const itemString = new XMLSerializer().serializeToString(cb.parentNode);
    const id = cb.id;
    window.localStorage.setItem(id, itemString);
}

function deleteItem(event, btn) {
    const item = btn.offsetParent;
    const input = item.querySelector('input');
    const id = input.id;
    localStorage.removeItem(id);
    item.addEventListener('animationend', () => {
        item.parentElement.removeChild(item);
    });
    item.addEventListener('webkitAnimationEnd', () => {
        item.parentElement.removeChild(item);
    });
    item.addEventListener('oAnimationEnd', () => {
        item.parentElement.removeChild(item);
    });
    item.classList.toggle('delete-item');
}

function addNewToDo(event) {
    event.preventDefault();

    const todo = document.querySelector('#todo-label');
    const value = todo.value;

    if (value.length > 0) {
        const hash = (Date.now().toString(36).substr(2, 4) + performance.now().toString(36).replace('.','').substr(0, 4) + Math.random().toString(36).substr(3, 4)).toUpperCase();

        const id = `todo-select-${hash}`;
        const template = document.querySelector('#todo-item');
        const item = document.importNode(template.content, true);
        const label = item.querySelector('label[for]');
        const input = item.querySelector('#todo-select')
        const list = document.querySelector('#todo-list');

        input.setAttribute('id', id);
        label.setAttribute('for', id);

        label.textContent = value;

        const db = window.localStorage;
        const itemString = new XMLSerializer().serializeToString(item);
        db.setItem(id, itemString);

        list.appendChild(item);

        const node = list.querySelector(`#${id}`);

        if ('style' in node) {
            node.addEventListener('mousemove', updateItemBg);
        }
    }

    todo.value = '';
}

function updateItemBg(evt) {
    this.style.setProperty("--item-offset-x", evt.clientX - rect.left);
    this.style.setProperty("--item-offset-y", evt.clientY - rect.top);
}

run();

