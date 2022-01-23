import createElements from './createElements.js';
import * as  dataStorage from './serviceStorage.js';

const {createRow} = createElements;


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

           dataStorage. removeStorage('contacts', contact);
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
        dataStorage.addContactPageFromLocalStorage(newContact, list);
        dataStorage.setStorage('contacts', newContact);
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

export default {
    modalControl,
    deleteControl,
    addContactPageFromLocalStorage,
    formControl,
    sortTh,
    sortingbyTH,
};
