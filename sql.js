const fs = require('fs');
const initSqlJs = require('sql.js');
const filebuffer = fs.readFileSync('main.db');

initSqlJs().then(function (SQL) {
    // Load the db
    const db = new SQL.Database(filebuffer);
    var res = JSON.stringify(db.exec("SELECT * FROM fb_word_test"));
    fs.writeFileSync("./db.json", res)
    const jdb = require("./db.json");
    var answer = new Object;
    var length = jdb[0].values.length;
    answer.id = new Array(length);
    answer.ans = new Array(length);
    answer.ans1 = new Array(length);
    answer.ans2 = new Array(length);
    answer.ans3 = new Array(length);
    for (var pos = 0; pos < length; pos++) {
        answer.id[pos] = jdb[0].values[pos][0];
        answer.ans[pos] = jdb[0].values[pos][4];
        answer.ans1[pos] = jdb[0].values[pos][5];
        answer.ans2[pos] = jdb[0].values[pos][6];
        answer.ans3[pos] = jdb[0].values[pos][7];
    }

    answer.pos = new Array;

    for (let i = 0; i < Math.ceil(length / 1000); i++) {
        answer.pos[i] = answer.id[(i + 1) * 1000];
    }
    answer.pos[Math.ceil(length / 1000) - 1] = answer.id[length - 1] + 1;

    fs.writeFileSync("./task_db.json", JSON.stringify(answer))


    fs.unlinkSync("./db.json");
});
