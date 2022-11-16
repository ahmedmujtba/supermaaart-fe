import axios from "axios";

const Url = "https://nc-marketplace-api-aa.herokuapp.com";

const apiData = [
  {
    name: "Woodcote 6 Medium Free Range British Eggs",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
  {
    name: "Butter",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
  {
    name: "Cheese",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
  {
    name: "Olive oil",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
];
export function getProducts() {
  return Promise.resolve(apiData);
}
