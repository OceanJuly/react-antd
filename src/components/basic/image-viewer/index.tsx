import { Props } from 'react-rnd'
import './index.less'
import {
  CloseOutlined
} from '@ant-design/icons'
import { isNumber } from 'lodash'

function ImageViewer(props: Props) {

  function renderImgTag() {
    const { images, index } = props
    if (!images || !isNumber(index)) return
    const tarImg = images[index]
    if (!tarImg) return
    const type = tarImg.type
    switch (type) {
      case 'IMAGE': {
        return (
          <img key={tarImg.id} src={tarImg.src} />)
        }
      case 'VIDEO': {
        return (
          <video key={tarImg.id} controls>
              <source src={tarImg.src} type="video/mp4"></source>
          </video>
        )
      }
    }
  }

  return (
    <div className="image-viewer-wrap" style={{display: props.show ? 'block' : 'none'}}>
      <div className="close-btn" onClick={props.close}><CloseOutlined style={{margin: '14px 24px'}} /></div>
      <div className="image-title"></div>
      <div className="image-wrap">
        {renderImgTag()}
      </div>
      <div className="image-list-wrap"></div>
    </div>
  )
}

export default ImageViewer