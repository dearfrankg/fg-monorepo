import axios from "axios";
import fetch from "isomorphic-fetch";

export const service = {
  getWithAxios: ({ url, success, failure }) => axios.get(url).then(success).catch(failure),

  getWithFetch: ({ url, success, failure }) =>
    fetch(`http://localhost${url}`)
      .then((res) => res.json())
      .then((res) => success({ data: res }))
      .catch(failure),
};
