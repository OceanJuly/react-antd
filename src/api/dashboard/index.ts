import { request } from "../request";

// 获取任务列表
export const getTaskList = <T>(params: any) => request.post<T>('/user/login', params, {timeout: 15000})

// 获取系统运行数据
export const getSysResource = <T>(() => request.get('/nodered.itealab.net/resources'))