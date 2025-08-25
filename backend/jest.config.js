import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest/presets/default-esm", // <-- ESM preset
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fixes .ts import resolution
  },
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
