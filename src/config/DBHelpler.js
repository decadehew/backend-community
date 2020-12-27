import mongoose from 'mongoose';
import config  from './index';

// 創建連接
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 連接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + config.DB_URL);
});

// 連接異常
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

// 斷開連接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

export default mongoose;
