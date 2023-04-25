const axios = require("axios");

test("get reviews", async () => {
  const results = await axios({
    method: "get",
    url: "http://localhost:3000/reviews?page=1&count=5",
    data: { product_id: "12" },
  });
  console.log(results.data);
  expect(results.status).toEqual(200);
});
