import mascotas from "./EjercicioPractico/mascota.ts";

const allowedMascotasTypes = ["perros", "gatos", "serpientes"];

const getAllMascotas = async ({ response }) => {
  try {
    const allMascotas = await mascotas.find({});
    response.status = 200;
    response.body = allMascotas;
  } catch (error) {
    response.status = 500;
    response.body = { message: "Error al obtener las mascotas" };
  }
};

const getMascotaById = async ({ params, response }) => {
  try {
    const mascota = await mascotas.findOne({ _id: { "$oid": params.id } });
    if (mascota) {
      response.status = 200;
      response.body = mascota;
    } else {
      response.status = 404;
      response.body = { message: "Mascota no encontrada" };
    }
  } catch (error) {
    response.status = 500;
    response.body = { message: "Error al obtener la mascota" };
  }
};

const createMascota = async ({ request, response }) => {
  try {
    const body = await request.body();
    const mascota = body.value;

    if (!allowedMascotasTypes.includes(mascota.type)) {
      response.status = 400;
      response.body = { message: "Tipo de mascota no válido" };
      return;
    }

    const id = await mascotas.insertOne(mascota);
    mascota._id = id;
    response.status = 201;
    response.body = mascota;
  } catch (error) {
    response.status = 500;
    response.body = { message: "Error al crear la mascota" };
  }
};

const updateMascotaById = async ({ params, request, response }) => {
  try {
    const body = await request.body();
    const mascota = body.value;

    if (!allowedMascotasTypes.includes(mascota.type)) {
      response.status = 400;
      response.body = { message: "Tipo de mascota no válido" };
      return;
    }

    const { matchedCount } = await mascotas.updateOne({ _id: { "$oid": params.id } }, { $set: mascota });
    if (matchedCount) {
      response.status = 200;
      response.body = { message: "Mascota actualizada" };
    } else {
      response.status = 404;
      response.body = { message: "Mascota no encontrada" };
    }
  } catch (error) {
    response.status = 500;
    response.body = { message: "Error al actualizar la mascota" };
  }
};

const deleteMascotaById = async ({ params, response }) => {
  try {
    const { deletedCount } = await mascotas.deleteOne({ _id: { "$oid": params.id } });
    if (deletedCount) {
      response.status = 204;
    } else {
      response.status = 404;
      response.body = { message: "Mascota no encontrada" };
    }
  } catch (error) {
    response.status = 500;
    response.body = { message: "Error al eliminar la mascota" };
  }
};

export { getAllMascotas, getMascotaById, createMascota, updateMascotaById, deleteMascotaById };

