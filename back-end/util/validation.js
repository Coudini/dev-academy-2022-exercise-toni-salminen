const Validator = require("jsonschema").Validator;
const validator = new Validator();

const dataSchema = {
    type: "object",
    properties: {
        farmName: {type: "string"},
        date: {type: ["datetime", "date"]},
        metricType: {type: "string"},
        metricValue: {type: "number"},
    },
}

const validation = {
    dataValidation: (data) => {
        return validator.validate(data, dataSchema);
    }
}

module.exports = validation;

/*
 
Accept only temperature,rainfall and PH data. Other metrics should be discarded
Discard invalid values with next rules
pH is a decimal value between 0 - 14
Temperature is a celsius value between -50 and 100
Rainfall is a positive number between 0 and 500
Data may be missing from certain dates

*/