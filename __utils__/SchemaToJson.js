/**
 * Citation: 
 * author: GDLMadushanka
 * original repository: git@github.com:GDLMadushanka/JSONSchemaTransformer.git
 * 
 */

const INT_MIN = 0;
const INT_MAX = 100;
const FLOAT_MIN = 0.1;
const FLOAT_MAX = 100.1;
const DECIMAL_POINTS = 3;
const ARR_MIN = 2;
const STRING_LENGTH = 8;


function traverseObject(obj, parentObj) {
  if ("type" in obj) {
    var type = obj["type"].trim();
    switch (type) {
      case "boolean":
        {
          parentObj = true;
          break;
        }
      case "integer":
        {
          var min = INT_MIN;
          var max = INT_MAX;
          if (obj["minimum"] != null) {
            min = obj["minimum"];
          }
          if (obj["maximum"] != null) {
            max = obj["maximum"];
          }
          if (obj["exclusiveMaximum"] != null) {
            max = obj["exclusiveMaximum"] - 1;
          }
          if (obj["exclusiveMinimum"] != null) {
            min = obj["exclusiveMinimum"] + 1;
          }
          parentObj = generateRandomNumber(min, max);
          break;
        }
      case "number":
      case "float":
        {
          var min = FLOAT_MIN;
          var max = FLOAT_MAX;
          if (obj["minimum"] != null) {
            min = obj["minimum"];
          }
          if (obj["maximum"] != null) {
            max = obj["maximum"];
          }
          if (obj["exclusiveMaximum"] != null) {
            max = obj["exclusiveMaximum"] - 1;
          }
          if (obj["exclusiveMinimum"] != null) {
            min = obj["exclusiveMinimum"] + 1;
          }
          parentObj = generateRandomFloat(min, max);
          break;
        }
      case "null":
        {
          parentObj = null;
          break;
        }
      case "string":
        {
          var length = STRING_LENGTH;
          if (obj["minLength"] != null) {
            length = obj["minLength"];
          }
          if (obj["maxLength"] != null) {
            length = obj["maxLength"];
          }
          if (obj["pattern"] != null) {
            parentObj = generateRandomStringRegex(obj["pattern"],length).substring(0,length);
          } else {
            parentObj = randomString(length);
          }
          break;
        }
      case "array":
        {
          return processArray(obj);
        }
      case "object":
        {
          var properties = obj["properties"];
          delete obj["required"];
          for (var key in properties) {
            properties[key] = traverseObject(properties[key], properties);
          }
          // replace the main object at the end
          return properties;
        }
    }
  } else {
    for (var key in obj) {
      obj[key] = traverseObject(obj[key], obj);
    }
  }
  return parentObj;
}


function processArray(obj) {
  var itemsObj = obj["items"];
  var tempArr = [];
  if (Array.isArray(itemsObj)) {
    itemsObj.forEach(function(element) {
      tempArr.push(traverseObject(element, obj));
    });
    parentObj = tempArr;
  } else {
    var arrType = itemsObj["type"];
    var minItems = ARR_MIN;
    if (obj["minItems"] != null) {
      minItems = obj["minItems"];
    }
    if (obj["maxItems"] != null) {
      minItems = obj["maxItems"];
    }
    var arr = []
    switch (arrType) {
      case "boolean":
        {
          parentObj = [true, false];
          break;
        }
      case "integer":
        {
          for (i = 0; i < minItems; i++) {
            arr.push(generateRandomNumber(INT_MIN, INT_MAX));
          }
          parentObj = arr;
          break;
        }
      case "number":
      case "float":
        {
          for (i = 0; i < minItems; i++) {
            arr.push(generateRandomFloat(FLOAT_MIN, FLOAT_MAX));
          }
          parentObj = arr;
          break;
        }
      case "string":
        {
          for (i = 0; i < minItems; i++) {
            arr.push(randomString(STRING_LENGTH));
          }
          parentObj = arr;
          break;
        }
      case "null":
        {
          for (i = 0; i < minItems; i++) {
            arr.push(null);
          }
          parentObj = arr;
          break;
        }
    }
  }
  return parentObj;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function generateRandomFloat(min, max) {
  return parseFloat(parseFloat((Math.random() * (max - min) + min).toFixed(DECIMAL_POINTS)));
};

function generateRandomStringRegex(regex, minLen) {
  var result = "";
  do {
    result = new RandExp(regex).gen();
  } while(result.length < minLen);
  return result;
}

export function convertSchemaToJson(schema) {
  var rootValue = schema["title"];
  var result = traverseObject(schema, schema);
  return JSON.stringify(result, null, "\t");
}
