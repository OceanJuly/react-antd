import { request } from "../request";

// 获取任务列表
// export const getTaskList = <T>(config: any) => request.get<T>('/flow.itealab.net/flowable-task/form-api/form-repository/form-definitions', {}, config)
export const getTaskList = <T>(config: any) => request.get<T>('/flow.itealab.net/flowable-task/process-api/runtime/tasks', {}, config)

// 完成某个任务
export const completeTask = <T>(info: any) => request.post<T>(`/flow.itealab.net/flowable-task/process-api/runtime/tasks/${info.id}`, info.params, info.config)

// 获取系统运行数据
export const getSysResource = () => request.get('/nodered.itealab.net/resources')