import pluginJs from "@eslint/js";


export default [
  pluginJs.configs.recommended,
  {
  "overrides": [
    {
      "files": ["tests/**/*"],
      "env": {
        "jest": true
      }
    }
  ]
}
];