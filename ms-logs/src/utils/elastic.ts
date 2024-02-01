import { Client } from '@elastic/elasticsearch';
import { ILog } from 'interfaces/ILog';

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const client = new Client({ node: elasticUrl });
const index = 'users';
const logIndex = 'logs';

export const getUsers = async () => {
  const result = await client.search({
    index,
  });

  return result;
};

export const setData = async (login: string, url: string) => {
  const body = {
    login,
    url,
    timestamp: new Date(),
  };
  try {
    await client.index({
      index,
      body,
    });
    console.log('user saved on elastic', body);
  } catch (err) {
    console.log('error saving user', err);
  }
};

export const setDataLog = async (data: ILog) => {
  const body = {
    log: data.log,
    timestamp: new Date(),
  };
  try {
    await client.index({
      index: logIndex,
      body,
    });
    console.log('log saved on elastic', body);
  } catch (err) {
    console.log('error saving log', err);
  }
};

export const checkConnection = () => {
  return new Promise(async resolve => {
    console.log('Checking connection to ElasticSearch...');
    let isConnected = false;
    while (!isConnected) {
      try {
        await client.cluster.health({});
        console.log('Successfully connected to ElasticSearch');
        isConnected = true;
        // tslint:disable-next-line: no-empty
      } catch (_) {}
    }
    resolve(true);
  });
};
