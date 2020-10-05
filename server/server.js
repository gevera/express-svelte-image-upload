const express = require('express'),
    multer = require('multer'),
    cors = require('cors'),
    app = express(),
    PORT = 5050;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const nameSaved = file.originalname;
        console.log(`NAME SAVED ====>> ${nameSaved}`);
        return cb(null, nameSaved);
    }
});

const upload = multer({
    storage
});

// app.use('/uploads/firepics', express.static('uploads'));

app.post('/upload', upload.array('photo', 3), (req, res) => {
    console.log({ data: req.files });
    res.status(200).json({ success: true });
});

app.listen(PORT, () => {
    console.log('Awesome! Waiting for your commands!');
});