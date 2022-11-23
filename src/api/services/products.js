import axios from "axios";

const Url = "https://ivory-seagull-coat.cyclic.app/api";

export async function getProducts() {
  try {
    const response = await axios.get(`${Url}/products`);
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err.response.data);
    return err.response;
  }
}

export async function getProductDetails(id) {
  try {
    const response = await axios.get(`${Url}/products/${id}`);
    console.log("product details response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err.response.data);
    return err.response;
  }
}

export async function saveFavoriteItem({
  username,
  name,
  price,
  pictureLink,
  supermarket,
}) {
  try {
    const response = await axios.post(`${Url}/shopping-list`, {
      username,
      name,
      price,
      pictureLink,
      supermarket,
    });
    console.log("response in api call", response);
    return response;
  } catch (err) {
    console.log("catch error--", err.response.data);
    return err.response;
  }
}

export async function getFavoriteItem(username) {
  try {
    const response = await axios.get(`${Url}/shopping-list/${username}`);
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err.response.data);
    return err.response;
  }
}
