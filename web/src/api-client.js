import axios from "axios";

const API_HOST = "http://localhost:8080/api";

const client = {
  getTodos: () => axios.get(`${API_HOST}/todos`),
  addTodo: (value) =>
    axios.post(`${API_HOST}/todos`, {
      value,
    }),
  editTodo: async (todoId, { order, value, done } = {}) => {
    if (!order && !value && done === undefined) {
      return;
    }

    return axios.patch(`${API_HOST}/todos/${todoId}`, {
      value,
      order,
      done,
    });
  },
  deleteTodo: (todoId) => axios.delete(`${API_HOST}/todos/${todoId}`),
};

export default client;
