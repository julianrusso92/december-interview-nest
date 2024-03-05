import dotenv from 'dotenv';
dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET || 'secret123$',
    expiresIn: process.env.EXPIRES_IN || '1h',
    apiLayerBaseUrl: process.env.API_LAYER_BASE_URL || "",
    apiLayerKey: process.env.API_LAYER_KEY || "",
    clientUrl: process.env.CLIENT_URL || ""
}