import { useState, useEffect } from 'react'
import './data-modeler.less'
import {
  getWorkSpaces
} from '@/api/dataModeler'
import to from 'await-to-js'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

function DataModeler() {

  const [cardList, setCardList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchWorkspace() {
      const [err, res]: any = await to(getWorkSpaces())
      if (err) return
      setCardList(res.results.map((a: any) => {
        return {
          title: a.name,
          desc: a.description || ''
        }
      }))
    }
    fetchWorkspace()
  }, [])
  
  function go2detail(name: string) {
    navigate('/datamodeler/detail/' + name)
  }

  return (
    <div className="data-space-card-list">
      {
        cardList.map((card: any) => {
          return (
            <Card
              key={card.name}
              title={card.title}
              extra={<Button type="text" onClick={() => go2detail(card.title)} style={{color: 'green'}}>详情</Button>}
              style={{ width: 300, marginRight: '16px' }}
            >
              <p>{card.desc}</p>
            </Card>
          )
        })
      }
    </div>
  )
}

export default DataModeler