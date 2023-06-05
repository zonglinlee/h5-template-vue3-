import axios from "axios";
import { http } from "@/utils/http";
import Cookie from "js-cookie";

const APPID = "wxc3fd0a2535104a35";
const SECRET = "wxc3fd0a2535104a35"; // SECRET 客户端不允许存放
const REDIRECT_URI = "http://localhost:5173/#/home";
const SCOPE = "snsapi_userinfo";
const STATE = "success";
const wechatRedirectUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`;

const TOKEN_INFO = "TOKEN_INFO";
const USER_INFO = "USER_INFO";
export type wechatToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
} | null;

export type wechatUserInfo = {
  openid: string;
  nickname: string;
  headimgurl: string;
  unionid?: string;
  province: string;
  city: string;
  country: string;
  sex: number;
} | null;
const userInfo: wechatToken = getUserInfo();
export async function initUserInfo() {
  // 用户未登录过
  if (!userInfo) {
    openWechatAccessPage();
  } else {
    try {
      // const result = await validateToken(
      //   tokenInfo!.access_token,
      //   tokenInfo!.openid
      // );
      // const errcode = result.data.errcode;
      // if (errcode === 0) {
      //   // accesstoken 有效
      // } else if (errcode === 40003) {
      //   const newToken = await refreshToken(tokenInfo!.refresh_token);
      //   saveTokenInfo(newToken.data);
      //   const { access_token, openid } = newToken.data;
      //   const userData = await getUserInfoFromWechat(access_token, openid);
      //   saveUserInfo(userData.data);
      // } else {
      //   console.error(result);
      // }
      const userData = await getUserInfoFromCallbackServer(userInfo.openid);
      saveUserInfo(userData as wechatUserInfo);
    } catch (e) {
      console.error(e);
    }
  }
}

export function saveTokenInfo(data: wechatToken) {
  window.localStorage.setItem(TOKEN_INFO, JSON.stringify(data));
}
export function getTokenInfo() {
  const tokenInfo = window.localStorage.getItem(TOKEN_INFO);
  if (tokenInfo) return JSON.parse(tokenInfo);
  return null;
}

export function saveUserInfo(data: wechatUserInfo) {
  // window.localStorage.setItem(USER_INFO, JSON.stringify(data));
  Cookie.set(USER_INFO, data, { expires: 7 });
}
export function getUserInfo() {
  // const userInfo = window.localStorage.getItem(USER_INFO);
  const userInfo = Cookie.get(USER_INFO);
  if (userInfo) return userInfo;
  return null;
}

// 客户端只能调用回调服务器获取信息
export function openWechatAccessPage() {
  window.open(wechatRedirectUrl);
}
export function sendAuthCodeToCallbackServer(code: any) {
  return http.request({
    url: "/send/code",
    method: "get",
    params: { code }
  });
}
export function getUserInfoFromCallbackServer(openid: string) {
  return http.request({
    url: "/get/userInfo",
    method: "get",
    params: { openid }
  });
}
// getAccessCodeFromCode | validateToken | refreshToken | getUserInfoFromWechat 都应该从服务端发起
export function getAccessCodeFromCode(CODE: any) {
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${CODE}&grant_type=authorization_code`;
  return axios(url);
}
function validateToken(ACCESS_TOKEN: string, OPENID: string) {
  const url = `https://api.weixin.qq.com/sns/auth?access_token=${ACCESS_TOKEN}&openid=${OPENID}`;
  return axios.get(url);
}
function refreshToken(REFRESH_TOKEN: string) {
  const url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${APPID}&grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`;
  return axios.get(url);
}
export function getUserInfoFromWechat(ACCESS_TOKEN: string, OPENID: string) {
  const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${ACCESS_TOKEN}&openid=${OPENID}&lang=zh_CN`;
  return axios.get(url);
}
