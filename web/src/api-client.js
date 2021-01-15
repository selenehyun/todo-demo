import axios from "axios";

const API_HOST = "http://localhost:8080/api";

const client = {
  getTodos: () => axios.get(`${API_HOST}/todos`),
  addTodo: (value) =>
    axios.post(`${API_HOST}/todos`, {
      value,
    }),
  editTodo: async (todoId, { order, value } = {}) => {
    if (!order && !value) {
      return;
    }

    return axios.patch(`${API_HOST}/todos/${todoId}`, {
      value,
      order,
    });
  },
};

export default client;
