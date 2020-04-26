import { GraphQLServer } from 'graphql-yoga';
import db, { Todo } from './db';

const typeDefs = `
type Todo {
  id: ID!
  text: String!
  complete: Boolean!
}
type Query {
  getTodos: [Todo]
}
type Mutation {
  addTodo(text: String!): Todo!
  deleteTodo(id: ID!): String
  editTodo(id: ID!, text: String, complete: Boolean): Todo!
  toggleAllTodos(complete: Boolean!): [Todo]
  deleteCompleted: [Todo]
}
`;

const resolvers = {
  Query: {
    getTodos: () => Todo.find(),
  },
  Mutation: {
    addTodo: async (_, { text }) => {
      const todo = new Todo({ text });
      await todo.save();
      return todo;
    },
    deleteTodo: async (_, { id }) => {
      await Todo.findByIdAndRemove(id);
      return 'Todo deleted';
    },
    editTodo: (_, { id, text, complete }) => {
      const update = {
        ...(text && { text }),
        ...(typeof complete === 'boolean' && { complete }),
      };
      return Todo.findByIdAndUpdate(id, update);
    },
    toggleAllTodos: async (_, { complete }) => {
      await Todo.updateMany({}, { complete });
      return Todo.find();
    },
    deleteCompleted: async () => {
      await Todo.deleteMany({ complete: true });
      return Todo.find();
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => console.log(`Server running on port: ${port}`));
