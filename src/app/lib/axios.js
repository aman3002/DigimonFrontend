// lib/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dg.panchkula.deepgazetech.com/api',
    // You can also add headers or interceptors here if needed
});

export default instance;