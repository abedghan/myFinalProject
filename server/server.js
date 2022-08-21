const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const xss = require('xss-clean')
const mongoSanitizer = require('express-mongo-sanitize')
const routes = require('./routes')
const app = express()
const {handleError,convertToApiError} = require('./middleware/api_error')
const passport = require('passport')
const {jwtStrategy} = require('./middleware/passport')

// connect to mongo db
const mongoUri = (`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}
?retryWrites=true&w=majority`)
mongoose.connect(mongoUri);
///PARSING
app.use(bodyParser.json());
////SANITIZE
app.use(xss())
app.use(mongoSanitizer())
//passport
app.use(passport.initialize());
passport.use('jwt',jwtStrategy);

///Routes
app.use('/api',routes);
//handleError
app.use(convertToApiError)
app.use((err,req,res,next)=>{
handleError(err,res);
})
port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
}); 
