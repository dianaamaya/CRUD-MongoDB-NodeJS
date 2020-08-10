const mongoose = require('mongoose');

//get variables
const { NOTES_APPMONGODB_HOST, NOTES_APPMONGODB_DATABASE} = process.env;

//set the link to connect to database according to NODE_ENV
const MONGODB_URI = `mongodb://${NOTES_APPMONGODB_HOST}/${NOTES_APPMONGODB_DATABASE}`;

//connect to database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then( db => console.log('Database is connected'))
.catch(err => console.log(err));
