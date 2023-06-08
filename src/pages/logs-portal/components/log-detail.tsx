import react, { useState, useEffect } from 'react'
import '../style/log-detail.less'
import AceEditorCom from '@/components/ace-editor'
import {
    RightOutlined,
    LeftOutlined,
    AlignLeftOutlined,
    PicLeftOutlined
} from '@ant-design/icons'
import {
    getDetailLog,
    getLogInfo
} from '@/api/logAPI'
import to from 'await-to-js'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ImagePreview from '@/components/basic/picture-preview'
import ImageViewer from '@/components/basic/image-viewer'
import ToolTipBtn from '@/components/basic/toolTip-btn'
import FnTree from './fn-tree'
import LogDetailModal from './log-detail-modal'
import { path2tree } from '@/utils/tree'
import { Base64 }  from 'js-base64'

function LogDetail() {
    const [code, setCode] = useState('')
    const [logs, setLogs] = useState([])
    const [language, setLanguage] = useState('')
    const [show, setShow] = useState(false)
    const [index, setIndex] = useState(0)
    const [imgs, setImgs] = useState([])
    const [showImageLog, setShowImageLog] = useState(true)
    const [showTree, setShowTree] = useState(false)
    const [treeData, setTreeData] = useState([])
    // 显示日志详情弹窗
    const [showLogDetailModal, setShowLogDetailModal] = useState(false)

    const params = useParams()
    const cardDom: any = react.createRef()

    useEffect(() => {
        async function getLogDetail() {
            const id: string = params.id || ''
            if (!id) return
            const requestArr: Array<any> = [getDetailLog(id), getLogInfo(id)]
            const [err, res]: any = await to(Promise.all(requestArr))
            if (err) return
            const detailLogs: any = []
            const pathStrs: Array<string> = []
            const info: any = res.flat().sort((a: any, b: any) => b.timestamp - a.timestamp)
            // 图片列表
            setImgs(res[0].map((a: any) => {
                return {
                    src: a.content,
                    name: a.msgName,
                    type: a.contentType,
                    id: a.timestamp
                }
            }))
            const numKeyMap: any = {}
            info.forEach((a: any) => {
                // 日志数据处理
                if (a.scripts?.length) {
                    a.scripts.forEach((b: any) => {
                        const _code: string = Base64.decode(b.scriptBase64)
                        setCode(code + _code)
                        if (!language) setLanguage(b.scriptType)
                    })
                } else if (a.tag !== 'status') {
                    let obj: any = {}
                    if (a.loggerName === 'sut-log') {
                        obj = {
                            time:  moment(a.timestamp).format('YYYY/MM/DD h:mm:ss'),
                            url: a.content,
                            msg: a.msgName,
                            source: '[===>client]',
                            logType: 1,
                            type: a.contentType
                        }
                    } else {
                        obj = {
                            time: moment(a.timestamp).format('YYYY/MM/DD h:mm:ss'),
                            source: a.resourceName || 'System',
                            color: a.result === 'passed' ? '#3e9779' : '#333' ,
                            msg: a.msg || '',
                            logType: 2
                        }
                    }
                    obj.content = `${obj.time} [${obj.source}] ${obj.msg}`
                    detailLogs.push(obj)
                }
                // 处理树形数据结构
                if (a.jsonPath) {
                    const reg = /^[0-9]+\.?[0-9]*$/
                    const path: Array<string> = a.jsonPath.split('/')
                    path.forEach((str: string, i: number) => {
                        const flag: boolean = reg.test(str)
                        if (flag) {
                            const key: string = i + str
                            const text: string = a.actionDescription
                                ? a.resourceName + ' ' + a.actionDescription
                                : a.description
                            path[i] = i === path.length - 1 ? text : numKeyMap[key] || text
                            if (!numKeyMap[key] && i === path.length - 1) numKeyMap[key] = text
                        } 
                    })
                    pathStrs.push(path.join('$$'))
                }
            })
            // 处理树节点
            setTreeData(path2tree(pathStrs))
            setLogs(detailLogs)
        }
        getLogDetail()
    }, [])

    function changeCardShow() {
        cardDom.current.style.transform  = !showTree ? 'rotateY(180deg)' : ''
        setShowTree(!showTree)
    }

    function showPicturePreview(e: any) {
        const index = e.target.attributes['data-index'].value
        setIndex(Number(index))
        setShow(true)
    }

    function changeLogShow() {
        setShowImageLog(!showImageLog)
    }

    function showLogDetail() {
        setShowLogDetailModal(!showLogDetailModal)
    }

    function renderLogInfo() {
        let imgIndex = 0
        return logs.map((log: any, idx: number) => {
            if (log.logType === 2) {
                return (
                    <div
                        key={idx}
                        className="log-line"
                        style={{color: log.color}}
                    >{log.content}</div>
                )
            } else {
                if (!showImageLog) return
                let play: any
                if (log.type === 'IMAGE') {
                    play = (
                        <img data-index={imgIndex} key={idx} src={log.url} onClick={(e) => showPicturePreview(e)} />
                    )
                    imgIndex++
                } else {
                    play = (
                        <video data-index={imgIndex} key={idx} controls onClick={(e) => showPicturePreview(e)}>
                            <source src={log.url} type="video/mp4"></source>
                        </video>
                    )
                    imgIndex++
                }
                return (
                    <div key={idx}  className="log-line" style={{ color: '#3d84b6'}}>
                        <span>{log.content}</span>    
                        {play}
                    </div>
                )
            }
        })
    }

    function renderRightContentBtn() {
        const p: any = {
            tip: `${showImageLog ? '隐藏' : '显示'}图片、视频日志`,
            btnProps: {
                type: 'text',
                icon: showImageLog ? <PicLeftOutlined /> : <AlignLeftOutlined />
            }
        }
        return (
            <ToolTipBtn {...p}></ToolTipBtn>
        )
    }

    return (
        <>
            <div className="log-detail-wrap">
                <div className="left-content" ref={cardDom}>
                    <div className="code-wrap">
                        <div className="header">
                            <div className="title">Script(passed)</div>
                            <div className="right-btn" onClick={changeCardShow}><RightOutlined /></div>
                        </div>
                        <AceEditorCom code={code} mode={language} readOnly={false}></AceEditorCom>
                    </div>
                    <div className="tree-wrap">
                        <div className="header">
                            <div className="title">Script(passed)</div>
                            <div className="right-btn" onClick={changeCardShow}><LeftOutlined /></div>
                        </div>
                        <FnTree treeData={treeData}></FnTree>
                    </div>
                </div>
                <div className="right-content">
                    <div className="header">
                        <div className="title">日志</div>
                        <div className="right-btn">
                            <div className="btn-item" onClick={showLogDetail}>
                                <ToolTipBtn tip="显示日志详情" btnProps={{type: 'text'}}>
                                    <i className="iconfont icon-xiangqing"></i>
                                </ToolTipBtn>
                            </div>
                            <div className="btn-item" onClick={changeLogShow}>
                                {renderRightContentBtn()}
                            </div>
                        </div>
                    </div>
                    <div className="log-info-wrap">
                        {renderLogInfo()}
                    </div>
                </div>
            </div>
            {/* <ImagePreview
                isShow={show}
                toggle={() => setShow(!show)}
                images={imgs}
                index={index}
                nextImg={() => setIndex(index + 1)}
                preImg={() => setIndex(index - 1)}
            ></ImagePreview> */}
            <ImageViewer
                show={show}
                images={imgs}
                index={index}
                close={() => setShow(!show)}
            ></ImageViewer>
            <LogDetailModal
                show={showLogDetailModal}
                close={showLogDetail}
                id={params.id}
            ></LogDetailModal>
        </>
    )
}

export default LogDetail