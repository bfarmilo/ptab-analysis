//@flow

import React from 'react';

const ControlArea = (props: {
  query: Array<{field:string, value: string}>,
  fields: Array<string>,
  count: number,
  totalCount: number,
  mode: string,
  goButton: boolean,
  detailTable: string,
  selectTable: (() => Event),
  selectField: (() => Event),
  newQuery: (() => Event),
  setValue: (() => Event),
  switchMode: (() => Event),
  tableDetail: (() => Event),
  detailGoButton: boolean,
  detailCount: number,
  detailTotalCount: number,
  disableDetails: boolean
}) => {
  const tableMode = props.mode === 'table';
  const detailSection = !props.disableDetails ? (
    <div>
      <div>
        <input className="custominput" name="TableDetail" id="tabledetail" onChange={props.setDetailTable} value={props.detailTable} />
        <button name="GetDetails" onClick={props.getDetailTable}>{props.detailGoButton ? 'Go' : 'More'}</button>
      </div>
      <div>
        <p>showing {props.detailCount}/{props.detailTotalCount} records</p>
      </div>
    </div>
  ) : '';
  return (
    <div className="ControlArea">
      <h3>PTAB Data Extraction</h3>
      {tableMode ? (
        <div className="TableControls">
          <div>
            <span className="customdropdown">
              <select name="ChooseField0" id="field_0" onChange={props.setValue} value={props.query[0].field}>
                {props.fields.map(val => (
                  <option key={`ID0_${val}`} value={val}>
                    {val}
                  </option>
                ))
                }
              </select>
            </span> =
            <input className="custominput" name="ChooseValue0" id="value_0" onChange={props.setValue} value={props.query[0].value} />
            AND
            <span className="customdropdown">
              <select name="ChooseField1" id="field_1" onChange={props.setValue} value={props.query[1].field}>
                {props.fields.map(val => (
                  <option key={`ID1_${val}`} value={val}>
                    {val}
                  </option>
                ))
                }
              </select>
            </span> =
            <input className="custominput" name="ChooseValue1" id="value_1" onChange={props.setValue} value={props.query[1].value} />
            <button onClick={props.newQuery}>{props.goButton ? 'Go' : 'More'}</button>
          </div>
          <div>
            <p>showing {props.count}/{props.totalCount} records</p>
          </div>
        </div>
      ) : detailSection
      }
      <div className="SwitchView">
        <button onClick={props.switchMode}>Switch to {tableMode ? 'Chart' : 'Table'} View</button>
      </div>
    </div>
  );
};

export default ControlArea;