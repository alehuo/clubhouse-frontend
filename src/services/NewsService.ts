// Newspost service
import customAxios from "./custom-axios";

const apiEndpoint = "api/v1/newspost";

const getNewsposts = async (token: string) => {
  const response = await customAxios(token).get(apiEndpoint);
  return response.data;
};

const addNewspost = async (token: string, title: string, message: string) => {
  const result = await customAxios(token).post(
    apiEndpoint,
    {
      title,
      message,
    },
    {
      baseURL: process.env.REACT_APP_BACKEND_URL,
    },
  );
  return result.data;
};

const editNewspost = async (
  token: string,
  id: number,
  title: string,
  text: string,
) => Promise.resolve({ id, title, text });

const deleteNewspost = async (token: string, id: number) => {
  const res = await customAxios(token).delete(apiEndpoint + "/" + id);
  return res.data;
};

export default { getNewsposts, addNewspost, deleteNewspost, editNewspost };
