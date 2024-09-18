const dotenv =require('dotenv');

dotenv.config();

const appConfig = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
    jwtSecret:process.env.JWT_SECRET,
    SALT: process.env.SALT
};
module.exports= appConfig;
