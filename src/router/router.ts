export interface RouterInterface {
    title: string,
    children?: Array<RouterInterface>,
    path: string,
    name: string,
    component: React.ComponentType
}