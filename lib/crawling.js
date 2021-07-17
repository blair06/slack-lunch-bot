const axios = require("axios");

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
          "X-Naver-Client-Id": "35Jn3j2zkfPSLDbv2C4l",
          "X-Naver-Client-Secret": "BYHHYSgYAu",
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data.items);

        return data.items;
      });
    return restaurants;
  } catch (error) {
    console.log(error);
  }
}

exports.getRestaurants = getRestaurants;
