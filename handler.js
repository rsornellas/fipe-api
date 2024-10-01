const serverless = require("serverless-http");
const express = require("express");
const csvdb = require("csv-database")
const app = express();

app.get("/:vehicle_type", async (req, res, next) => {
  const { vehicle_type } = req.params;

  const vehicleTypeDicionar = {
    "carros": 1,
    "motos": 2,
    "caminhoes": 3
  }

  if (!vehicleTypeDicionar[vehicle_type]) {
    return res.status(200).json({
      success: false,
      result: "Tipo de veiculo invalido",
      options: Object.keys(vehicleTypeDicionar)
    });
  }

  const db = await csvdb("marcas.csv", ["id", "tipo", "name"]);

  const result = await db.get({ tipo: vehicleTypeDicionar[vehicle_type].toString() });

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result: result,
    });
  } else {
    return res.status(200).json({
      success: false,
      result: "Não encontrado",
    });
  }
});

app.get("/:vehicle_type/:brand_id", async (req, res, next) => {
  const { brand_id } = req.params;

  const db = await csvdb("modelos.csv", ["id", "tipo", "id_marca", "id_marca_modelo", "name"]);

  const result = await db.get({ id_marca: brand_id.toString() });

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result: result,
    });
  } else {
    return res.status(200).json({
      success: false,
      result: "Não encontrado",
    });
  }
});

app.get("/:vehicle_type/:brand_id/:model_id", async (req, res, next) => {
  const { model_id } = req.params;

  const db = await csvdb("modelo_anos.csv", ["id", "tipo", "id_marca", "id_modelo", "id_modelo_ano", "name"]);

  const result = await db.get({ id_modelo: model_id.toString() });

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result: result,
    });
  } else {
    return res.status(200).json({
      success: false,
      result: "Não encontrado",
    });
  }
});

app.get("/:vehicle_type/:brand_id/:model_id/:model_version", async (req, res, next) => {
  const { model_id, model_version } = req.params;

  const db = await csvdb("veiculos.csv", ["id", "tipo", "id_modelo_ano", "fipe_codigo", "id_marca", "marca", "id_modelo", "modelo", "ano", "name", "combustivel", "preco"]);

  const result = await db.get({ id_modelo: model_id.toString(), id_modelo_ano: model_version.toString() });

  if (result[0]) {
    return res.status(200).json({
      success: true,
      result: result[0],
    });
  } else {
    return res.status(200).json({
      success: false,
      result: "Não encontrado",
    });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
