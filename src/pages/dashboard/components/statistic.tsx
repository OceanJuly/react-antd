import React from 'react';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter = (value: number) => <CountUp end={value} separator="," />;

const StatisticCom: React.FC = () => (
  <div style={{display: 'flex', flexDirection: 'column', margin: '16px'}}>
    <Statistic title="Active Users" value={112893} formatter={formatter} />
    <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
  </div>
);

export default StatisticCom;