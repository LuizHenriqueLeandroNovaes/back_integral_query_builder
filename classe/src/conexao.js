const knex = require('knex')(
    {
        client: 'pg',
        connection: {
            user: 'postgres',
            host: 'localhost',
            database: 'market_cubos',
            password: 'shaka',
            port: 5432
        },
    }
)

module.exports = knex;