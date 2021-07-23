require("dotenv").config({ path: "./.env" });

const isEmpty = require("lodash.isempty");

/**
 * Helper function
 * @param {*} statusCode
 * @param {*} message
 * @returns
 */
const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    error: message || "An Error occurred.",
  }),
});

/**
 *
 * @param {*} error Error message
 */
const returnError = (error) => {
  console.log(error);
  if (error.name) {
    const message = `Invalid ${error.path}: ${error.value}`;
    callback(null, createErrorResponse(400, `Error:: ${message}`));
  } else {
    callback(
      null,
      createErrorResponse(error.statusCode || 500, `Error:: ${error.name}`)
    );
  }
};

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, "Missing details"));
  }
  const { title, description, reminder, status, category } = JSON.parse(
    event.body
  );

  try {
    console.log({ title, description, reminder, status, category });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ title, description, reminder, status, category }),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.get = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (isEmpty(event.body)) {
    return callback(null, createErrorResponse(400, "Missing details"));
  }
  const { title, description, reminder, status, category } = JSON.parse(
    event.body
  );

  try {
    console.log({ title, description, reminder, status, category });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ title, description, reminder, status, category }),
    });
  } catch (error) {
    returnError(error);
  }
};
