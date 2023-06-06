import { request } from "../request";

// 获取  logs 数据
export const getLogRecords = <T>() => request.get<T>('/tid.itealab.net/api/log/executionRecords')

// 获取日志数据（img/vedio）记录
export const getDetailLog = <T>(id: string) => request.get<T>(`/tid.itealab.net/api/log/executionRecords/${id}/detail`) 

// 获取日志记录
export const getLogInfo = <T>(id: string) => request.get<T>(`/tid.itealab.net/api/log/executionRecords/${id}/info`)

// 获取日志详细记录
export const getLogsDetail = <T>(id: string) => request.get<T>(`/tid.itealab.net/api/log/executionRecords//${id}/correlated_data`)
