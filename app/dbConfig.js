module.exports = {
  developmentDb: process.env.MONGODB_URL,
  testDB: process.env.TESTDB_URL,
  productionDb: process.env.PRODUCTION_DB
};