import Cookies from "js-cookie";

const Cookie = () => {
    return {
        setpublicUserCookie: (data) => {
            const expiryDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // 2 hours in ms
            Cookies.set("userData", JSON.stringify(data), { expires: expiryDate });
        },
        getpublicUserCookie: () => {
            const data = Cookies.get("userData");
            return data ? JSON.parse(data) : null;
        },
        clearUserCookie: () => {
            Cookies.remove("userData");
        },
    };
};

export default Cookie;
