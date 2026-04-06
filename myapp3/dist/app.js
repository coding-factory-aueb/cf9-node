import express from 'express';
const app = express();
const port = 3000;
app.get('/user', (req, res) => {
    console.log("Get endpoint");
    res.send("Hello users");
});
app.listen(port, () => {
    console.log("Server is up");
});
//# sourceMappingURL=app.js.map