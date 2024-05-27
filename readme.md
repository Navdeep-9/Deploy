apply forEach as follow

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .project-box{
            margin:10px;
            width: 100px;
            height: 100px;
            background: green;
        }
    </style>
</head>
<body>

    <% projects.forEach(function(project){ %>
        <h1><%=project.name%></h1>
        <h2><%=project.description  %></h2>
        <%}) %>

</body>
</html>