"use strict";

const contactInput = document.querySelector("input[type='text'");
const addBtn = document.querySelector("input[type='button']");
const validationMsg = document.getElementById("validation-message");
const contactGrid = document.getElementById("contact-grid");
const contactTemplate = contactGrid.querySelector("template");
const contactCount = document.getElementById("contact-count");

const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;

const contacts = [];

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get city() {
        return this.#city;
    }

    get email() {
        return this.#email;
    }
}

function listContacts() {
    contactGrid.innerHTML = "";
    let length = contacts.length;

    for (let i = length - 1; i >= 0; i--) {
        const contact = contacts[i];
        const element = contactTemplate.content.cloneNode(true);

        element.querySelector(".name").innerText = contact.name;
        element.querySelector(".city").innerText = contact.city;
        element.querySelector(".email").innerText = contact.email;

        contactGrid.appendChild(element);
    }

    contactCount.innerText = `Saved Contacts: ${length}`;
}

function addContact() {
    if (contacts.length == 9) {
        showMessage("You have hit the max contact limit!");
        return;
    }

    let input = contactInput.value.trim();
    if (input.length == 0) {
        showMessage("Input cannot be empty");
        return;
    }

    let values = input.split(", ");
    if (values.length != 3) {
        showMessage("You must include: name, city and email (separated by a comma and space)");
        return;
    }

    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].trim();
        if (values[i].length == 0) {
            showMessage("One or more values is missing");
            return;
        }
    }

    if (!emailRegex.test(values[2])) {
        showMessage("Email is not valid (example@email.com)");
        return;
    }

    contacts.push(new Contact(...values));

    listContacts();
}

function deleteContact(contact) {
    contacts.splice(contacts.length - [...contactGrid.querySelectorAll(".contact")].indexOf(contact) - 1, 1);

    listContacts();
}

function showMessage(message) {
    validationMsg.innerText = message;
    validationMsg.style.visibility = "visible";

    setTimeout(() => validationMsg.style.visibility = "hidden", 7000);
}

addBtn.addEventListener("click", addContact);