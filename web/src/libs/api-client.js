import axios from "axios";

export const API_HOST = process.env.REACT_APP_API_HOST;
const API_URL = API_HOST + "/api";

const client = {
  getTodos: () =>
    axios.get(`${API_URL}/todos`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  addTodo: (value) =>
    axios.post(
      `${API_URL}/todos`,
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
      `${API_URL}/todos/${todoId}`,
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
    axios.delete(`${API_URL}/todos/${todoId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  register: ({ email, password, confirmPassword, nickname }) =>
    axios.post(`${API_URL}/users`, {
      email,
      password,
      confirmPassword,
      nickname,
    }),
  login: ({ email, password }) =>
    axios.post(`${API_URL}/auth`, {
      email,
      password,
    }),
  getSelf: () =>
    axios.get(`${API_URL}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};

export default client;
