import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://dev-town-task-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
