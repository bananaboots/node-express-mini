// implement your API here
// import db from './data/db.js'; // ES2015 modules
const express = require('express');

const db = require('./data/db.js'); // CommonJS modules

const server = express();

server.get('/', (req, res) => {
    db.find()
        .then(users => {
            //res.send({ users });
            res.status(418).json({ users });
        })
        .catch(err => {
            //res.send(err);
            res.json(err);
        });
});

// server.get('/api/users/:userid', (req, res) => {
//     const id = req.params.userid;

//     db.findById(id)
//         .then(user => {
//             res.json(user);
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         });
// });

server.get('/api/users/:userId', (req, res) => {
    db.findById(req.params.userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});

server.listen(5000, () => console.log('server running'));

// client > server: Accept header (application/json)
// server > client: Content-Type: (application/json; text/html)