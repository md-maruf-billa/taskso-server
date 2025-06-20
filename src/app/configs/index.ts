import "dotenv/config"
export default {
    port: process.env.PORT,
    database_url: process.env.DB_URL,
    jwt:{
        access_secret:process.env.JWT_ACCESS_SECRET,
        reset_secret:process.env.JWT_RESET_SECRET
    },
    env_type:process.env.NODE_ENV,
    bcrypt_salt_rounds:process.env.SOLD_ROUND,
    email_sender:{
        email:process.env.SENDER_EMAIL,
        password:process.env.APP_PASSWORD
    },
    front_end_url:process.env.FRONT_END_URL,
    cloudinary:{
        cloud_name:process.env.CLOUD_NAME,
        cloud_api_key:process.env.CLOUD_API_KEY,
        cloud_secret:process.env.CLOUD_SECRET
    }
}