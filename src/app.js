const http = require("http");
const getUsers = require("./modules/users");
const port = 3003;
const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${hostname}:${port}`);

  if (url.searchParams.has("users")) {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  } else if (url.searchParams.has("hello")) {
    const name = url.searchParams.get("hello");

    if (name && name.trim() !== "") {
      response.status= 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain";
      response.write(`Hello, ${name}!`);
      response.end();
    } else {
      response.status = 400;
      response.statusMessage = "Bad Request";
      response.header = "Content-Type: text/plain";
      response.write("Enter a name");
      response.end();
    }
    return;
  } else if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, World!");
    response.end();

    return;
  } else {
    response.status = 500;
    response.statusMessage = "Internal Server Error";
    response.header = "Content-Type: text/plain";
    response.write("");
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
