import React, {useEffect, useState} from 'react';
import ReactFlow, {Handle, Position} from 'react-flow-renderer';
import {
  IconArchive,
  IconCompass,
  IconDashboard,
  IconIdcard,
  IconRobotAdd,
  IconShake,
  IconStorage
} from "@arco-design/web-react/icon";
import CustomEdge from "@/pages/home/components/CustomEdge";

const node1 = ({ data }: any) => {
  const { leftTarget = true, topTarget = false, rightSource = true, colorMap = '', targetBg = 'rgba(255, 255, 255, 0.7)', sourceBg = 'rgba(255, 255, 255, 0.7)'} = data;
  const classChoice = 'grid justify-center content-center w-10 h-10 rounded-lg bg-gradient-to-b ' + colorMap;

  // TODO: Handle id
  return (
    <>
      {
        leftTarget && (
          <Handle type="target" position={Position.Left} style={{background: targetBg, borderColor: 'rgb(200, 200, 200)'}}/>
        )
      }
      {
        topTarget && (
          <Handle type="target" position={Position.Top} style={{background: targetBg, borderColor: 'rgb(200, 200, 200)'}} />
        )
      }
      <div
        className={classChoice}
      >
        <div className={'h-6'}>
          { data.icon }
        </div>
      </div>
      {
        rightSource && (
          <Handle
            type="source"
            position={Position.Right}
            style={{ background: sourceBg, borderColor: 'rgb(200, 200, 200)' }}
          />
        )
      }
    </>
  );
}

const nodeTypes = {
  node1: node1,
};

const edgeTypes = {
  customE1: CustomEdge,
}

const gradientColorMap = {
  blue: 'from-blue-900 to-indigo-600',
  purple: 'from-indigo-800 to-purple-500',
  green: 'from-green-800 to-green-600',
  pink: 'from-pink-800 to-red-400',
  gray: 'from-gray-700 to-gray-600',
}

export default () => {
  const [animated, setAnimated] = useState(true);
  const [editable] = useState(false);
  const elements = [
    {
      id: '1',
      type: 'node1',
      // data: { label: <IconArchive style={{ color: 'red' }} /> },
      data: {
        icon: <IconArchive style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["pink"],
        leftTarget: false,
      },
      position: { x: 30, y: 125 },
    },
    {
      id: '2',
      type: 'node1',
      data: {
        icon: <IconCompass style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["gray"],
      },
      position: { x: 120, y: 125 },
    },
    {
      id: '3',
      type: 'node1',
      data: {
        icon: <IconIdcard style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["blue"],
        // colorMap: 'from-gray-600 to-gray-700'
      },
      position: { x: 300, y: 50 },
    },
    {
      id: '4',
      type: 'node1',
      data: {
        icon: <IconRobotAdd style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["purple"],
      },
      position: { x: 300, y: 125 },
    },
    {
      id: '5',
      type: 'node1',
      data: {
        icon: <IconStorage style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["green"],
      },
      position: { x: 300, y: 200 },
    },
    {
      id: '6',
      type: 'node1',
      data: {
        icon: <IconDashboard style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["gray"],
      },
      position: { x: 400, y: 125 },
    },
    {
      id: '7',
      type: 'node1',
      data: {
        icon: <IconShake style={{ color: '#fff', fontSize: 24, strokeWidth: "2" }} />,
        colorMap: gradientColorMap["pink"],
        rightSource: false,
      },
      position: { x: 550, y: 125 },
    },

    { id: 'e1-2', source: '1', target: '2', animated: animated, style: { strokeWidth: 5 } },
    { id: 'e2-3', source: '2', target: '3', animated: animated, type: 'customE1', data: { text: 'custom edge', fromColor: '#1e3a8a', toColor: '#60a5fa', colorOpacity: '1'} },
    { id: 'e2-4', source: '2', target: '4', animated: animated, style: { stroke: '#6b21a8', strokeWidth: 5 } },
    { id: 'e2-5', source: '2', target: '5', animated: animated, style: { stroke: '#60a471', strokeWidth: 5 } },
    { id: 'e3-7', source: '3', target: '7', animated: animated, style: { strokeWidth: 5 } },
    { id: 'e4-6', source: '4', target: '6', animated: animated, style: { stroke: '#c084fc', strokeWidth: 5 } },
    { id: 'e5-6', source: '5', target: '6', animated: animated, style: { stroke: '#618f46', strokeWidth: 5 } },
    { id: 'e6-7', source: '6', target: '7', animated: animated, style: { stroke: '#f87171', strokeWidth: 5 } },
  ];

  // after connected, clear edge animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={'rounded'} style={{width: 620, height: 300, margin: 0}}>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        style={{background: 'rgba(30, 37, 56, 0.95)'}}
        nodesDraggable={editable}
        nodesConnectable={editable}
        elementsSelectable={editable}
        zoomOnScroll={editable}
        zoomOnPinch={editable}
        zoomOnDoubleClick={editable}
        panOnScroll={editable}
        selectNodesOnDrag={editable}
        paneMoveable={editable}
      >
      </ReactFlow>
    </div>
  );
}

