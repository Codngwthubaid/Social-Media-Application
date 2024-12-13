const app = require("./app");
const { connectDB } = require("./config/database");

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);

})