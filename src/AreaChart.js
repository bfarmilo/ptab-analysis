import React from 'react';
import { VictoryStack, VictoryArea, VictoryLine, VictoryTheme, VictoryContainer, VictoryChart, VictoryLabel, VictoryLegend } from 'victory';

const AreaChart = (props: {
  data: Array<survivalStats>,
  viewSize: number
}) => {
  const quarters = props.data[0].data.map(item => item.bin);
  // now for each series in props.data, look at each item in props.data.data
  // if item.bin matches the current item in quarters, return the count
  const totals = quarters.map(quarter => props.data.map(series => series.data.filter(item => item.bin === quarter).map(item => item.count)))
  .map(quarter => quarter.map(item => item[0]).reduce((sum, val) => sum + val));
  // now store it an an object where each quarter is the key and the value is the total
  const binTotals = quarters.reduce((result, item, index) => {
    result[item]= totals[index];
    return result;
  }, {});
  console.log(binTotals);
  return (
    <div className="Chart">
      {/* <svg viewBox={`0 0 ${props.viewSize*3} ${props.viewSize}`}> */}
      <VictoryChart
        height={props.viewSize}
        width={props.viewSize * 16 / 9}
        // containerComponent={<VictoryContainer responsive={false} />}
        theme={VictoryTheme.material}
        animate={{duration: 500}}
        style={{
              labels: { fill: "black" }
            }}
            scale={{x:"time"}}
      >
        <VictoryStack>
        {props.data.map(series => (
          <VictoryArea
            key={`${series.index}${series.bin}`}
            data={
              series.data.map(item => {
                return { x: new Date(item.start), y: item.count === 0 ? 0 : Math.round(item.count/binTotals[item.bin] * 1000) / 10 /*, label: `${Math.round(series.count / props.total * 1000) / 10}%` */ }
              })
            }
          />
        ))}
        </VictoryStack>
        <VictoryLegend
          title="Legend"
          centerTitle
          height={props.viewSize}
          orientation="vertical"
          data={props.data.map(item => ({ name: item.type.reduce((acc,curr) => acc.concat('/').concat(curr)) }))}
          style={{
              labels: { fill: "black" },
              border: { fill: "white", opacity:"0.25"}
            }}
        />
      </VictoryChart>
      {/* </svg> */}
      <table /* className="rwd-table" */>
        <tbody>
          <tr>
            <th />
            {props.data[0].data.map(item => (
              <th key={`yr${item.bin}`}>{item.bin.split('_')[0]}</th>
            ))}
          </tr>
          <tr>
            <th />
            {props.data[0].data.map(item => (
              <th key={`q${item.bin}`}>{item.bin.split('_')[1]}</th>
            ))}
          </tr>
          {props.data.map(series => (
            <tr key={series.type}>
              <td>{series.type}</td>
              {series.data.map(item => (
                <td key={item.bin}>{item.count}</td>
              ))}
            </tr>
          ))}
          <tr>
            <th>Totals:</th>
            {totals.map((item,idx) => (
              <th key={`${idx}`}>{item}</th>
            ))}
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AreaChart;