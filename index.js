import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "museum",
    password: "Vguard@2020",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("home.ejs");
});
 app.get("/payment", (req, res) => {
    res.render("payment.ejs");
 });
 app.get("/login", (req,res)=> {
   res.render("login.ejs");
 });
 app.get("/register", (req,res)=> {
    res.render("register.ejs");
 });
app.post("/register", (req,res)=>{
    const email = req.body.username;
    const password = req.body.password;
    async function checkUser(){
    try{
        const checkResult = await db.query("SELECT * FROM userDetails WHERE email = $1", [
            email,
        ]);
        if(checkResult.rows.length>0){
            res.send("Email already exists. Try logging in.");
        } else{
            const result = await db.query(
                "INSERT INTO userDetails (email, password) VALUES ($1, $2)",
                [email, password]
            );
            console.log(result);
            res.render("home.ejs");
        }
    }
    catch(err){
        console.log(err);
    }
}
checkUser();
});

app.post("/login", async (req,res) => {
    const email = req.body.username;
    const password = req.body.password;
    try{
        const result = await db.query("SELECT * FROM userDetails WHERE email = $1", [
            email,
        ]);
        if(result.rows.length>0){
            const user = result.rows[0];
            const storedPassword = user.password;
            if(password === storedPassword){
                res.render("home.ejs");
            } else{
            res.send("Incorrect Password");
            }
        } else {
            res.send("User not found");
        }
    } catch (err) {
        console.log(err);
    }
});
app.get("/booking", (req,res) => {
    res.render("booking.ejs");
});
app.post("/booking", (req,res) => {
    res.render("paymentb.ejs");
});
app.get("/confirmation", (req,res)=> {
    res.render("confirmation.ejs");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});