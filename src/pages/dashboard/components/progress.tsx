import React from 'react';
import { Progress } from 'antd';

const ProgressCom: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px', flexDirection: 'column'}}>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </div>
);

export default ProgressCom;