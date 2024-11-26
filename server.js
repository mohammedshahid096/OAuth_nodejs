const { PORT } = require("./src/config/index");
const app = require("./app");

function startServer() {
  app.listen(PORT, () => {
    console.log("server is running on:  http://localhost:" + PORT);
  });
}

startServer();
