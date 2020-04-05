const path = require('path')
const target = process.env.TARGET

function resolve(dirpath) {
  return path.resolve(__dirname, dirpath)
}

module.exports = {
  entry: './index.js',
  output: {
    path: resolve('./dist'),
    filename: 'easy-axios.js',
    libraryTarget: target,
    library: 'Axios'
  },
  devtool: 'cheap-module-source-map',
}
