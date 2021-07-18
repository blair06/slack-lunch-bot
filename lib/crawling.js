const axios = require("axios");
const tokenSet = require("../config/key");

/* GET users listing. */
async function getRestaurants(location) {
  try {
    const restaurants = await axios
      .get("https://openapi.naver.com/v1/search/local.json", {
        params: {
          query: location,
          display: 1,
          start: 1,
          sort: "random",
        },
        headers: {
          "X-Naver-Client-Id": tokenSet.ClientID,
          "X-Naver-Client-Secret": tokenSet.ClientSecret,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const resToJSON = JSON.stringify(data.items[0]);
        const obj = JSON.stringify(resToJSON);
        const resToJSON2 = JSON.parse(obj);
        const resToJSON3 = JSON.parse(resToJSON2);

        return resToJSON3;
      });
    return restaurants;
  } catch (error) {
    console.log(error);
  }
}

exports.getRestaurants = getRestaurants;
