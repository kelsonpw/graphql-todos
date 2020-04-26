import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/graphql_todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (...args) => {
  console.error('Connection error: ', ...args);
});

db.once('open', () => {
  console.log('Connection Successful!');
});

const Todo = mongoose.model(
  'Todo',
  new mongoose.Schema({
    text: String,
    complete: { type: Boolean, default: false },
  })
);

export default db;
export { Todo };
