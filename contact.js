function addContact() {
   
    var contactName = document.querySelector('#contactName').value;
    var contactNumber = document.querySelector('#contactNumber').value;
    if (contactName.trim() === '' || contactNumber.trim() === '') {
        alert('Please enter contact name and number.');
        return;
    }
    var newContact = {
        name: contactName,
        number: contactNumber
    };


    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    document.querySelector('#contactName').value = '';
    document.querySelector('#contactNumber').value = '';
    $('#addNew').modal('hide');
    displayContacts();
}


function removeContact(index) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}


function displayContacts() {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var contactList = document.getElementById('listOfContacts');
    contactList.innerHTML = '';

    contacts.forEach(function(contact, index) {
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'row');
        listItem.innerHTML = `
            <span class = "n"><img id = "phn" src="https://cdn-icons-png.freepik.com/256/8863/8863342.png?semt=ais_hybrid" alt="" width="15" >${contact.name}</span>
            <span class = "m">${contact.number}</span>
            
            <button type="button" id = "but" class="btn btn-sm btn-warning col-1 ml-3" onclick="showUpdateModal(${index})">Edit</button>
            <!-- Update Contact Modal -->
            <div class="modal fade" id="updateContact" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Contact</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="list-group">
                                    <label for="updateContactName">Contact Name:</label>
                                    <input type="text" class="form-control" id="updateContactName">
                                </div>
                                <div class="list-group">
                                    <label for="updateContactNumber">Contact Number:</label>
                                    <input type="number" class="form-control" id="updateContactNumber">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="updateContact()">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" id = "box11" class="btn btn-sm btn-danger col-1 ml-3" onclick="removeContact(${index})">X</button>
        `;
        contactList.appendChild(listItem);
    });
}

displayContacts();


function showUpdateModal(index) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var contact = contacts[index];
    document.querySelector('#updateContactName').value = contact.name;
    document.querySelector('#updateContactNumber').value = contact.number;


    currentIndex = index;


    $('#updateContact').modal('show');
}
function updateContact() {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var updatedName = document.querySelector('#updateContactName').value;
    var updatedNumber = document.querySelector('#updateContactNumber').value;


    if (updatedName.trim() === '' || updatedNumber.trim() === '') {
        alert('Please enter contact name and number.');
        return;
    }


    contacts[currentIndex].name = updatedName;
    contacts[currentIndex].number = updatedNumber;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    $('#updateContact').modal('hide');
    displayContacts();
}
