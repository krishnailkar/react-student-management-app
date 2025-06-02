const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const markRoutes = require('./routes/markRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/students', studentRoutes);
app.use('/api/marks', markRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
