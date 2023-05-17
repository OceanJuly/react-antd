import { request } from "../request";

// 获取任务列表
export const getTaskList = <T>(params: any) => request.post<T>('/user/login', params, {timeout: 15000})