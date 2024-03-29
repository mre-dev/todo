<h1 align="center">A to-do application using API and local storage</h1>
<p align="center">A simple to-do list app built in HTML, SCSS, and JavaScript.</p>

</br>

<strong>Features and capabilities</strong>

<div>
    <ul>
        <li>Save todos using the API</li>
        <li>Access todos from any device</li>
        <li>Faster display using local storage</li>
        <li>Ability to add, edit and delete</li>
    </ul>
</div>

<h2></h2>

<p align="center"><a href="https://mre-dev.github.io/todo/">----- Click To View Demo -----</a></p>

<h2></h2>

<p>
<strong>To-Do API : </strong>You can Create a free API from <a href="https://mockapi.io/">mockapi.io</a></p>

</br>

<div>
    <p>Steps to build a dedicated API :</p>
    <ol>
        <li> First, register at <a href="https://mockapi.io/">mockapi.io.</a></li>
        <li> Then click on the + sign to add a new API.</li>
        <li> Choose a custom name for your API and create the API.</li>
    </ol>
    </br>
    <p>Now you need to create your API fields :</p>
    <ol>
        <li> Select your API.</li>
        <li> Click on <strong>New resource</strong>.</li>
        <li> On the page that opens, in the <b>Resource Name</b> field, write the phrase <b>todos</b>.</li>
        <li> Then create your fields in the Schema section according to the table below and click on create button.
        </br></br>
            <table align="left">
                <thead>
                    <tr>
                        <td>Field Name</td>
                        <td>Field Type</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>Object ID</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>dueDate</td>
                        <td>String</td>
                    </tr>
                    <tr>
                        <td>checked</td>
                        <td>Boolean</td>
                    </tr>
                    <tr>
                        <td>createdAt</td>
                        <td>Date</td>
                    </tr>
                    <tr>
                        <td>updatedAt</td>
                        <td>Date</td>
                    </tr>
                </tbody>
            </table>
        </li>
        </br></br></br></br></br></br></br></br></br></br></br></br></br></br>
        <li> Then copy the <b>endpoint API</b> address and paste it in the <b>BASE_URL</b> variable in the assets/js/showTodos.js and, assets/js/addNewItem.js files. (line two in both files)</li>
    </ol>
</div>

<h2></h2>

<p>Screenshot :</p>

<div align="center">
    <img src="assets/img/screen1.png" alt="Add Todo Page Image" width="35%" height="400px">
    <img src="assets/img/screen2.png" alt="All Todo Page Image" width="59%" height="400px">
</div>
