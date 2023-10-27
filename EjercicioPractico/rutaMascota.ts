import { Router } from "./EjercicioPractico/deps.ts";
import * as endpoint from "./EjercicioPractico/resolvers.ts";

const router = new Router();
router
  .get("/api/mascotas", endpoint.getAllMascotas)
  .get("/api/mascotas/:id", endpoint.getMascotaById)
  .post("/api/mascotas", endpoint.createMascota)
  .put("/api/mascotas/:id", endpoint.updateMascotaById)
  .delete("/api/mascotas/:id", endpoint.deleteMascotaById);

export default router;
