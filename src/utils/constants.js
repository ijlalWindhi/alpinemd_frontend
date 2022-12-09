import { getLocalStorage } from "./helper/localStorage";

const LOCAL_STORAGE_TOKEN = "domain";

const BASE_API = "http://127.0.0.1:1337";

const checkLogged = () => {
    const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
    if (token) {
        return true;
    }
};

export { LOCAL_STORAGE_TOKEN, checkLogged, BASE_API };
