const express = require('express');
const mysql2 = require('mysql2');
const parser = express.urlencoded({extended:false});
const path = require('path');

const app = express();

const conn = mysql2.createConnection({
 host: 'localhost',
 user: 'root', 
 password: '', 
 database: 'test9999' 
});

// Раздаем статические файлы из папки (css, img и другие)
app.use(express.static(__dirname));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4000, () => {
    console.log('Сервер успешно запущен');
});


app.post('/aloalo', parser, (req, res) => {
    const name_s = req.body.name_s;
    const email = req.body.email;
    const message_s = req.body.message_s;
    conn.query("INSERT INTO messages(name_s, email, message_s) VALUES (?, ?, ?)", [name_s, email, message_s], (err, results) => 
        {
            if (err) {
                console.error('Ошибка при сохранении сообщения:', err);
                return res.status(500).send('Ошибка сервера');
            }
           
        }
    );
});
