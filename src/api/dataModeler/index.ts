import { request } from "../request";

// 获取  dataModeler 数据
export const getWorkSpaces = <T>() => request.get<T>('/tid.itealab.net/api/data/workspaces')

// 获取 dataModeler 单个 workspace 数据
export const getWorkSpaceDetail = <T>(name: string) => request.get<T>(`/tid.itealab.net/api/data/workspaces/${name}`)