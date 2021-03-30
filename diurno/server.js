const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/diurno' , (req, res) => {
    res.render("index.html")
})

app.set('Puerto', process.env.PORT || 3001);
app.listen(app.get('Puerto'), (req, res) => {console.log("Server running")} );

app.get('/table/:numbre', async (req, res) => {
    const { numbre } = req.params;
    data = [];
    await fs.unlink('table.txt', function (err) {
        if (err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
            almacenarTabla(res, numbre, data);
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
            almacenarTabla(res, numbre, data);
        }
    });
})

async function almacenarTabla(res, numbre, data) {
    await fs.writeFileSync('table.txt', `Tabla\nLa base usada es: ${numbre}` + '\n', { flag: 'a' }, (err) => { })
    for (var i = 1; i <= 12; i++) {
        data[i - 1] = `${numbre} * ${i} = ${numbre * i}`;
        await fs.writeFileSync('table.txt', data[i - 1] + '\n', { flag: 'a' }, (err) => { })

    }
    console.log(data)
    res.send({ data });
}

app.get('/table', (req, res) => {
    fs.readFile('table.txt', 'utf8', (err, data) => {
        if (err) return console.log(err);
        if (data) return res.json(data.split('\n'));
    })
})

