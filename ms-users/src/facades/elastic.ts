import { Client } from '@elastic/elasticsearch';
import { IGithubReturn } from '../interfaces/IGithub';

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const client = new Client({ node: elasticUrl });
const index = 'users';

export const getUsers = async () => {
  const result = await client.search({
    index,
  });

  return result;
};

export const setData = async (data: IGithubReturn) => {
  const body = {
    login: data.login,
    id: data.id,
    url: data.url,
    repos_url: data.repos_url,
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
