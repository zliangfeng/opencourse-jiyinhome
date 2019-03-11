const ErrorType = {
    ER_DUP_ENTRY: "保存失败，编码已经存在",
    ER_SAVE_FAIL: "保存失败，服务器无正确响应",
    ER_UPDATE_NO_ID: "保存失败，更新记录没有ID",
    ER_INVALID_PHONE_NUMBER: "手机号码格式错误",
    ER_LOGIN_FAIL: "登入失败，账号或密码不正确"
};

export default code => code === undefined ? "" : ErrorType[code] || "操作失败";
