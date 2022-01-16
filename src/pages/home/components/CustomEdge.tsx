import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

export default function CustomEdge({
                                     id,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     sourcePosition,
                                     targetPosition,
                                     data,
                                     arrowHeadType,
                                     markerEndId,
                                   }: any) {
  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <defs>
        <linearGradient id="gradient">
          <stop offset="0" stop-color={data.fromColor} stopOpacity={data.colorOpacity} />
          <stop offset="100%" stop-color={data.toColor} stopOpacity={data.colorOpacity} />
        </linearGradient>
      </defs>
      <path
        id={id}
        style={{stroke: 'url(#gradient)', strokeWidth: 5}}
        className="react-flow__edge-path"
        markerEnd={markerEnd}
        d={edgePath}
      />
      {/*<text>*/}
      {/*  <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">*/}
      {/*    {data.text}*/}
      {/*  </textPath>*/}
      {/*</text>*/}
    </>
  );
}