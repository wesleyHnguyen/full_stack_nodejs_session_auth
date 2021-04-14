const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser'); // parse the cookie
const expressSession = require('express-session'); // to create session for login user

const { cors, handleError, notFound } = require('./middleware');
const { 
    listProducts, 
    getProduct, 
    createProduct, 
    editProduct, 
    deleteProduct,
    listOrders,
    createOrder,
    deleteOrder
} = require('./api-02');

const port = process.env.PORT || 1337
const app = express()

const sessionSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'iam123';

passport.use(
    new Strategy(function(username, password, cb){
        const isAdmin = (username === 'admin') && (password === adminPassword)
        if(isAdmin) cb(null, { username: 'admin'})

        cb(null, false)
    })
)

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));


app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(
    expressSession({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => 
    res.json({success: true})
)

app.get('/products', listProducts)
app.get('/products/:id', getProduct);
app.post('/products', ensureAdmin ,createProduct);
app.put('/products/:id', ensureAdmin ,editProduct);
app.delete('/products/:id', ensureAdmin ,deleteProduct);

app.get('/orders', ensureAdmin ,listOrders);
app.post('/orders', ensureAdmin ,createOrder);
app.delete('/orders/:id', ensureAdmin ,deleteOrder);

app.use(handleError);
app.use(notFound);

app.listen(port, () => console.log(`Server listening on port ${port}`));

function ensureAdmin(req, res, next) {
    const isAdmin = req.user && req.user.username === 'admin'

    if (isAdmin) return next()

    res.status(401).json({ error: 'Unauthorized' });
}