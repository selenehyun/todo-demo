import axios from "axios";

const API_HOST = "http://localhost:8080/api";

const client = {
  getTodos: async () => {
    const { data } = await axios.get(`${API_HOST}/todos`);
    return data.todos;
  },
  addTodo: async (value) => {
    const { data } = await axios.post(`${API_HOST}/todos`, {
      userId: 1, // FIXME: hardcoding
      value,
    });

    return data.todo;
  },
};

export default client;
