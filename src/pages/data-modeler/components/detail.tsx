import { useEffect } from 'react'
import { getWorkSpaceDetail } from '@/api/dataModeler'
import {
  useParams
} from 'react-router-dom'
import to from 'await-to-js'

function WorkSpaceDetail() {
  const params = useParams()
  
  useEffect(() => {
    async function getDataMOdelerDetail() {
      const name = params.name
      if (!name) return
      const [err, res]: any = await to(getWorkSpaceDetail(name))
      if (err) return
      console.log(res)
    }
    getDataMOdelerDetail()
  })

  return (
    <>

    </>
  )
}

export default WorkSpaceDetail