const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`path: ${req.path}`);
    next();
});

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => { console.log(`MongoDB Connection: ${err ? err : 'Connected. Errors: ' + err}`)});
mongoose.set('debug', true);
console.log('Mongoose: \n', mongoose.Schema.ObjectId);

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
