export default {
  input: `js/index.js`,
  output: [
    {
      file: 'bumpygraph.js',
      name: 'BumpyGraph',
      format: 'umd',
      sourcemap: false,
      freeze: false,
    },
  ],
  watch: {
    include: 'js/**',
  },
};
