## 目标功能

- [x] 支持多种身份认证模式

  - [x] 图形验证码 + 短信验证码
  - [ ] github 第三方登录(还需要优化)
  - [ ] 游客模式下 默认拦截所有路由

- [] 有效期内验证码 - 缓存至 redis
- [] 手机验证码
- [] 用户注册模块
- [] 如果未登录 其他模块统一不能查看

## 涉及技术 note.md

- oauth2 授权码模式 第三方登录
- jwt token

### 用户注册流程

- /api/notify/v1/captcha?type=register 图形验证接口 获取图形验证码
- /api/notify/v1/send_code 短信验证接口 获取短信（判断 1 图形验证码未过期且验证码正确 2 短信验证码过期或未发送的情况下才发送
- "/api/user/v1/register 注册接口 通过用户和短信注册

### 返回值（code, msg, data）统一管理工具类

- BackCode 类
  - 统一封装状态成功/失败的 res 格式
- CodeEnum
  - 存储不同错误的状态码和 msg
