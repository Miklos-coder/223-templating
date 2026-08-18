# EJS-Grundlagen

Quellen:

- GeeksforGeeks: https://www.geeksforgeeks.org/node-js/how-to-use-template-engines-in-express-js/
- EJS-Dokumentation: https://ejs.co/

## Daten an ein Template uebergeben

In Express werden Daten beim Rendern als Objekt an `res.render()` uebergeben.
Die Properties dieses Objekts koennen im EJS-Template direkt verwendet werden.

```js
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
```

Im Template koennen einfache Werte und komplexe Datenstrukturen ausgegeben werden.
Mit `<%= ... %>` wird der Wert HTML-escaped ausgegeben.

```ejs
<h1><%= title %></h1>
<p>Name: <%= user.name %></p>
<p>Alter: <%= user.age %></p>
```

## Kontrollstrukturen

EJS verwendet normales JavaScript in den Tags `<% ... %>`.
Damit kann man zum Beispiel `if`-Abfragen und Schleifen schreiben.

```ejs
<% if (names.length > 0) { %>
    <ul>
        <% names.forEach((name) => { %>
            <li><%= name %></li>
        <% }); %>
    </ul>
<% } else { %>
    <p>Keine Namen verfuegbar.</p>
<% } %>
```

`<% ... %>` fuehrt JavaScript aus, gibt aber selbst nichts aus.
`<%= ... %>` gibt einen Wert escaped aus.
`<%- ... %>` gibt unescaped HTML aus und wird deshalb typischerweise fuer Partials verwendet.

## Partials einbinden

Partials sind wiederverwendbare EJS-Dateien, zum Beispiel fuer Header, Navigation oder Footer.
Sie koennen mit `include()` eingebunden werden.

```ejs
<%- include('partials/header', { title: 'Startseite' }) %>

<main>
    <h1><%= title %></h1>
</main>

<%- include('partials/footer') %>
```

Beispiel fuer `views/partials/header.ejs`:

```ejs
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
```

Beispiel fuer `views/partials/footer.ejs`:

```ejs
</body>
</html>
```

## Ueberlegung

EJS ist fuer einfache Express-Anwendungen gut geeignet, weil Templates nah an HTML bleiben
und JavaScript direkt fuer Bedingungen und Schleifen genutzt werden kann. Wichtig ist,
Benutzerdaten normalerweise mit `<%= ... %>` auszugeben, damit HTML escaped wird.
`<%- ... %>` sollte nur verwendet werden, wenn wirklich bewusst HTML eingefuegt werden soll.
