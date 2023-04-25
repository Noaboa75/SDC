const db = require('./db.js');

const getReviews = (req, res) => {
  db.query(`SELECT * FROM Reviews`)
    .then((results) => {res.send(results)})
    .catch((err) => {res.sendStatus(500)})
}//SQL Querie shortcuts go here

module.exports = {
  getReviews,
}

// json_agg(
//   json_build_object(
//     'review_id',reviews.id,
//     'review_rating', reviews.rating,
//     'review_date', TO_TIMESTAMP((review.date_made/1000))::date ,
//     'review_summary', reviews.summary,
//     'review_body',reviews.body,
//     'recommend', reviews.recommend,
//     'reported', reviews.reported,
//     'reviewer_name', reviews.reviewer_name,
//     'reviewer_email', reviews.reviewer_email,
//     'response', reviews.response
//     'review_helpfulness', reviews.helpfulness,
//   )) as results



// 'answers', (SELECT json_object_agg(
//   answers.id,
//   json_build_object(
//     'id', answers.id,
//     'body', answers.body,
//     'date', TO_TIMESTAMP((answers.date_written/1000))::date,
//     'answerer_name', answers.answerer_name,
//     'helpfulness', answers.helpfulness,
//     'photos', (select ARRAY(select url from answers_photos where answers_photos.answer_id=answers.id)) ) FROM answers WHERE answers.question_id = questions.id)
//   )