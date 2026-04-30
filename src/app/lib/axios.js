// lib/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',  // Proxied via next.config.mjs rewrites in dev. For production static export, change back to: 'https://dg.solapur.deepgazetech.com/api'
    // You can also add headers or interceptors here if needed
});

export default instance;