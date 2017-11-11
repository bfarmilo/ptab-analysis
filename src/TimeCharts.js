//@flow

import React from 'react'
import AreaChart from './AreaChart';
import type survivalStats from './typedefs';

const TimeCharts = (props: {
  chartData: Array<{ title: string, index: number, data: Array<survivalStats> }>,
  handleChartClick: (() => Event),
  availableFields: Array<string>,
  currentQuery: Array<{field: string, value: string}>,
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
            <span className="customdropdown">
              <select  name={'field'} id={`${item.title}_${item.index}`} onChange={props.selectChartQuery} value={props.currentQuery[item.index].field}>
                {props.availableFields.map(val => (
                  <option key={`ID_${val}`} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </span>
            {props.currentQuery[item.index].field !== 'all' ?
              <span className="customdropdown">
                <select name={'value'} id={`${item.title}_${item.index}`} onChange={props.selectChartQuery} value={props.currentQuery[item.index].value}>
                  {props.availableValues[item.index].map(val => (
                    <option key={`ID_${val}`} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </span>
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
        ) : <div key={item.title}/>
      )}
      </div>
    </div>
  )
}

export default TimeCharts;