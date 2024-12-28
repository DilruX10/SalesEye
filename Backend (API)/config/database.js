const mongoose = require('mongoose');

const connectDatabase = () => {
  if (!process.env.DB_URI) {
    throw new Error('DB_URI environment variable is not defined');
  }

  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, //avoid deprecation warnings and ensure compatibility with future versions of Mongoose.
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
  });
};

module.exports = connectDatabase;
