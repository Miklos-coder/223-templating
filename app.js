const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const namen = ['Fred', 'Bob', 'Peter'];

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/namen', (req, res) => {
    res.render('namen', { namen });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
