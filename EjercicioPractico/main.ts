import { Application } from "./EjercicioPractico/deps.ts";
import rutaMascota from "./EjercicioPractico/rutaMascota.ts";
import { connect } from "./EjercicioPractico/mascota.ts";

const app = new Application();

await connect();  // Connect to MongoDB

app.use(rutaMascota.routes());
app.use(rutaMascota.allowedMethods());

app.listen({ port: 3000 });
console.log("Server encendido en http://localhost:3000");
