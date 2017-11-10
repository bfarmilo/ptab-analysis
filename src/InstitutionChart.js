import React from 'react';
import { VictoryStack, VictoryArea, VictoryLine, VictoryTheme, VictoryContainer, VictoryChart, VictoryLabel, VictoryLegend } from 'victory';

const InstitutionChart = (props: {
  data: Array<survivalStats>,
  viewSize: number
}) => {
  console.log(props.data);
  return (
    <div className="Chart">
      {/* <svg viewBox={`0 0 ${props.viewSize*3} ${props.viewSize}`}> */}
      <VictoryChart
        height={props.viewSize}
        width={props.viewSize * 3}
        // containerComponent={<VictoryContainer responsive={false} />}
        theme={VictoryTheme.material}
        style={{
              labels: { fontSize: 30, fill: "black" }
            }}
      >
        <VictoryLegend
          title="Legend"
          centerTitle
          height={props.viewSize}
          orientation="vertical"
          data={props.data.map(item => ({ name: item.type.reduce((acc,curr) => acc.concat('/').concat(curr)) }))}
          style={{
              labels: { fontSize: 30, fill: "black" }
            }}
        />
        {props.data.filter(item => item.type.includes('company') || item.type.includes('npe')).map(series => (
          <VictoryLine
            key={`${series.index}${series.bin}`}
            data={
              series.data.map(item => {
                return { x: item.bin, y: item.count /*, label: `${Math.round(series.count / props.total * 1000) / 10}%` */ }
              })
            }
          />
        ))}
      </VictoryChart>
      {/* </svg> */}
      <table /* className="rwd-table" */>
        <tbody>
          <tr>
            <th />
            {props.data[0].data.map(item => (
              <th key={item.bin}>{item.bin}</th>
            ))}
          </tr>
          {props.data.filter(item => item.type.includes('company') || item.type.includes('npe')).map(series => (
            <tr key={series.type}>
              <td>{series.type}</td>
              {series.data.map(item => (
                <td key={item.bin}>{item.count}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InstitutionChart;