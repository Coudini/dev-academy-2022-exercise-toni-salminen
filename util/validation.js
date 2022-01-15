const Validator = require("jsonschema").Validator;
const validator = new Validator();

/*
Json schema for validating data according to following ruleset:
Accept only temperature,rainfall and PH data. Other metrics should be discarded
pH is a decimal value between 0 - 14
Temperature is a celsius value between -50 and 100
Rainfall is a positive number between 0 and 500
*/
const dataSchema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "date": {"type": ["datetime", "date"]},
        "type": {"enum": ["temperature", "rainFall", "pH"]},
        "value": {"type": "number"},
    },
    "required": ["type"],
    "if": {
        "properties": {"type": {"const": "pH"}}
    },
    "then": {
        "properties": {"value": {"minimum": 0, "maximum": 14}}
    },
    "if": {
        "properties": {"type": {"const": "temperature"}}
    },
    "then": {
        "properties": {"value": {"minimum": -50, "maximum": 100}}
    },
    "if": {
        "properties": {"type": {"const": "rainFall"}}
    },
    "then": {
        "properties": {"value": {"minimum": 0, "maximum": 500}}
    }
}

// Exported function which returns a validation result based on Json Schema
const validation = {
    dataValidation: (data) => {
        return validator.validate(data, dataSchema);
    }
}

module.exports = validation;