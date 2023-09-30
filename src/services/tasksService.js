import axios from "axios";
import { API } from "../constants/API";

export const tasksService = {
  get: () => axios.get(API).then(({ data }) => data),
  detele: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),
};
