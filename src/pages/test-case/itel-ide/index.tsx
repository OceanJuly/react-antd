import "./itel-ide.less"

function ItelIde() {
  const url = "https://tid.itealab.net/ide/?folder=/home/ubuntu/itel-demo/guru99.demo"
  return (
    <>
      <div className="itel-ide-wrap">
        <iframe
          src={url}
          className="ide-frame"
        ></iframe>
      </div>
    </>
  )
}

export default ItelIde