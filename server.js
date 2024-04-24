const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
var cors = require('cors')

const app = express();
const port = 3001;

app.use(cors())

app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'postgres',
  password: '@Jerry0101',
  port: 5432,
});
app.get('/leave-applications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leave_applications');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint to handle leave application form submission
app.post('/leave-application', async (req, res) => {
  const { employee_name, start_date, end_date, reason } = req.body;
  try {
    const result = await pool.query('INSERT INTO leave_applications (employee_name, start_date, end_date, reason, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [employee_name, start_date, end_date, reason, 'Pending']);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
