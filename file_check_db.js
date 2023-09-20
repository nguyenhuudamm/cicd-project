const { Client } = require('pg');

// Thay đổi các thông tin kết nối theo cấu hình của bạn
const dbConfig = {
  user: 'mypostgre2',
  password: 'mypostgre2',
  host: 'mypostgre2.cl8d1ofvgo48.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'mypostgre2',
};

const client = new Client(dbConfig);

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    // Thực hiện các truy vấn hoặc công việc khác ở đây nếu cần
  })
  .catch(error => {
    console.error('Error connecting to PostgreSQL:', error);
  })
  .finally(() => {
    client.end();
  });