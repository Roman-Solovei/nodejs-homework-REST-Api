const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {  
  const data = await fs.readFile(contactsPath, "utf8");
  const allContacts = JSON.parse(data);
  // console.table(allContacts);
  return allContacts;  

}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  return contact || null;
}

const removeContact = async (contactId) => {}

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };

  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2), 'utf8');
  return newContact;  

}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
