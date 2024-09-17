import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 3000
};
