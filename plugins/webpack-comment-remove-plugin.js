const { validate } = require('schema-utils');
const path = require('path');
const fs = require('fs')

const schema = {
  type: "object",
  properties: {
    doneNote: {
      type: "string",
      description: "after work notification..."
    }
  },
  additionalProperties: false,
  require: ["doneNote"]
}

class WebpackCommentRemovePlugin {
  constructor(options) {
    validate(schema, options);

    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.done.tap('WebpackCommentRemovePlugin', (state) => {
      fs.readFile(path.join(__dirname, '../dist/built.js'),'utf-8', (err, source) => {
        console.log('err: ', err);
        let newSource = source.replaceAll(/(\/\* harmony export \*\/)|(\/\*{3,7}\/)/g, '');

        fs.writeFile(path.join(__dirname, '../dist/built.js'), newSource, (error) => {
          console.log('error: ', error);

        })

        const evals = newSource.match(/eval.*\?"\);/g);
        console.log('evals: ', evals);
        for (let i = 0; i < evals.length; i++) {
          const current = evals[i];
          const format = current.replaceAll(/(eval\(")|(\?"\);)/g, '').replaceAll(/(\\n)|(\\r)/g, '\n').replaceAll(/\n{2,}/g, '\n\n').replaceAll(/\n/g, '\n\t').replaceAll(/\\"/g, '"');
          
          newSource = newSource.replace(/eval.*\?"\);/, format);
        }


        fs.writeFile(path.join(__dirname, '../dist/built.format.js'), newSource, (error) => {
          console.log('error: ', error);

        })
      })
    })
  }
}

module.exports = WebpackCommentRemovePlugin;