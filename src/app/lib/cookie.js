import Cookies from "js-cookie";

const Cookie = () => {
    return {
        setpublicUserCookie: (data) => {
            Cookies.set("userData", JSON.stringify(data), { expires: 7 });
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
