import React, {useEffect, useRef, useState} from 'react';
import {Input, Statistic,} from '@arco-design/web-react';
import ReactECharts, {EChartsInstance} from 'echarts-for-react';
import {IconArrowFall, IconSearch} from '@arco-design/web-react/icon';

const Home = ({ rate = 2000, max = 15, }) => {
  const [source, setSource] = useState([
    { timestamp: 1, transactionsCount: 823, id: '152393'},
    { timestamp: 2, transactionsCount: 235, id: '152394'},
    { timestamp: 3, transactionsCount: 1042, id: '152395'},
    { timestamp: 4, transactionsCount: 988, id: '152396'},
  ]);
  const barChartRef = useRef<EChartsInstance>(null);

  const option = {
    dataset: {
      dimensions: ['timestamp', 'transactionsCount'],
      source: source,
    },
    xAxis: {
      type: 'value',
      realtimeSort: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: function (value: { max: number; }) {
        return value.max;
      },
      min: function (value: { min: number; max: number}) {
        return value.min - ((value.max - value.min) / 10);
      },
    },
    yAxis: {
      max: 'dataMax', // 用数据的最大值作为 Y 轴最大值
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'right',
          valueAnimation: true, // 实时改变标签
        },
        color: [
          '#a7b5f6',
        ],
        encode: {
          x: 'timestamp',
          y: 'transactionsCount',
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 0, // 每次更新动画时长，这一数值应与调用 setOption 改变数据的频率相同
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };



  useEffect(() => {
    const mockUpdateSource = () => {
      const lastLatest = source[source.length - 1];
      const newSource = [
        ...source,
        {
          timestamp: lastLatest.timestamp + 1,
          transactionsCount: Math.round(Math.random() * 400),
          id: String(Number(lastLatest.id) + 1),
        },
      ];
      if (newSource.length >= max) {
        newSource.splice(0, 1)
      }
      barChartRef.current?.getEchartsInstance().setOption({
        dataset: {
          source: newSource,
        },
      });
      setSource(newSource);
    }

    const intervalId = setInterval(mockUpdateSource, rate);
    return () => {
      clearInterval(intervalId);
    }
  }, [rate, max, source]);

  return (
    <div
      className="container mx-auto mt-36 max-w-screen-xl flex flex-col justify-between items-center gap-9"
    >

      <div>
        <div className={'text-blue-800 text-4xl font-extrabold'}>
          Ethereum Lite Explorer
        </div>
        <div className={'text-gray-900 text-sm'}>
          An open source Ethereum block explorer
        </div>
      </div>
      <Input
        prefix={<IconSearch />}
        placeholder='Enter keyword to search'
        className="w-8/12"
        size={'large'}
        height={48}
      />
      <div className="w-9/12 mt-12">
        <div className={'flex flex-col justify-between items-center text-gray-900 font-bold'}>
          LAST BLOCKS TRANSACTIONS
        </div>
        <ReactECharts
          ref={barChartRef}
          option={option}
        />
      </div>
      <div className={'flex flex-row justify-between items-center gap-4'}>
        <Statistic
          title='LATEST BLOCK'
          value={`#${source?.[source.length -1].id}`}
          styleValue={{ padding: '0 4px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.9' }}
        />
        <Statistic
          title='TIME'
          value={'1 minute ago'}
          suffix={<IconArrowFall style={{ color: '#0fbf60' }} />}
        />
        <Statistic
          title='TRANSACTIONS'
          value={source?.[source.length -1].transactionsCount}
          precision={2}
        />
      </div>
    </div>
  );
}

export default Home;
