import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        charset: 'tis620'
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  
    mssql: {
      client: 'mssql',
      connection: {
        server: env.get('DB_MSSQL_HOST',''),  // Provide a default empty string
        port: Number(env.get('DB_MSSQL_PORT')|| 1433),  // Use env variable with default
        user: env.get('DB_MSSQL_USER', ''),
        password: env.get('DB_MSSQL_PASSWORD', ''),
        database: env.get('DB_MSSQL_DATABASE', ''),
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/mssql'],
      },
    },
    
  },
})

export default dbConfig