//@flow

//TODO: Need to fix for new query

import React from 'react'
import PieChart from './PieChart';
import type survivalStats from './typedefs';
import Select from 'react-select';

const Charts = (props: {
  chartData: Array<{ title: string, index: number, count: number, data: Array<survivalStats> }>,
  details: Array<resultSet>,
  handleChartClick: (() => Event),
  availableFields: Array<string>,
  currentQuery: Array<{ field: string, value: string }>,
  updateChart: (() => Event),
  availableValues: Array<Array<string>>,
  selectChartQuery: (() => Event),
  disableDetails: boolean,
  pieMode: boolean
}) => {
  const viewSize = 300;
  const details = !props.disableDetails ? (<div className="DetailTable">
    <table>
      <tbody>
        <tr>
          <th>Patent: Claim</th>
          <th>unaffected</th>
          <th>weakened</th>
          <th>impaired</th>
          <th>killed</th>
          <th>unbinned</th>
        </tr>
        {props.details.map(item => (
          <tr key={`${item.ID}`}>
            <td>{item.Patent}:{item.Claim}</td>
            <td>{item.survivalStatus === '2_unaffected' ? `${item.IPR}` : ''}</td>
            <td>{item.survivalStatus === '3_weakened' ? `${item.IPR}` : ''}</td>
            <td>{item.survivalStatus === '4_impaired' ? `${item.IPR}` : ''}</td>
            <td>{item.survivalStatus === '5_killed' ? `${item.IPR}` : ''}</td>
            <td>{item.survivalStatus === '6_unbinned' ? `${item.IPR}` : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>) : <div />;
  // console.log('got available values', props.availableValues);
  // console.log(props.chartData.map(item => props.availableValues[item.index]));
  return (
    <div className="ChartArea">
      <div className="SurvivalCharts">
        {props.chartData.map(item => {
          return (item.count === 0) ?
            (<div className="SingleChart" key={`chart${item.index}_${item.count}`} />) :
            (
              <div className="SingleChart" key={`chart${item.index}_${item.title}`}>
                <h3>{item.title}</h3>
                <span>
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
                    id={`${item.title}_${item.index}`}
                    multi
                    clearable={false}
                    placeholder="select field for test"
                    value={props.currentQuery[item.index].value}
                    options={props.availableValues[item.index].map(val => ({ type: 'value', chart: `${item.index}`, label: val, value: val }))}
                    onChange={props.selectChartQuery}
                  />
                  :
                  <span />
                }
                <button id={`${item.index}_${item.title}`} onClick={props.updateChart}>Go</button>
                </span>
                <PieChart
                  data={item.data}
                  total={item.count}
                  viewSize={viewSize}
                />
              </div>)
        })}
      </div>
      {details}
    </div>
  )
}

export default Charts;