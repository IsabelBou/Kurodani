const {
  basicEffectExtraction,
  basicCardExtraction,
} = require("./src/clients/dataExtraction");
const { runMigrations } = require("./src/orm/migration");

runMigrations();
basicEffectExtraction();
basicCardExtraction();
