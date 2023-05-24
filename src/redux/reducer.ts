import { cloneDeep } from "lodash"
/**
 * 定义默认数据，并导出一个函数
*/
interface ToDoItem {
    id: string
}
interface DefaultState {
    todoList: Array<ToDoItem>
}
// 定义默认数据
const defaultState: DefaultState = {
    todoList: []
}
// 导出函数
export default (state = defaultState, action: any) => {
    const newState = cloneDeep(state)
    switch (action.type) {
        case 'updateTotoList':
            newState.todoList = action.value
            break
    }
    return newState 
}