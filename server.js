const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my node website'
    })
});

app.get('/ourworks', (req, res) => {
    res.render('ourworks.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs', {
        pageTitle: 'Project'
    });
});
app.get('/login', (req, res) => {
    res.render('login.hbs', {
        pageTitle: 'Project'
    });
});
app.get('/register', (req, res) => {
    res.render('register.hbs', {
        pageTitle: 'Project'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});