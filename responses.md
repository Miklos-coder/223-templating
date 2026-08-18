# EJS-Grundlagenno

## Daten an ein Template übergeben

In Express werden Daten beim Rendern als Objekt an res.render() übergeben.
Die Properties dieses Objekts können im EJS-Template direkt verwendet werden.

js
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Startseite',
        user: {
            name: 'Fred',
            age: 22
        },
        names: ['Fred', 'Bob', 'Peter']
    });
});


Im Template können einfache Werte und komplexe Datenstrukturen ausgegeben werden.
Mit `<%= ... %>` wird der Wert HTML-escaped ausgegeben.

ejs
<h1><%= title %></h1>
<p>Name: <%= user.name %></p>
<p>Alter: <%= user.age %></p>


## Kontrollstrukturen

EJS verwendet normales JavaScript in den Tags `<% ... %>`.
Damit kann man zum Beispiel `if`-Abfragen und Schleifen schreiben.

ejs
<% if (names.length > 0) { %>
    <ul>
        <% names.forEach((name) => { %>
            <li><%= name %></li>
        <% }); %>
    </ul>
<% } else { %>
    <p>Keine Namen verfügbar.</p>
<% } %>


`<% ... %>` führt JavaScript aus, gibt aber selbst nichts aus.
`<%= ... %>` gibt einen Wert escaped aus.
`<%- ... %>` gibt unescaped HTML aus und wird deshalb typischerweise für Partials verwendet.

## Partials einbinden

Partials sind wiederverwendbare EJS-Dateien, zum Beispiel für Header, Navigation oder Footer.
Sie können mit `include()` eingebunden werden.

ejs
<%- include('partials/header', { title: 'Startseite' }) %>

<main>
    <h1><%= title %></h1>
</main>

<%- include('partials/footer') %>


Beispiel für `views/partials/header.ejs`:

ejs
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>


Beispiel für `views/partials/footer.ejs`:

ejs
</body>
</html>


## Überlegung

EJS ist für einfache Express-Anwendungen gut geeignet, weil Templates nah an HTML bleiben
und JavaScript direkt für Bedingungen und Schleifen genutzt werden kann. Wichtig ist,
Benutzerdaten normalerweise mit `<%= ... %>` auszugeben, damit HTML escaped wird.
`<%- ... %>` sollte nur verwendet werden, wenn wirklich bewusst HTML eingefügt werden soll.
