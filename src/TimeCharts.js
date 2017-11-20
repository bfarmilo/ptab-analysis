//@flow

import React from 'react'
import AreaChart from './AreaChart';
import type survivalStats from './typedefs';
import Select from 'react-select';

const TimeCharts = (props: {
  chartData: Array<{ title: string, index: number, data: Array<survivalStats> }>,
  handleChartClick: (() => Event),
  availableFields: Array<string>,
  currentQuery: Array<{ field: string, value: string }>,
  updateChart: (() => Event),
  availableValues: Array<Array<string>>,
  selectChartQuery: (() => Event),
}) => {
  const viewSize = 400;
  //console.log(props.chartData);
  return (
    <div /* className="ChartArea" */>
      <div className="SurvivalCharts">
        {props.chartData.map((item, index) => (index === 0 || index === 2) ? (
          <div className="SingleChart" key={`chart${item.index}_${item.title}`}>
            <h3>{item.title}</h3>
            <Select
                name={'field'}
                placeholder="select field for test"
                value={props.currentQuery[item.index].field}
                options={props.availableFields.map(val => ({ type: 'field', chart: `${item.index}`, label: val, value: val }))}
                onChange={props.selectChartQuery}
              />
            {props.currentQuery[item.index].field !== 'all' ?
              <Select
                name={'value'}
                multi
                placeholder="select field for test"
                value={props.currentQuery[item.index].value}
                options={props.availableValues[item.index].map(val => ({ type: 'value', chart: `${item.index}`, label: val, value: val }))}
                onChange={props.selectChartQuery}
              />
              :
              <span />
            }
            <button id={`${item.index}_${item.title}`} onClick={props.updateChart}>Go</button>
            <AreaChart
              key={item.title}
              data={item.data}
              viewSize={viewSize}
            />
          </div>
        ) : <div key={item.title} />
        )}
      </div>
    </div>
  )
}

export default TimeCharts;