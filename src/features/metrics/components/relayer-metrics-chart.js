import _ from 'lodash';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import { formatAxisCurrency, formatAxisDate, formatAxisNumber } from '../util';
import BrushableChartContainer from '../../../components/brushable-chart-container';
import CardPlaceholder from '../../../components/card-placeholder';
import RelayerMetricsTooltip from './relayer-metrics-tooltip';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const RelayerMetricsChart = ({ data, granularity, period, type }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.every(data, { [type]: 0 })) {
    return (
      <CardPlaceholder>
        No data available for the selected period
      </CardPlaceholder>
    );
  }

  return (
    <BrushableChartContainer data={data}>
      {({ brushableData, brushIndexes, handleBrushChange }) => (
        <BarChart
          data={brushableData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid
            stroke={COLORS.NEUTRAL.MYSTIC_200}
            strokeDasharray="8 8"
            strokeOpacity={0.7}
            vertical={false}
          />
          <Bar dataKey={type} fill={COLORS.ACCENT.ANZAC_500} />
          <XAxis
            axisLine={{ stroke: COLORS.NEUTRAL.MYSTIC_200 }}
            dataKey="date"
            minTickGap={25}
            tick={{ fill: COLORS.NEUTRAL.MYSTIC_700, fontSize: '0.8em' }}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey={type}
            mirror
            scale="linear"
            tick={{
              fill: COLORS.PRIMARY.SCAMPI_800,
              fontSize: '0.8em',
              fontWeight: 500,
            }}
            tickFormatter={
              type === 'tradeCount' || type === 'traderCount'
                ? formatAxisNumber
                : (value) => formatAxisCurrency(value, displayCurrency)
            }
            tickLine={false}
          />
          <Tooltip
            content={<RelayerMetricsTooltip granularity={granularity} />}
          />
          <Brush
            {...brushIndexes}
            dataKey="date"
            height={30}
            onChange={handleBrushChange}
            stroke={COLORS.NEUTRAL.MYSTIC_300}
            tickFormatter={(date) => formatAxisDate(date, period, granularity)}
          />
        </BarChart>
      )}
    </BrushableChartContainer>
  );
};

RelayerMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
      traderCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  granularity: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['tradeCount', 'traderCount', 'tradeVolume']),
};

RelayerMetricsChart.defaultProps = {
  type: 'tradeVolume',
};

export default RelayerMetricsChart;
