import type { BoxProps } from '@mui/material';
import type { EChartsReactProps } from 'echarts-for-react';
import EChartsReactCore from 'echarts-for-react/lib/core';
export interface ReactEchartProps extends BoxProps {
    echarts: EChartsReactProps['echarts'];
    option: EChartsReactProps['option'];
}
declare const ReactEchart: import("react").ForwardRefExoticComponent<Omit<ReactEchartProps, "ref"> & import("react").RefAttributes<EChartsReactCore | null>>;
export default ReactEchart;
