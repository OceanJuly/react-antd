// 字符串路径数据转化为 tree 结构
export function path2tree(strArr: Array<string>) {
    const res: any = []
    strArr.forEach((str: string) => {
        const nodeArray = str.startsWith('/')
            ? str.split('/').slice(1, str.length)
            : str.split('/')
        let children = res
        // 循环构建子节点
        for (const i of nodeArray) {
            const node = {
                title: i
            }
            if (children.length === 0) {
            children.push(node)
            }
            let isExist = false
            for (const j in children) {
            if (children[j].title === node.title) {
                if (!children[j].children) {
                children[j].children = []
                }
                children = children[j].children
                isExist = true
                break
            }
            }
            if (!isExist) {
            children.push(node)
            if (!children[children.length - 1].children) {
                children[children.length - 1].children = []
            }
            children = children[children.length - 1].children
            }
        }
    })
    return res
}