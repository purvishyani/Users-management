// ADD USER DATA

window.addEventListener("load", displayData());

document.getElementById("btn-showmodal").addEventListener("click", () => {

    document.querySelector(".modal-footer").innerHTML = `<button id="btn-adduser" onclick="addUser()"></button>`;

    document.querySelector(".modal-title").innerText = "Add User";
    document.querySelector(".modal-header").style.background = "black";
    document.querySelector("#btn-adduser").innerText = "Add User";
    document.querySelector("#btn-adduser").style.background = " rgb(122 144 248);";
});

document.getElementById("btn-close").addEventListener("click", () => {

    document.getElementById("employeeForm").reset();
})

function addUser() {

    var storedItems = JSON.parse(localStorage.getItem("Employee"));

    var userName = document.getElementById("user-name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var id = Math.floor(Math.random() * 100);

    var gender;
    if (document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
    }
    else if (document.getElementById("female").checked) {
        gender = document.getElementById("female").value;
    }
    var position = document.getElementById("position").value;

    //  STORING VALUES

    var userData = [];
    userData = JSON.parse(localStorage.getItem("Employee"));

    if (userData === null) {

        userData = [{
            Id: id,
            Name: userName,
            Email: email,
            Phone: phone,
            Gender: gender,
            Position: position,

        }]
        localStorage.setItem("Employee", JSON.stringify(userData))
        alert("Added new user")
    }
    else {
        var checkCounter = 2;
        storedItems.forEach(function (item) {
            var verifyEmail = item.Email;
            if (email === verifyEmail) {
                checkCounter = 1;
            }
            else {
                checkCounter = 0
            }
        })
        if (checkCounter === 1) {
            alert("This email is already exist")
        }
        else if (checkCounter === 0) {
            userData.push({
                Id: id,
                Name: userName,
                Email: email,
                Phone: phone,
                Gender: gender,
                Position: position,
            })
            localStorage.setItem("Employee", JSON.stringify(userData))
            alert("Added new user")
        }
    }
    document.getElementById("employeeForm").reset();
    displayData()
}


//  DISPLAY USER DATA
function displayData() {

    var storedItems = JSON.parse(localStorage.getItem("Employee"));

    if (storedItems) {
        document.getElementById("table-body").innerHTML = "";
        var indexNumber = 1;
        storedItems.forEach(item => {

            document.getElementById("table-body").innerHTML +=
                `<tr id="table-row">
                        <td>${indexNumber}</td>
                        <td>${item.Name}</td>
                        <td>${item.Email}</td>
                        <td>${item.Phone}</td>
                        <td>${item.Gender}</td>
                        <td>${item.Position}</td>
                        <td class="col-action">
                        <button class="btn-edit-delete" data-toggle="modal" data-target="#inputUser" id="btn-edit" onclick="displayEditData(${item.Id})"><i class="fa-solid fa-pencil"></i></button>
                       
                        <button class="btn-edit-delete btn-pink" onclick="deleteUser(${item.Id})"><i class="fa-regular fa-trash-can "></i></button>
                      </td>
                    </tr>`
            indexNumber++;
        })
    }
}

// EDIT USER DATA

function displayEditData(selectedId) {

    document.querySelector(".modal-footer").innerHTML = `<button id="btn-edituser" onclick="editUser(${selectedId})"></button>`

    document.querySelector(".modal-title").innerText = "Edit User";
    document.querySelector(".modal-header").style.background = "orange";
    document.querySelector("#btn-edituser").innerText = "Update User";
    document.querySelector("#btn-edituser").style.background = "Orange";

    storedItems = JSON.parse(window.localStorage.getItem('Employee'));
    for (var i = 0; i < storedItems.length; i++) {
        if (storedItems[i].Id === selectedId) {

            document.getElementById("user-name").value = storedItems[i].Name;
            document.getElementById("email").value = storedItems[i].Email;
            document.getElementById("phone").value = storedItems[i].Phone;

            if (storedItems[i].Gender === "male") {
                document.getElementById("male").checked = true
            }
            else {
                document.getElementById("female").checked = true
            }
            document.getElementById("position").value = storedItems[i].Position;
        }
    }
}

function editUser(selectedId) {
    var userName = document.getElementById("user-name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    storedItems = JSON.parse(window.localStorage.getItem('Employee'));
    for (var i = 0; i < storedItems.length; i++) {
        if (storedItems[i].Id === selectedId) {

            var gender;
            if (document.getElementById("male").checked) {
                gender = document.getElementById("male").value;
            }
            else if (document.getElementById("female").checked) {
                gender = document.getElementById("female").value;
            }

                storedItems[i].Name = document.getElementById("user-name").value,
                storedItems[i].Email = document.getElementById("email").value,
                storedItems[i].Phone = document.getElementById("phone").value,
                storedItems[i].Gender = gender,
                storedItems[i].Position = document.getElementById("position").value,

                localStorage.setItem("Employee", JSON.stringify(storedItems))
            alert("Updated user")
        }
    }
    document.getElementById("employeeForm").reset();
    displayData()
}

// DELETE USER DATA
function deleteUser(selectedId) {
    var storedItems = JSON.parse(window.localStorage.getItem('Employee'));

    let confirmDelete = "Are you sure you want to delete this Employee?";

    if (confirm(confirmDelete)) {
        for (var i = 0; i < storedItems.length; i++) {
            if (storedItems[i].Id === selectedId) {
                storedItems.splice(i, 1);
                alert("Deleted Employee")
                localStorage.setItem("Employee", JSON.stringify(storedItems));
            }
        }
        displayData()
    }
}

$(document).ready(function () {
    var table = $('table').DataTable({
        "paging": true,
        "pageLength": 5,
        "info": false,
        "ordering": false,
        "lengthChange": false,
        "searching": false,
    });
});