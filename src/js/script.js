
import control from './control.js';
import {
    renderPhoneBook,
    renderContactsFromLocalStorage as renderContactsData,
} from './render.js';

//import '../css/style.css';
import '../scss/index.scss';

const {modalControl, deleteControl, formControl, sortingbyTH} = control;

{
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        const {list, logo, btnAdd, formOverlay, form, btnDel} =
            renderPhoneBook(app, title);
        //функционал
        const allRow = renderContactsData(list);
        const {closeModal} = modalControl(btnAdd, formOverlay);

        deleteControl(btnDel, list);

        formControl(form, list, closeModal);

        //добавить сортировку по алфавиту
        sortingbyTH();
    };
    window.phoneBookInit = init;
}
