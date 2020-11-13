const returnError = ({ message, header, statusCode, error }) => {
  if (error) {
    console.log({ returnError: error });
  }
  return {
    statusCode: statusCode || 500,
    headers: header || { "Content-Type": "text/plain" },
    body: message,
  };
};

const returnSuccess = ({ body, statusCode }) => {
  return {
    statusCode: statusCode || 200,
    body: JSON.stringify(body, null, 2),
  };
};

export { returnError, returnSuccess };
