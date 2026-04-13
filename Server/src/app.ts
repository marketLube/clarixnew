import { createExpressApp } from "./load/express.js";
import routes from "./load/routes.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

const app = createExpressApp();


app.get("/", (req, res) => {
    res.json({ message: "Clarix Server is running!" });
});

app.use("/api/v1", routes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
