// Clear list function to reset and blank list 
function clearUidList(){
    var uidTable = document.getElementById('uid-table');
    uidTable.getElementsByTagName('tbody')[0].innerHTML = '';
}

// Function to handle Direct Message button click
function directMessage(button) {
    var row = button.parentNode.parentNode;
    var uid = row.cells[0].textContent;
    var messageInput = document.getElementById('uid-table-message-input');
    messageInput.value = uid + ':';
}

// Add uid to table function
function addUidToTable() {
    var uidInput = document.getElementById('uidInput');
    var uid = uidInput.value;

    if (uid !== '') {
        var table = document.getElementById('uid-table').getElementsByTagName('tbody')[0];
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = uid;
        cell2.innerHTML = ''; // You can leave this blank for now
        cell3.innerHTML = '<button onclick="directMessage(this)">Direct Message</button>'; 
        cell4.innerHTML = '<button onclick="removeRow(this)">Remove</button>';
        
        // clear the input box
        uidInput.value = '';
    }
}

function removeRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
document.getElementById('submitBtn').addEventListener('click', addUidToTable);
document.getElementById('clearBtn').addEventListener('click', clearUidList);
document.getElementById('uidInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addUidToTable();
    }
});



document.getElementById('uidInput').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

document.getElementById('input-home-uid').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

document.getElementById('input-home-uid').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addUidToTable();
    }
});
            // Function to set the HOME UID
            function setHomeUID() {
                var inputElement = document.getElementById('input-home-uid');
                var displayedElement = document.getElementById('displayed-home-uid');
        
                var newHomeUID = inputElement.value;
        
                if (newHomeUID) {
                    displayedElement.textContent = newHomeUID;
                    inputElement.value = ''; // Clear the input field
                    // Store newHomeUID in a variable for later access
                    var homeUID = newHomeUID;
                }
            }
        
            // Add event listener to the "Set ID" button
            document.getElementById('setUID').addEventListener('click', setHomeUID);