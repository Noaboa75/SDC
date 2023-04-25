import http from "k6/http";
import { sleep, check } from "k6";
import productIds from "./seed.js";

export const options = {
  vus: 10,
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should complete within 500ms
    http_req_failed: ["rate<0.1"], // error rate should be less than 10%
  },
  discardResponseBodies: true,
  stages: [
    { duration: "1m", target: 10 },
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 50 },
    { duration: "1m", target: 10 },
  ],
};

export default function main() {
  const productId = productIds[Math.floor(Math.random() * productIds.length)];

  const getReqReviews = {
    method: "GET",
    url: `http://localhost:3000/reviews`,
    body: {
      product_id: productId,
    },
  };

  const batch = [getReqReviews];

  const responses = http.batch(batch);

  responses.forEach((res) => {
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });

  sleep(0.1);
}
