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

<p align="center"><a href="https://mre-dev.github.io/Todo/">----- Click To View Demo -----</a></p>

<h2></h2>

<p>
<strong>To-Do API : </strong>You can Create a free API from <a href="https://mockapi.io/">mockapi.io</a></p>

<div>
    <p>Steps to build a dedicated API :</p>
    <ul>
        <li>1. First, register at <a href="https://mockapi.io/">mockapi.io.</a></li>
        <li>2. Then click on the + sign to add a new API.</li>
        <li>3. Choose a custom name for your API and create the API.</li>
    </ul>
    </br>
    <p>Now you need to create your API fields :</p>
    <ul>
        <li>1. Select your API.</a></li>
        <li>2. Click on <strong>New resource</strong>.</li>
        <li>3. On the page that opens, in the <b>Resource Name</b> field, write the phrase <b>todos</b>.</li>
        <li>4. Then create your fields in the Schema section according to the table below</li>
        <table>
            <thead>
                <th>
                    <td>Field Name</td>
                    <td>Field Type</td>
                </th>
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
    </ul>
</div>