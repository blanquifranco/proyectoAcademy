import {Pool} from 'pg';
const pool = new Pool ({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'tl94Tech#',
    database: 'Academy'
});

module.exports = pool;