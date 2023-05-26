// import { makeAutoObservable } from "mobx";

// interface TodoPropsType {
//     data: {
//         todoList: Array<any>
//     }
//     updateTodoList: (value: Array<any>) => void
// }

// const todoListStore: TodoPropsType = makeAutoObservable<TodoPropsType>({
//     data: {
//         todoList: [
//             {
//                 key: '1',
//                 event: 'John Brown',
//                 formKey: ''
//             }
//         ]
//     },
//     updateTodoList: (value: Array<any>) => {
//         todoListStore.data.todoList = value;
//     }
// })

// export default todoListStore

// import { makeAutoObservable } from "mobx";

// class TodoListStore {
//     constructor() {
//         makeAutoObservable(this)
//     }
//     todoList: Array<any> = []
//     updateTodoList = (value: Array<any>) => {
//         this.todoList = value
//     }
// }

// export default new TodoListStore();

import { makeAutoObservable } from 'mobx'

interface StoreProps {
    data: {
        todoList: Array<any>;
    },
    updateTodoList: (value: Array<any>) => void
}

const store: StoreProps = makeAutoObservable<StoreProps>({
    data: {
        todoList: [
            {
                id: '123'
            }
        ]
    },
    updateTodoList: (val: Array<any>) => (store.data.todoList = val)// action
})

export default store