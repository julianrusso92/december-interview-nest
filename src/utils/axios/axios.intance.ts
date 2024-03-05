import axios from 'axios';
import { config } from '../../config/config';

const axiosApiLayerInstance = axios.create({
    baseURL: config.apiLayerBaseUrl,
    headers: {
        apikey: config.apiLayerKey
    }
});

export default axiosApiLayerInstance;