export const ADD_TODO = `
  mutation ($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;
