import { v2 as cloudinary } from 'cloudinary';
import configs from '../configs';


cloudinary.config({
    cloud_name: configs.cloudinary.cloud_name,
    api_key: configs.cloudinary.cloud_api_key,
    api_secret: configs.cloudinary.cloud_secret
});

export default cloudinary;
