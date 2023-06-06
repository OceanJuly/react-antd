// import ImgViewer from 'react-images-viewer'
import type { ImageList } from '@/pages/logs-portal/type'

import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
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
    
    const imgs = props.images.map((img: any) => {
        return {
            original: img.src,
            thumbnail: img.src,
            originalTitle: img.name,
            OriginalTitle: img.name,
            description: img.name,
            originClass: 'img-ww',
            thumbnailClass: 'thumbnail-wrap',
            thumnailHeight: '200px',
        }
    })

    const _props = {
        lazyLoad: true,
        showPlayButton: false,
        items: imgs,
        showIndex: true,
        onErrorImageURL: notFoundImg,
        // originalTitle: 
    }

    return (
        // <ImgViewer
        //     imgs={props.images}
        //     currImg={props.index}
        //     isOpen={props.isShow}
        //     onClickPrev={props.preImg}
        //     onClickNext={props.nextImg}
        //     onClose={props.toggle}
        // ></ImgViewer>
        <div className="image-gallery-warp">
          <ImageGallery
            thumbnailPosition='right'
            {..._props}
          />
        </div>
    )
}

export default ImagePreview