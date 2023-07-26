const mysql = require('mysql2/promise');

async function db(qr,miter) {
 try {
   const conn = await mysql.createConnection('mysql://e7wpr3huec7d7wnzct25:pscale_pw_oGsROscKpsxxfoJ1b6t1k6FStEbip6CS5V7yfkvkuON@aws.connect.psdb.cloud/rechat?ssl={"rejectUnauthorized":true}');
   const [res,text] = await conn.query(qr,miter);
   conn.end();
    return res
 } catch (err) {
   throw err;
 }
}


module.exports = db