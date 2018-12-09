module.exports = {
  port: process.env.PORT || 5000,
  jwtOptions: {
    secret: process.env.JWT_SECRET,
  },
  dbOptions: {
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
  }
};
