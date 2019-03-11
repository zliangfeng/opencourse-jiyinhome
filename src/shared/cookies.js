import Cookies from "universal-cookie";
export const cookies = new Cookies();

const exclude_paths = ["/", "/login", "/help", "/feedback"];
const default_paths = [];

export const isGranted = pathname => {
    const account = cookies.get("account");
    const current =
        "/" +
        pathname
            .split("/")
            .slice(1)
            .shift();
    if (exclude_paths.includes(current)) return true;

    if (account && default_paths.includes(current)) {
        return true;
    } else {
        return (
            account &&
            account.grants &&
            Array.isArray(account.grants) &&
            account.grants.includes(current)
        );
    }
};

export const renderUserInfo = () => {
    const account = cookies.get("account");
    if (!account) return "未登入";
    return account.email;
};
