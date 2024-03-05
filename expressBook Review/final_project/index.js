const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Setting up session middleware
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Authentication middleware
app.use("/customer/auth/*", function auth(req, res, next) {
    const token = req.session.token;
    if (token) {
        jwt.verify(token, 'secret_key', function(err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});

const PORT = 5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));