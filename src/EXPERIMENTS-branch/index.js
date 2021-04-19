const $RefParser = require('@apidevtools/json-schema-ref-parser');
const fs = require('fs');

$RefParser.dereference(
  `https://json.schemastore.org/jekyll.json`,
  (err, schema) => {
    if (err) {
      console.error(err);
    } else {
      // `schema` is just a normal JavaScript object that contains your entire JSON Schema,
      // including referenced files, combined into a single object
      fs.writeFileSync('./output.json', JSON.stringify(schema, null, 2), {
        encoding: 'utf8'
      });
    }
  }
);
