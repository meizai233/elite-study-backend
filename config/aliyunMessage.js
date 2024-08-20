const axios = require("axios");

// 发送短信验证码
const sendMsgCode = (mobile, randomCode) => {
  const url = "https://jmsms.market.alicloudapi.com/sms/send";
  const templateId = "JM1000372"; // 替换为实际模板ID
  const appCode = "f4b19daa8e1d46f3b1e0a283d0ac36e4"; // 替换为实际AppCode

  return axios.post(`${url}`, null, {
    params: {
      mobile: mobile,
      templateId: templateId,
      value: randomCode,
    },
    headers: {
      Authorization: `APPCODE ${appCode}`,
    },
  });
};

module.exports = { sendMsgCode };
