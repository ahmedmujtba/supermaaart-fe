import axios from "axios";

const Url = "https://ivory-seagull-coat.cyclic.app";

export async function getProducts() {
  try {
    const response = await axios.get(`${Url}/api/products`);
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err);
    return err;
  }
}

export async function getProductDetails(id) {
  try {
    const response = await axios.get(`${Url}/api/products/${id}`);
    console.log("response", response.status);
    return response;
  } catch (err) {
    console.log("catch error--", err);
    return err;
  }
}
