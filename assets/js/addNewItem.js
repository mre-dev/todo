let flagInput, inputValue, todoObject = {}, method = "submit", todoTempObject ={};
const BASE_URL = "https://618ace5834b4f400177c48c0.mockapi.io";

document.addEventListener("DOMContentLoaded", function () {
    method = window.location.search.split('=')[1] != undefined ? "edit" : "submit";
    let tempId = window.location.search.split('=')[1];

    if(method == "edit") {
        document.getElementById("submitInput").innerHTML = "Save";
        const fetchOption = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${BASE_URL}/todos/${tempId}`, fetchOption)
        .then(async result => await result.json())
        .then(async data => {
            if(await data == "Not found"){
                window.location.replace("404.html");
            } else {
                todoTempObject = await data;
                document.getElementById("inputText").value = data.title;
                document.getElementById("inputDescription").value = data.description;
                document.getElementById("inputDueDate").value = data.dueDate;
            }
        })
        .catch(error => error);
    }
});

document.forms.addForm.addEventListener('submit', function(event) {  
    event.preventDefault();

    if(event.target['inputText'].value == "" || event.target['inputText'].value == null || event.target['inputText'].value == undefined){
        changeInputDesign("add", "TitleError" , "inline-block", "inputText", "ChangeBorder", "InputTextLabel", "ChangeColor");
        return;
    } else {
        changeInputDesign("remove", "TitleError", "none", "inputText", "ChangeBorder", "InputTextLabel", "ChangeColor");
    }

    if(event.target['inputDueDate'].value == "" || event.target['inputDueDate'].value == null || event.target['inputDueDate'].value == undefined){
        event.preventDefault();
        changeInputDesign("add", "DateError" , "inline-block", "inputDueDate", "ChangeBorder", "InputDateLabel", "ChangeColor");
        return;
    } else {
        changeInputDesign("remove", "DateError", "none", "inputDueDate", "ChangeBorder", "InputDateLabel", "ChangeColor");
    }
    document.getElementById("submitInput").disabled = true;
    document.getElementById("submitInput").style.opacity = "0.5";
    document.getElementById("submitInput").style.cursor = "wait";


    if(method == "submit") {
        createObject(event);
    } else if (method == "edit") {
        updateObject(event);
    }


});

function changeInputDesign(operatior, element1, option1, element2, option2, element3, option3) {
    if(operatior == "add"){
        document.getElementById(element1).style.display = option1;
        document.getElementById(element2).classList.add(option2);
        document.getElementById(element3).classList.add(option3);
    } else if(operatior == "remove"){
        document.getElementById(element1).style.display = option1;
        document.getElementById(element2).classList.remove(option2);
        document.getElementById(element3).classList.remove(option3);
    }
}

async function createObject(formEvent) {

    let lastId;

    await fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(data => lastId = data[data.length - 1].id)
    .catch(error => lastId = 0);

    lastId++;
    todoObject["id"] = lastId.toString();
    todoObject["title"] = formEvent.target["inputText"].value;
    todoObject["description"] = formEvent.target["inputDescription"].value;
    todoObject["dueDate"] = formEvent.target["inputDueDate"].value;
    todoObject["checked"] = false;
    todoObject["createdAt"] = new Date().getTime();
    todoObject["updatedAt"] = new Date().getTime();

    addTodo(todoObject);
}

async function addTodo(obj) {
    const fetchOptions = {
		method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify(obj)
	};

    await fetch(`${BASE_URL}/todos`, fetchOptions)
    .then(response => response.json())
    .then(data => {
        showMessage("add", "Successful", "The todo Successfuly submited");
    })
    .catch( error => {
        showMessage("remove", "Error !", "The todo Not submited");
    });

    document.getElementById("submitInput").disabled = false;
    document.getElementById("submitInput").style.opacity = "1";
    document.getElementById("submitInput").style.cursor = "pointer";
}

function closeMessage() {
    document.getElementById("message").classList.add("hideMessage");
}

async function updateObject(event) {

    todoTempObject.title = event.target["inputText"].value;
    todoTempObject.description = event.target["inputDescription"].value;
    todoTempObject.dueDate = event.target["inputDueDate"].value;
    todoTempObject.updatedAt = new Date().getTime();

    const fetchOptions = {
		method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify(todoTempObject)
	};

    await fetch(`${BASE_URL}/todos/${todoTempObject.id}`, fetchOptions)
    .then(response => response.json())
    .then(data => {
        showMessage("add", "Successful", "The todo Successfuly Edited");
    })
    .catch(error => {
        showMessage("remove", "Error !", "The todo Dont edit");
    });

    document.getElementById("submitInput").innerHTML = "Add";
    method = "submit";
    document.getElementById("submitInput").disabled = false;
    document.getElementById("submitInput").style.opacity = "1";
    document.getElementById("submitInput").style.cursor = "pointer";
    window.history.pushState("", "", window.location.href.split("?")[0]);
}

function showMessage(status, messageTitle, messageText) {
    if(status == "add") {
        document.getElementById("message").classList.remove("hideMessage");
        document.getElementById("message").classList.add("success");
        document.getElementById("message").classList.remove("error");
        document.getElementById("messageTitle").innerHTML = messageTitle;
        document.getElementById("messageText").innerHTML = messageText;
        document.getElementById("addForm").reset();
    } else if(status == "remove") {
        document.getElementById("message").classList.remove("hideMessage");
        document.getElementById("message").classList.add("error");
        document.getElementById("message").classList.remove("success");
        document.getElementById("messageTitle").innerHTML = messageTitle;
        document.getElementById("messageText").innerHTML = messageText;
    }
}