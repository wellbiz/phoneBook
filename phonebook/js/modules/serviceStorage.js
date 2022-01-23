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

export default {
    getStorage,
    setStorage,
    removeStorage,
};
