const http = require("http");
const getUsers = require("./modules/users");
const port = 3003;
const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${hostname}:${port}`);

  if (url.searchParams.has("users")) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();

    return;
  } else if (url.searchParams.has("hello")) {
    const name = url.searchParams.get("hello");

    if (name && name.trim() !== "") {
      response.statusCode= 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${name}!`);
      response.end();
    } else {
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write("Enter a name");
      response.end();
    }
    return;
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();

    return;
  } else {
    response.statusCode = 500;
    response.statusMessage = "Internal Server Error";
    response.setHeader("Content-Type", "text/plain");
    response.write("");
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
