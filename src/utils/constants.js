import { getLocalStorage } from "./helper/localStorage";

const LOCAL_STORAGE_TOKEN = "domain";

const checkLogged = () => {
    const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
    if (token) {
        return true;
    }
};

export { LOCAL_STORAGE_TOKEN, checkLogged };
