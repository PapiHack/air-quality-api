import { Environment } from './env-types.enum';

export default () => ({
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  env: process.env.NODE_ENV || Environment.Development,
  db: {
    uri: process.env.MONGO_URI,
  },
  iqair: {
    apiKey: process.env.IQAIR_API_KEY,
    apiUrl: process.env.IQAIR_API_URL,
    apiVersion: process.env.IQAIR_API_VERSION,
  },
});
