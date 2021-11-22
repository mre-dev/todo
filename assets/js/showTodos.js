let flagInput, inputValue, allItem = [], pageLenght, limitData = 10, pageNumber = 1, deleteId;
const BASE_URL = "https://618ace5834b4f400177c48c0.mockapi.io";

document.addEventListener("DOMContentLoaded", async function(event) {
    
    const fetchOptions = {
		method: "GET"
	};

    allItem = await fetch(`${BASE_URL}/todos`, fetchOptions)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);

    if(allItem.length == 0){
        listItem.innerHTML = '<p style="margin-top: 2rem; font-size: 1.6rem;">Nothing To Show ...</p> <a style="font-size: 1.4rem;" href="index.html"> Click To Add First</a>';
        return;
    }
    pageLenght = Math.ceil(allItem.length / limitData);
    localStorage.setItem("allItemTodo", JSON.stringify(allItem));
    createPagination();

    limitData = window.location.search.split("&")[1].split("=")[1];
    pageNumber = window.location.search.split("&")[0].split("=")[1];

    if(pageNumber > pageLenght) {
        window.location.replace("404.html");
    }

    addItemToList(allItem);
});

function addItemToList(todoArray) {
 
    let limitArray = [];

    for (let i = (allItem.length - 1) - ((pageNumber - 1) * 10); i >= allItem.length - (pageNumber * limitData); i--) {
        if(allItem[i] != undefined){
            limitArray.push(allItem[i]);
            let newItem = document.createElement('li');
            
            newItem.setAttribute("id", `item-${todoArray[i].id}`);
            newItem.innerHTML =
            `
            <div class="top-item">
                <div>
                    <input type="checkbox" id="check-${todoArray[i].id}" onchange="checkedItem(this.id);">
                    <span id="title-${todoArray[i].id}" class="title">${todoArray[i].title}</span>
                    <span id="duDate-${todoArray[i].id}" class="date">${todoArray[i].dueDate}</span>
                </div>
                <div class="operation">
                    <div id="edit-${todoArray[i].id}" onclick="editTodo(this.id);"><span class="iconify" data-icon="la:pen"></span></div>
                    <div id="delete-${todoArray[i].id}" onclick="deleteTodoBox(this.id);" onclick=""><span class="iconify" data-icon="icomoon-free:bin"></span></div>
                    <div style="display: none;" id="submitEdit-${todoArray[i].id}" onclick="submitEditTodo(this.id);"><span class="iconify" data-icon="subway:tick" style="color: #27ae60;"></span></div>
                </div>
            </div>
            <div class="bottom-item">
                <p id="desc-${todoArray[i].id}">${todoArray[i].description}</p>
                <hr>
                <p id="date-${todoArray[i].id}">Created at <strong>${new Date(todoArray[i].createdAt).toLocaleDateString("en-US")}</strong> And Updated at <strong>${new Date(todoArray[i].updatedAt).toLocaleDateString("en-US")}</strong></p>
            </div>
            `;
            listItem.append(newItem);
        }
    }

    checkItemInPage(limitArray);
}

function checkItemInPage(todoArray) {
    todoArray.forEach(item => {
        if(item.checked == true) {
            document.getElementById("check-" + item.id).checked = true;
            document.getElementById("title-" + item.id).classList.add('checkedLine');
            document.getElementById("desc-" + item.id).classList.add('checkedLine');
            document.getElementById("duDate-" + item.id).classList.add('checkedLine');
            document.getElementById("date-" + item.id).classList.add('checkedLine');
        } else {
            document.getElementById("check-" + item.id).checked = false;
            document.getElementById("title-" + item.id).classList.remove('checkedLine');
            document.getElementById("desc-" + item.id).classList.remove('checkedLine');
            document.getElementById("duDate-" + item.id).classList.remove('checkedLine');
            document.getElementById("date-" + item.id).classList.remove('checkedLine');
        }
    });
}

function checkedItem(itemId) {
    const tempId = itemId.split('-')[1];
    if(document.getElementById("check-" + tempId).checked) {
        document.getElementById("title-" + tempId).classList.add('checkedLine');
        document.getElementById("desc-" + tempId).classList.add('checkedLine');
        document.getElementById("duDate-" + tempId).classList.add('checkedLine');
        document.getElementById("date-" + tempId).classList.add('checkedLine');
    } else {
        document.getElementById("title-" + tempId).classList.remove('checkedLine');
        document.getElementById("desc-" + tempId).classList.remove('checkedLine');
        document.getElementById("duDate-" + tempId).classList.remove('checkedLine');
        document.getElementById("date-" + tempId).classList.remove('checkedLine');
    }
    updateItemChecked(tempId);
}

function updateItemChecked(id) {
    allItem.forEach(myItem => {
        if(myItem.id == id){
            myItem.checked = !myItem.checked;
        }
    });
    updateLocalStorage();
    updateApi(id);
}

function updateLocalStorage() {
    localStorage.setItem("allItemTodo", JSON.stringify(allItem));
}

async function updateApi(id) {
    let obj = allItem.filter(item => item.id == id)[0];
    obj.updatedAt = new Date().getTime();

    const fetchOptions = {
		method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify(obj)
	};

    await fetch(`${BASE_URL}/todos/${id}`, fetchOptions)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}

function createPagination() {
    let paginationList = document.getElementById("paginationList");
    for (let i = 1; i <= pageLenght; i++) {  
        let tempLi = document.createElement("li");
        let tempLink = document.createElement("a");
        tempLink.setAttribute("href",`?page=${i}&limit=10`);
        tempLink.innerHTML = i;
        tempLi.append(tempLink);
        paginationList.append(tempLi);
    }
}


function deleteTodoBox(todoId) {
    const tempId = todoId.split('-')[1];
    deleteId = tempId;

    document.getElementById("deleteBox").classList.add("showDisplay");
    document.getElementById("body").classList.add("grayBackground");

    let tempInfo = allItem.filter(item => item.id == tempId);
    document.getElementById("itemTitle").innerHTML = tempInfo[0].title + "\xa0\xa0\xa0\xa0 - \xa0\xa0\xa0\xa0" + tempInfo[0].dueDate;

}

async function deleteItem(id) {
    const method = id.split('-')[0];

    if(method == "deleteItem") {

        let tempInfo = allItem.filter(item => item.id == deleteId);
        const fetchOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempInfo[0])
        };
    
        await fetch(`${BASE_URL}/todos/${deleteId}`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            data;
            document.getElementById("item-" + deleteId).remove();
        })
        .catch(error => console.log(error));
    }

    document.getElementById("deleteBox").classList.remove("showDisplay");
    document.getElementById("body").classList.remove("grayBackground");
}

function editTodo(todoId) {
    const tempId = todoId.split('-')[1];
    window.location.replace(`index.html?id=${tempId}`);
}