const express= require("express");
const app= express();
const path=require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const supabase = require("./supabaseClient");
require("dotenv").config();

const port=8080;



app.use(cors({
  origin: ["https://intern-dashboard-f4yw.onrender.com"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});
app.get("/login", (req, res) => {
    res.render("login.ejs");
});
app.get("/leaderboard", (req, res) => {
    res.render("leaderboard.ejs");
});
app.get("/rewards", (req, res) => {
    res.render("rewards.ejs");
});

app.get("/", async (req, res) => {

    const username = req.query.username || "";
    console.log("🔍 Query username:", req.query.username);

    console.log("🔍 Requested username:", username); 
    let intern = null;
   const { data, error } = await supabase
  .from("intern")
  .select("*, user!inner(*)")
  .eq("user.username", username);
  

if (error) {
  console.error("Supabase error:", error);
} else {
  console.log("Supabase returned intern:", data);
  console.log("❌ Supabase error:", error);
}

    res.render("home.ejs", { intern: data[0] || null });
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const { data: existingUser, error: selectError } = await supabase
        .from("user")
        .select("*")
        .eq("email", email);

    if (selectError) {
        console.error("Supabase SELECT error:", selectError);
        return res.json({ message: "Database error during email check" });
    }

    if (existingUser.length > 0)
        return res.json({ message: "Email already exists" });

    const { data, error } = await supabase
        .from("user")
        .insert([{ username, email, password }]);

    if (error) {
        console.error("Supabase INSERT error:", error);
        return res.json({ success: false, message: "Error occurred while inserting" });
    }

    res.json({ success: true, message: "User registered successfully", username, email });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("email", email)
        .eq("password", password);

    if (error || data.length === 0)
        return res.json({ success: false, message: "Wrong email or password" });

    res.json({
        success: true,
        message: "Login successful",
        username: data[0].username,
        email: data[0].email,
    });
});

app.get('/api/leaderboard', async (req, res) => {
    const { data, error } = await supabase
        .from("intern")
        .select("username, donations")
        .order("donations", { descending: true });

    if (error) {
        console.error("❌ Supabase error:", error);
        return res.status(500).json({ success: false, message: "Error fetching leaderboard" });
    }
    console.log(data)
    res.json(data); 
});

    

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})
