const reader = new FileReader();

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
      });
    
      // return the array
      return arr;
}

const parsing = {
    
    parseCsv: (data) => {
        return new Promise((resolve, reject) => {
            if (data) {
                resolve(csvToArray(data));
            }
            else {
                reject("No data.");
            }
        });
    }
}

module.exports = parsing;