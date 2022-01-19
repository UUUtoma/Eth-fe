import React, {useEffect, useRef, useState} from 'react';
import {Input, Statistic,} from '@arco-design/web-react';
import ReactECharts, {EChartsInstance} from 'echarts-for-react';
import {IconArrowFall, IconSearch} from '@arco-design/web-react/icon';
import BusinessOverview from "@/pages/home/components/BusinessOverview";

const Home = ({ rate = 3500, max = 50, }) => {
  const [source, setSource] = useState([
    { timestamp: 1, transactionsCount: 75, id: '152393'},
    { timestamp: 2, transactionsCount: 75, id: '152394'},
    { timestamp: 3, transactionsCount: 75, id: '152395'},
    { timestamp: 4, transactionsCount: 75, id: '152396'},
    { timestamp: 5, transactionsCount: 75, id: '152396'},
    { timestamp: 6, transactionsCount: 80, id: '152396'},
    { timestamp: 7, transactionsCount: 46, id: '152396'},
    { timestamp: 8, transactionsCount: 77, id: '152396'},
    { timestamp: 9, transactionsCount: 84, id: '152396'},
    { timestamp: 10, transactionsCount: 34, id: '152396'},
  ]);

  const [time, setTime] = useState(1);
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
      axisLabel: {
        show: false,
      },
      max: function (value: { max: number; }) {
        return value.max;
      },
      min: function (value: { min: number; max: number}) {
        return value.min - ((value.max - value.min) / 10);
      },
    },
    yAxis: {
      max: 'dataMax', // 用数据的最大值作为 Y 轴最大值
      show: false,
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
          transactionsCount: 20 + Math.round(Math.random() * 100),
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
      // setTime(0);
    }

    const intervalId = setInterval(mockUpdateSource, rate);
    return () => {
      clearInterval(intervalId);
    }
  }, [rate, max, source]);

  useEffect(() => {
    const updateTime = () => {
      // setTime(time + 1);
    }

    const intervalId = setInterval(updateTime, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div
      className="container mx-auto my-20 max-w-screen-xl flex flex-col justify-between items-center gap-9"
    >
      <div className="rounded-lg mt-12">
        <BusinessOverview />
      </div>
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
          value={time + 'min ago'}
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
