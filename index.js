const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

const path = require('path');

const sequelize = require("./config/database");

const apiRoutes = require('./routes/api');


// Cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(
    multer({ storage: fileStorage })
    .single('content_images')
);

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json({
    extended: false
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

sequelize.sync().then((result) => {
    app.listen(3000);
    console.log('Database Conected. ..')
}).catch((err) => {
    console.log('Databes not conected. ..');
})

app.use("/api/posts", apiRoutes);
