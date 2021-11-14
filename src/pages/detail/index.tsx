import React, { useEffect, useState, useRef } from 'react';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { Grid } from '@arco-design/web-react';
import { IconPoweroff } from '@arco-design/web-react/icon';
import './index.css';
import { IconDatabase, IconClock, IconTransition, IconBlockChain, IconShard, IconNode } from './components';

const { Row, Col } = Grid;
const originRate = Math.floor(Math.random() * 500) + 3000;
const originSize = Math.floor(Math.random() * 2000) + 1000;
const originBlockNum = Math.floor(Math.random() * 10000000);

const originRate1 = Math.floor(Math.random() * 2000) + 5000;
const originRate2 = Math.floor(Math.random() * 5000);

const originSize1 = Math.floor(Math.random() * 2000) + 1000;
const originSize2 = Math.floor(Math.random() * 2000) + 1000;

const transationOptions = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '30%',
    left: '48%',
    width: '10%',
    itemGap: 0,
    itemHeight: 8,
    itemWidth: 8,
    icon: 'circle',
    textStyle: {
      backgroundColor: 'transparent',
      padding: [5, 0],
      rich: {
        a: {
          verticalAlign: 'bottom',
          color: '#2c4568',
          fontSize: 20,
          fontWeight: 900,
          lineHeight: 32,
        },
        b: {
          color: '#b6c2d0',
          fontSize: 12,
          fontWeight: 600,
        }
      }
    },
    formatter: (value: any) => '{a|' + (value === 'Average throughput' ? originRate1 : originRate2) + ' ms}\n{b|' + value + '}',
  },
  series: [
    {
      type: 'pie',
      left: '8%',
      width: '40%',
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        // position: 'center'
      },
      emphasis: {
        label: {
          show: false,
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: originRate1, name: 'Average throughput', },
        { value: originRate2, name: 'Instant throughput' },
      ],
      color: ['#9d2b29', '#f76462'],
    }
  ]
};

const databaseOptions = {
  tooltip: {
    trigger: 'item'
  },
  //  旁边的说明
  legend: {
    top: '30%',
    left: '48%',
    width: '10%',
    itemGap: 0,
    itemHeight: 8,
    itemWidth: 8,
    icon: 'circle',
    textStyle: {
      backgroundColor: 'transparent',
      padding: [5, 0],
      rich: {
        a: {
          verticalAlign: 'bottom',
          color: '#2c4568',
          fontSize: 20,
          fontWeight: 900,
          lineHeight: 32,
        },
        b: {
          color: '#b6c2d0',
          fontSize: 12,
          fontWeight: 600,
        }
      }
    },
    formatter: (value: any) => {
      return '{a|' + (value === 'Data size' ? originSize1 : originSize2) + ' MB}\n{b|' + value + '}';
    }
  },
  series: [
    {
      type: 'pie',
      left: '8%',
      width: '40%',
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: originSize1, name: 'Data size', },
        { value: originSize2, name: 'Indexes size' },
      ],
      color: ['#9e421a', '#ef8928'],
    }
  ]
};

const Detail = () => {
  const transationRef = useRef<EChartsInstance>(null);
  const databaseRef = useRef<EChartsInstance>(null);

  const [rate, setRate] = useState<number>(originRate);
  const [size, setSize] = useState<number>(originSize);
  const [latestBlockNum, setLatestBlockNum] = useState<number>(originBlockNum);

  useEffect(() => {
    const task = setInterval(() => {
      setRate(Math.floor(Math.random() * 500) + 3000);
    }, 2000);
    return () => clearInterval(task);
  }, []);

  useEffect(() => {
    const task = setInterval(() => {
      setSize(Math.floor(Math.random() * 2000) + 1000);
    }, 2000);
    return () => clearInterval(task);
  }, []);

  useEffect(() => {
    const task = setTimeout(() => {
      setLatestBlockNum(latestBlockNum + 1);
    }, 1500);
    return () => clearTimeout(task);
  });

  useEffect(() => {
    const task = setInterval(() => {
      const average = Math.floor(Math.random() * 2000) + 5000;
      const instant = Math.floor(Math.random() * 5000);
      transationRef.current?.getEchartsInstance().setOption({
        legend: {
          formatter: (value: any) => '{a|' + (value === 'Average throughput' ? average : instant) + ' ms}\n{b|' + value + '}',
        },
        series: [
          {
            data: [
              { value: average, name: 'Average throughput', },
              { value: instant, name: 'Instant throughput' },
            ],
          }
        ]
      });
    }, 2000);
    return () => clearInterval(task);
  }, []);

  useEffect(() => {
    const task = setInterval(() => {
      const size1 = Math.floor(Math.random() * 2000) + 1000;
      const size2 = Math.floor(Math.random() * 2000) + 1000;
      databaseRef.current?.getEchartsInstance().setOption({
        legend: {
          formatter: (value: any) => '{a|' + (value === 'Data size' ? size1 : size2) + ' MB}\n{b|' + value + '}',
        },
        series: [
          {
            data: [
              { value: size1, name: 'Data size', },
              { value: size2, name: 'Indexes size' },
            ],
          }
        ]
      });
    }, 2000);
    return () => clearInterval(task);
  }, []);

  return (
    <div className="main-container">
      <Row gutter={[24, 12]} style={{ margin: '0px 0px 64px 0px' }}>
        <Col span={12}>
          <span className="title">Overview</span>
        </Col>
        <Col span={12}>
          <span className="title">Indexed entities</span>
        </Col>
        <Col span={6}>
          <div id="latest-block" className="card">
            <div className="info">
              <div className="icon" style={{ backgroundColor: '#2b80d1'}}>
                <svg width="24" height="24" viewBox="0 0 48 48" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M42.87 9.96L24.855 1.413a2 2 0 00-1.715 0L5.155 9.96a2 2 0 00-1.142 1.806v22.463a2 2 0 001.14 1.806l17.985 8.564a2 2 0 001.72 0l18.014-8.564a2 2 0 001.14-1.806V11.765A2 2 0 0042.87 9.96zM8.013 32.964L8.012 15.56l13.85 6.953.037.018.26 17.171-14.146-6.736zm32-17.409L26.036 22.52l-.135.061.256 16.971 13.856-6.587V15.556zm-30.01-3.474l13.996-6.647 14.017 6.648-13.763 6.855a.667.667 0 01-.597 0l-13.653-6.856z" fill="currentColor"/></svg>
              </div>
              <span className="label">{latestBlockNum}</span>
              <span>Latest block</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div id="block-status" className="card">
            <div className="info">
              <div className="icon" style={{ backgroundColor: '#33a267'}}>
                <IconPoweroff />
              </div>
              <span className="label">running</span>
              <span>Block status</span>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div id="entity" className="card">
            <div id="detail">
              <Row gutter={[0, 18]}>
                <Col span={2}>
                  <IconBlockChain className="entity-icon" />
                </Col>
                <Col span={10}>
                  <span className="label-emphasized">{originBlockNum}</span>
                  <span className="remarks">Blocks</span>
                </Col>
                <Col span={2}>
                  <IconTransition className="entity-icon" style={{ transform: 'rotate(90deg)' }} />
                </Col>
                <Col span={10}>
                  <span className="label-emphasized">1233193</span>
                  <span className="remarks">Transactions</span>
                </Col>

                <Col span={2}>
                  <IconShard className="entity-icon" />
                </Col>
                <Col span={10}>
                  <span className="label-emphasized">589</span>
                  <span className="remarks">Shards</span>
                </Col>
                <Col span={2}>
                  <IconNode className="entity-icon" style={{ transform: 'rotate(90deg)' }} />
                </Col>
                <Col span={10}>
                  <span className="label-emphasized">7005</span>
                  <span className="remarks">Nodes</span>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ height: 64 }} />
      <Row gutter={[24, 12]} style={{ margin: '0px 0px 64px 0px' }}>
        <Col span={12}>
          <span className="title">Processing stats</span>
        </Col>
        <Col span={12}>
          <span className="title">Database stats</span>
        </Col>
        <Col span={12}>
          <div>
            <ReactECharts
              ref={transationRef}
              className="pie-chart card"
              option={transationOptions}
              notMerge={true}
              lazyUpdate={true}
              // theme={"theme_name"}
              // onChartReady={this.onChartReadyCallback}
              // onEvents={EventsDict}
              // opts={}
            />
            <div className="internal" style={{ textAlign: 'center' }}>
              <div className="internal-icon">
                <IconClock className="entity-icon" style={{ backgroundColor: '#fff5f6' }} />
              </div>
              <span className="label-emphasized">{`${rate} ms`}</span>
              <span className="remarks">Total time/block</span>
            </div>
          </div>
        </Col>
        <Col span={12}>
        <div>
            <ReactECharts
              ref={databaseRef}
              className="pie-chart card"
              option={databaseOptions}
              notMerge={true}
              lazyUpdate={true}
            />
            <div className="internal" style={{ textAlign: 'center' }}>
              <div className="internal-icon">
                <IconDatabase className="entity-icon" style={{ backgroundColor: '#fffaef' }} />
              </div>
              <span className="label-emphasized">{`${size} MB`}</span>
              <span className="remarks">Total size</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;