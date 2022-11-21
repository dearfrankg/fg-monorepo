import axios from "axios";

axios.defaults.withCredentials = true;

export const getFolders = () => axios.get("http://localhost:4000/api/get-folders");

export const createFolder = () => axios.get("http://localhost:4000/api/create-folder/d");
