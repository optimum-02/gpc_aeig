import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 3000
};
export default appConfig;
