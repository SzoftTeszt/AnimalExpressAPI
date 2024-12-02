const mysql = require("mysql2/promise")
const {config} = require("../config")
// config.db

// const config = require("../config")
// config.config.db

async function query(sql) {
    const connection = await mysql.createConnection(config.db)
    try{
        const [result] = await connection.execute(sql)
        return result
    }
    finally{
        await connection.end()
    }
    
    
    // const result = await mysql.connection.query(sql, params)
    // return result[0]

}

module.exports={query}