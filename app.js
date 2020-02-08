// Require necessary dependencies 
const express = require('express');

// Initialize express
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));