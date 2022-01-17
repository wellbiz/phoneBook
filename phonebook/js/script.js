'use strict';

const data = [
    {
        name: 'Иван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Игорь',
        surname: 'Семёнов',
        phone: '+79999999999',
    },
    {
        name: 'Семён',
        surname: 'Иванов',
        phone: '+79800252525',
    },
    {
        name: 'Мария',
        surname: 'Попова',
        phone: '+79876543210',
    },
];

{
    const addContactData = (contact) => {
        data.push(contact);
        console.log('data: ', data);
    };
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
    <input class="form-input" name="name" id="name" type="text" require>
    </div>
    <div class="form-group">
    <label class="form-label" for="surname">Фамилия:</label>
    <input class="form-input" name="surname" id="surname" type="text" require>
    </div>
    <div class="form-group">
    <label class="form-label" for="phone">Телефон:</label>
    <input class="form-input" name="phone" id="phone" type="number" require>
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

    const createRow = ({name: firstname, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');
        const td = document.createElement('td');

        const tdDel = td.cloneNode();
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = td.cloneNode();
        tdName.textContent = firstname;

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
    const renderContacts = (el, data) => {
        const allRow = data.map(createRow);
        el.append(...allRow);
        return allRow;
    };

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach((contact) => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

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
            if (target === formOverlay || target.closest('.close'))
                closeModal();
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
                target.closest('.contact').remove();
            }
        });
    };

    const addContactPage = (contact, list) => {
        list.append(createRow(contact));
    };
    const formControl = (form, list, closeModal) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newContact = Object.fromEntries(formData);
            addContactPage(newContact, list);
            addContactData(newContact);
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
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        const {list, logo, btnAdd, formOverlay, form, btnDel} =
            renderPhoneBook(app, title);
        //функционал
        const allRow = renderContacts(list, data);
        const {closeModal} = modalControl(btnAdd, formOverlay);
        hoverRow(allRow, logo);
        deleteControl(btnDel, list);
        formControl(form, list, closeModal);

        // в следующих уроках будет добавление через модальное окно
        setTimeout(() => {
            const contact = createRow({
                name: 'Жираф',
                surname: 'Шварц',
                phone: '+79876543210',
            });
            list.append(contact);
        }, 2000);

        //добавить сортировку по алфавиту
        sortingbyTH();
    };
    window.phoneBookInit = init;
}
