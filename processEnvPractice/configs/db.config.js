// 누락되는 값이 없도록 기본 값으로 설정

const configs = {
    database: process.env.DATABASE || 'localhost',
    port: process.env.PORT || 3306,
    username: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || 'admin',
    dialect: process.env.DIALECT || 'mysql',
    connectTimeout: Number(process.env.CONNECT_TIMEOUT || 1000)
  }

module.exports = configs;