import axios from "axios";

const Url = "https://nc-marketplace-api-aa.herokuapp.com";

export function getItems() {
  return axios.get(`${Url}/api/items`).then((res) => {
    console.log(res.data);
    return res.data;
  });
}
