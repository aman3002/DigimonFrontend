import axios from "axios";

const api = axios.create({
    baseURL: 'https://dg.wsp.deepgazetech.com:8000',  // wsp
    // baseURL: 'http://43.204.61.193/',  // digimon_osmanabad
    // baseURL: 'http://127.0.0.1:8000/',  
});

export default api;