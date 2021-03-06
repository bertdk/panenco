module.exports = {
  extends: ['monorepo'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'all',
        'docs',
        'breadcrumbs',
        'eslint-config-react',
        'formik-wizard-form',
        'formik-form-field',
        'pagination',
        'rollup-plugin-svg-sprite',
        'ui',
      ],
    ],
  },
};
