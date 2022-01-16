# dev-academy-2022-exercise-toni-salminen
My submission for solita dev-academy-2022 assigment

## Link to running app
https://dev-academy-2022-tonisalminen.herokuapp.com/

## Matched requirements
- CSV parsing and validation is done in the backend [/util](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/tree/main/util)
- Endpoints to fetch data from farms with different granularities (by month, by metric) [server.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/server.js) [BackendConnection.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/front-end/src/components/BackendConnection.js) [crud.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/database/crud.js)
- Show data in table format [DataTable.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/front-end/src/components/DataTable.js)
- Add filtering options (found on table itself and when selecting dropdown items data is fetched on selected parameters(filtering)) [DropdownList.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/front-end/src/components/DropdownList.js)
- Show data in graphs [DataChart.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/front-end/src/components/DataChart.js) (If no specific farm is selected no graph is shown. If no metric is selected, shows all metrics of the chosen farm in graph. If metric and farm are selected, shows the selected metric of the chosen farm)
- Running backend in Cloud (the whole app runs online) [Heroku](https://dev-academy-2022-tonisalminen.herokuapp.com/) api calls are enabled too, for example: [rainFall](https://dev-academy-2022-tonisalminen.herokuapp.com/api/searchfarmmetric?farmname=PartialTech%20Research%20Farm&metrictype=rainFall)

## Screenshots
<p float="left">
  <img width="600" src="https://user-images.githubusercontent.com/56744277/149639428-758abace-c927-4183-ad3d-346037f92652.png">
  <img width="600" src="https://user-images.githubusercontent.com/56744277/149639460-65791199-2105-4e51-9ba4-c6ee5013ff2c.png">
  <img width="600" src="https://user-images.githubusercontent.com/56744277/149639474-5b126d48-bcec-4286-aa73-a7a5f3a6dae2.png">
  <img width="600" src="https://user-images.githubusercontent.com/56744277/149639515-f58c73ce-3a5f-43f1-8bde-34c1097e5401.png">
</p>

## Run app locally
### Back-end
-You would need an SQL-database with the following structure:
```
CREATE TABLE farmdata (
  `id` INT NOT NULL AUTO_INCREMENT,
  `farmname` VARCHAR(45) NOT NULL,
  `datevalue` DATETIME NULL,
  `metrictype` VARCHAR(45) NOT NULL,
  `metricvalue` DECIMAL(3,2) NOT NULL,
  PRIMARY KEY (`id`));
```
- Clone the repository
- Navigate to the app directory
- Install dependencies with ```npm install```
- Replace [config.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/database/config.js) credentials with your own
- Run command ```node app.js```
### Front-end
- Enable the line ```//const baseUrl = 'http://localhost:8000/api/';``` in [BackendConnection.js](https://github.com/Coudini/dev-academy-2022-exercise-toni-salminen/blob/main/front-end/src/components/BackendConnection.js) so the front-end recognises your local server
- Navigate to front-end directory and run command ```npm start```
