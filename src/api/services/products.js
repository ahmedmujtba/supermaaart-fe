import axios from "axios";

const Url = "https://ivory-seagull-coat.cyclic.app/api";

export async function getProducts() {
  try {
    const response = await axios.get(`${Url}/products`);
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err);
    return err;
  }
}

export async function getProductDetails(id) {
  try {
    const response = await axios.get(`${Url}/products/${id}`);
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err);
    return err;
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
    response = await axios.post(`${Url}/shopping-list`, {
      username,
      name,
      price,
      pictureLink,
      supermarket,
    });
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err);
    return err;
  }
}
