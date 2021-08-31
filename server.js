const express = require('express')
const session = require('express-session')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use('/supersecret', serveStatic(path.join(__dirname, '/dist')))
const port = process.env.PORT || 8080
app.listen(port)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

console.log("[+] server started on port " + port)



/************ DATABASE **************/

const config = require('./db/config')
const MySQLStore = require('express-mysql-session')(session)
const dbOptions = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
}

const sessionStore = new MySQLStore(dbOptions);

const secret = require('./secret')
app.use(session({
    secret: secret.session_secret,
    store: sessionStore,
    moves: "",
    score: 0
}));


/************ API CALLS **************/

app.get('/api/getgame', (req, res) => {
    const sql = `SELECT game_id FROM cases ORDER BY cases.game_id DESC LIMIT 1`
    sessionStore.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result[0] }));
    })
})

app.get('/supersecret/api/getgame', (req, res) => {
    const sql = `SELECT game_id FROM cases ORDER BY cases.game_id DESC LIMIT 1`
    sessionStore.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result[0] }));
    })
})

app.post('/supersecret/api/newgame', (req, res) => {
    const nextGame = parseInt(req.query.current) + 1
    const sql = `INSERT INTO cases (phone,game_id,guess) VALUES ('new_game', ${nextGame},1000)`
    sessionStore.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": req.query.current + 1 }));
    })
})

app.get('/supersecret/api/getlist', (req, res) => {
    const sql = `SELECT * FROM cases WHERE game_id = ${req.query.gameid} ORDER BY guess ASC`
    console.log(sql)
    sessionStore.query(sql, function (err, result) {        
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    })
})

app.get('/supersecret/api/getrankings', (req, res) => {
    const sql = `SELECT guess, count(*) AS c FROM cases WHERE game_id = ${req.query.gameid} GROUP BY guess`
    console.log(sql)
    sessionStore.query(sql, function (err, result) {        
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    })
})

app.get('/supersecret/api/getwinner', (req, res) => {
    const sql = `SELECT phone, guess, count(*) FROM cases WHERE game_id = ${req.query.gameid} GROUP BY guess ORDER BY count(*), guess ASC LIMIT 1 `
    console.log(sql)
    sessionStore.query(sql, function (err, result) {        
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result[0] }));
    })
})

app.post('/supersecret/api/login', (req, res) => {
    const result = (req.query.pw == "lordmambo")
    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
})

app.post('/api/sendguess', (req, res) => {
    const sql = `INSERT INTO cases (phone,guess,game_id) VALUES ('${req.body.phone}', ${req.body.guess}, ${req.body.gameid})`
    console.log(sql)
    sessionStore.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    })
})
