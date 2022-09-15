# Getting started with InfluxDB


## How to send data from Node.js to InfluxDB

You can find here some examples of Node.js code to send data to an InfluxDB V2 server.

These examples are designed to run with Stackhero for InfluxDB.
You'll more informations about Stackhero here:
- [InfluxDB cloud](https://www.stackhero.io/en/services/InfluxDB/benefits)
- [InfluxDB pricing](https://www.stackhero.io/en/services/InfluxDB/pricing)
- [InfluxDB documentations](https://www.stackhero.io/en/services/InfluxDB/documentations)

The code uses the [official influxDB library](https://github.com/influxdata/influxdb-client-js) to connect to your InfluxDB server from Node.js.


## How to use these examples

This example will connect to your InfluxDB server.

1. Connect to your InfluxDB web UI (on `https://XXXXX.stackhero-network.com`) and create a bucket (`Load Data`/`Buckets`/`Create Bucket`). Give it the name `stackherotest`.

1. Still in InfluxDB web UI and create a token (`Load Data`/`API Tokens`/`Generate API token`/`Read/Write API Token`).

1. Retrieve the token you have just created (click on its name to get it).

1. Clone this repository: `git clone https://github.com/stackhero-io/influxdbGettingStarted && cd influxdbGettingStarted`

1. Copy the file `.env-example` to `.env` and fill it with your credentials.

1. Install dependencies: `npm install`.

1. Run the script: `npm run start`.


You can see the script code in the file `app.js` and see how it works to use it as an example.