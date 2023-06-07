import ImgViewer from 'react-images-viewer'
import type { ImageList } from '@/pages/logs-portal/type'

import './picture-preview.less'
import notFoundImg from '@/assets/imgs/404.jpg'

interface ImagePreviewProps {
    toggle: any,
    nextImg: any,
    preImg: any,
    isShow: boolean,
    images: Array<ImageList>,
    index: number
}

function ImagePreview(props: ImagePreviewProps) {
    return (
        <ImgViewer
            imgs={props.images}
            currImg={props.index}
            isOpen={props.isShow}
            onClickPrev={props.preImg}
            onClickNext={props.nextImg}
            onClose={props.toggle}
        ></ImgViewer>
    )
}

export default ImagePreview