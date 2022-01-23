import createElements from './createElements.js';
import serviceStorage from './serviceStorage.js';

const {
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
} = createElements;
const {getStorage} = serviceStorage;

export const renderPhoneBook = (app, title) => {
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

export const renderContactsFromLocalStorage = (el) => {
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

// export default {
//     renderPhoneBook,
//     renderContactsFromLocalStorage,
// };
