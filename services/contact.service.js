
const { Contact } = require("../models/contacts");


const listContacts = async () => {
    return Contact.find();
};

const getContactById = async (contactId) => {
    return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
    return Contact.findByIdAndDelete(contactId);
};

const addContact = async (contact) => {
    console.log(contact)
    return Contact.create(contact);
};

const updateContact = async (contactId, contact) => {
    return Contact.findByIdAndUpdate(contactId, contact, { new: true })
};

// const updateStatusContact = async (contactId, body) => { 

//  }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact, 
}
