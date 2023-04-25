const express = require("express");
const controller = require("./controller.js");
const db = require("./db.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/reviews", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 5;
  const productId = req.body.product_id;
  const ofset = (page - 1) * count;
  console.log(productId, page, count);
  const query = `SELECT json_build_object(
    'product_id', $1::int,
    'page', $2::int,
    'count', $3::int,
    'results', (SELECT COALESCE(json_agg(
      json_build_object(
        'review_id', Reviews.id,
        'rating', Reviews.rating,
        'summary', Reviews.summary,
        'recommend', Reviews.recommend,
        'response', Reviews.response,
        'body', Reviews.body,
        'date', Reviews.date_made,
        'reviewer_name', Reviews.reviewer_name,
        'helpfulness', Reviews.helpfulness,
        'photos', (SELECT COALESCE(json_agg(
          json_build_object(
            'id', Reviews_photos.id,
            'url', Reviews_photos.url
            )
          ))
          FROM Reviews_photos WHERE Reviews_photos.review_id = Reviews.id
          )
        )
    ))))
    FROM Reviews WHERE product_id = $1::int`;
  const values = [productId, page, count];
  try {
    const allReviews = await db.query(query, values);
    res.json(allReviews.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/reviews/meta", async (req, res) => {
  try {
    const metaData = await db.query(
      "SELECT * FROM Characteristics WHERE product_id = $1",
      [req.body.product_id]
    );
    res.json(metaData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/f", async (req, res) => {
  try {
    const metaData = await db.query(
      "SELECT * FROM Characteristic_reviews WHERE review_id = $1",
      [req.body.review_id]
    );
    res.json(metaData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/reviews", async (req, res) => {
  var max = 0;

  try {
    const { rows } = await db.query("SELECT MAX(id) FROM REVIEWS");
    max = rows[0].max;
    console.log("max value", max);
    console.log("maxReviewID value", rows);
  } catch (err) {
    console.error("error getting max", err.message);
  }

  try {
    const postQuery = await db.query(
      `INSERT INTO Reviews
        (id, product_id, rating, date_made, summary, body, recommend, reviewer_name, reviewer_email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id`,
      [
        max + 1,
        req.body.product_id,
        req.body.rating,
        Date.now(),
        req.body.summary,
        req.body.body,
        req.body.recommend,
        req.body.reviewer_name,
        req.body.reviewer_email,
      ]
    );
    res.json(postQuery.rows);
    res.sendStatus(201);
  } catch (err) {
    console.error("error posting", err.message);
  }
});

app.listen(port, () => console.log(`app listening on port ${port}`));
