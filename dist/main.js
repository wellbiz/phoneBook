(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {createRow} = require('./createElements');

const {setStorage, removeStorage} = require('./serviceStorage');

const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target === formOverlay || target.closest('.close')) closeModal();
    });
    return {
        closeModal,
    };
};
const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach((del) => {
            del.classList.toggle('is-visible');
        });
    });

    list.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.del-icon')) {
            const tr = target.closest('tr');
            const firstname = tr.querySelector('td:nth-child(2)').textContent;
            const surname = tr.querySelector('td:nth-child(3)').textContent;
            const number = tr.querySelector('td:nth-child(4)').textContent;

            const contact = {
                name: firstname,
                surname: surname,
                phone: number,
            };

            removeStorage('contacts', contact);
            target.closest('.contact').remove();
        }
    });
};

const addContactPageFromLocalStorage = (contact, list) => {
    list.append(createRow(contact));
};
const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);
        addContactPageFromLocalStorage(newContact, list);
        setStorage('contacts', newContact);
        closeModal();
        form.reset();
    });
};

const sortTh = (colNum) => {
    let tbody = document.querySelector('.table tbody');

    let rowsArray = Array.from(tbody.rows);

    // compare(a, b) сравнивает две строки, нужен для сортировки
    let compare;

    compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
            ? 1
            : -1;
    };

    // сортировка
    if (colNum === 1 || colNum === 2) rowsArray.sort(compare);

    tbody.append(...rowsArray);
};
const sortingbyTH = () => {
    const table = document.querySelector('.table');
    table.addEventListener('click', (e) => {
        if (e.target.tagName != 'TH') return;

        let th = e.target;
        sortTh(th.cellIndex);
    });
};

module.exports = {
    modalControl,
    deleteControl,
    addContactPageFromLocalStorage,
    formControl,
    sortTh,
    sortingbyTH,
};

},{"./createElements":2,"./serviceStorage":4}],2:[function(require,module,exports){
const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
};

const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
};

const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
};

const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
};

const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footerContainer.textContent = 'Все права защищены. ©Дмитрий';
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    return footer;
};

const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
        const button = document.createElement('button');
        button.type = type;
        button.textContent = text;
        button.className = className;
        return button;
    });

    btnWrapper.append(...btns);

    return {
        btnWrapper,
        btns,
    };
};

const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
        'beforeend',
        `<tr>
     <th class="delete">Удалить
     <th>Имя
     <th>Фамилия
     <th>Телефон
     <th>
 </tr>`
    );

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
};

const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML(
        'beforeend',
        `<button class="close" type="button"></button>
 <h2 class="form-title">Добавить контакт</h2>
 <div class="form-group">
 <label class="form-label" for="name">Имя:</label>
 <input class="form-input" name="name" id="name" type="text" required>
 </div>
 <div class="form-group">
 <label class="form-label" for="surname">Фамилия:</label>
 <input class="form-input" name="surname" id="surname" type="text"
 required>
 </div>
 <div class="form-group">
 <label class="form-label" for="phone">Телефон:</label>
 <input class="form-input" name="phone" id="phone" type="number"
 required>
 </div>`
    );

    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'submit',
            text: 'Добавить',
        },
        {className: 'btn btn-danger', type: 'reset', text: 'Отмена'},
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
        overlay,
        form,
    };
};

const createRow = ({name, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const td = document.createElement('td');

    const tdDel = td.cloneNode();
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = td.cloneNode();
    tdName.textContent = name;

    const tdSurname = td.cloneNode();
    tdSurname.textContent = surname;

    const tdPhone = td.cloneNode();

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdButtonEdit = td.cloneNode();
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn', 'btn-secondary');
    buttonEdit.setAttribute('type', 'button');
    buttonEdit.textContent = 'Редактировать';
    tdButtonEdit.append(buttonEdit);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdButtonEdit);

    return tr;
};

module.exports = {
    createContainer,
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
};

},{}],3:[function(require,module,exports){
const {
    createContainer,
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
} = require('./createElements');

const {getStorage} = require('./serviceStorage');

const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter();
    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'button',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger mr-3',
            type: 'button',
            text: 'Удалить',
        },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
        list: table.tbody,
        logo,
        btnAdd: buttonGroup.btns[0],
        btnDel: buttonGroup.btns[1],
        formOverlay: overlay,
        form: form,
    };
};

const renderContactsFromLocalStorage = (el) => {
    let contacts = [];
    if (localStorage.length > 0) {
        contacts = getStorage('contacts');
        const allRow = contacts.map(createRow);
        el.append(...allRow);
        return allRow;
    } else {
        return;
    }
};

module.exports = {
    renderPhoneBook,
    renderContactsFromLocalStorage,
};

},{"./createElements":2,"./serviceStorage":4}],4:[function(require,module,exports){
'use strict ';

const getStorage = (key) => {
    return localStorage.length > 0
        ? JSON.parse(localStorage.getItem(key))
        : [];
};
const setStorage = (key, contact) => {
    let contacts = [];
    if (localStorage.length > 0) {
        contacts = JSON.parse(localStorage.getItem(key));
    } else {
        localStorage.setItem(key, JSON.stringify(contact));
    }
    if (contacts) {
        localStorage.removeItem(key);
        contacts.push(contact);
        localStorage.setItem(key, JSON.stringify(contacts));
    }
    console.log(JSON.parse(localStorage.getItem(key)));
};

const removeStorage = (key, contact) => {
    let contacts = JSON.parse(localStorage.getItem(key));
    let newContacts = [];
    for (let i = 0; i < contacts.length; i++) {
        if (
            contacts[i].name != contact.name &&
            contacts[i].surname != contact.surname &&
            contacts[i].phone != contact.phone
        ) {
            newContacts.push(contacts[i]);
        }
    }
    localStorage.setItem(key, JSON.stringify(newContacts));
};

module.exports = {
    getStorage,
    setStorage,
    removeStorage,
};

},{}],5:[function(require,module,exports){
'use strict';

const {
    renderPhoneBook,
    renderContactsFromLocalStorage,
} = require('./modules/render');

const {
    modalControl,
    deleteControl,
    formControl,
    sortingbyTH,
} = require('./modules/control');
{
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        const {list, logo, btnAdd, formOverlay, form, btnDel} =
            renderPhoneBook(app, title);
        //функционал
        const allRow = renderContactsFromLocalStorage(list);
        const {closeModal} = modalControl(btnAdd, formOverlay);

        deleteControl(btnDel, list);

        formControl(form, list, closeModal);

        //добавить сортировку по алфавиту
        sortingbyTH();
    };
    window.phoneBookInit = init;
}

},{"./modules/control":1,"./modules/render":3}]},{},[5]);
