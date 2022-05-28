const fs = require('fs').promises;
const path = require('path');
// const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {  
  const data = await fs.readFile(contactsPath, "utf8");
  const allContacts = JSON.parse(data);
  console.table(allContacts);
  return allContacts;  

}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
