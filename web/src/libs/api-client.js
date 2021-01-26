import axios from "axios";

const API_HOST = process.env.API_URL || "http://localhost:8080/api";

const client = {
  getTodos: () =>
    axios.get(`${API_HOST}/todos`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  addTodo: (value) =>
    axios.post(
      `${API_HOST}/todos`,
      {
        value,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ),
  editTodo: async (todoId, { order, value, done } = {}) => {
    if (!order && !value && done === undefined) {
      return;
    }

    return axios.patch(
      `${API_HOST}/todos/${todoId}`,
      {
        value,
        order,
        done,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
  deleteTodo: (todoId) =>
    axios.delete(`${API_HOST}/todos/${todoId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  register: ({ email, password, confirmPassword, nickname }) =>
    axios.post(`${API_HOST}/users`, {
      email,
      password,
      confirmPassword,
      nickname,
    }),
  login: ({ email, password }) =>
    axios.post(`${API_HOST}/auth`, {
      email,
      password,
    }),
  getSelf: () =>
    axios.get(`${API_HOST}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

export default client;
