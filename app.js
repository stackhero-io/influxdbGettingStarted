require('dotenv').config();
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const os = require('os');


(async () => {
  if (!process.env.INFLUXDB_HOST) {
    console.error('You have to define credentials in the `.env` file (see the `.env-example` file as an example).');
    process.exit(1);
  }


  // Initiate InfluxDB
  const influxdb = new InfluxDB({
    url: `https://${process.env.INFLUXDB_HOST}`,
    token: process.env.INFLUXDB_TOKEN
  });


  // Create a write API, expecting point timestamps in nano seconds (can be 's', 'ms', 'us', 'ns')
  const writeApi = influxdb.getWriteApi(
    process.env.INFLUXDB_ORGANIZATION,
    process.env.INFLUXDB_BUCKET,
    'ns'
  );


  // Setup default tags for all writes through this API
  writeApi.useDefaultTags({
    location: os.hostname()
  });


  // Function to generate a random temperature
  const temperatureRandom = () => 20 + Math.round(100 * Math.random()) / 10;


  // Write a point with the current (client-side) timestamp
  console.log('🚀 Sending data point 1...');
  const point1 = new Point('temperature')
    .tag('setName', 'point1')
    .floatField('value', temperatureRandom());
  writeApi.writePoint(point1);
  writeApi.flush();
  console.log('👍 Point 1 added!', '\n');


  // Write a point with a custom timestamp
  console.log('🚀 Sending data point 2...');
  const point2 = new Point('temperature')
    .tag('setName', 'point2')
    .floatField('value', temperatureRandom())
    .timestamp(new Date());
  writeApi.writePoint(point2);
  writeApi.flush();
  console.log('👍 Point 2 added!', '\n');


  // Send a lot of data
  // For advanced usages see https://github.com/influxdata/influxdb-client-js/blob/master/examples/writeAdvanced.mjs
  const pointsToSend = 10000;
  console.log(`🏎  Sending ${pointsToSend.toLocaleString()} points as fast as possible...`);
  const temperaturesRandom = new Array(pointsToSend).fill(0).map(() => temperatureRandom());

  // Send data
  for (const temperatureRandom of temperaturesRandom) {
    const point = new Point('temperature')
      .tag('setName', 'speedTest')
      .floatField('value', temperatureRandom);
    writeApi.writePoint(point);
  }

  // Flush data not sent yet to the server
  await writeApi.flush();
  console.log(`🌟 ${pointsToSend.toLocaleString()} points sent!`);


  // Close connection (very important to be sure that the buffer data has been flushed)
  await writeApi.close();
})().catch(error => {
  console.error('');
  console.error('🐞 An error occurred!');
  console.error(error);
  process.exit(1);
});