const express = require('express');
const PORT = 5001;

const app = express();


app.listen(PORT,function () {
    console.log(`Server is running on PORT ${PORT}`)
});