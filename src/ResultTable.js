//@flow

import React from 'react';
import type {resultSet } from './typedefs';


const ResultTable = (props: {
  records: Array<resultSet>
}) => {
  return (
    <div className="DetailTable">
      <table>
        <thead>
          <tr>
            <th>IPR</th>
            <th>Date Filed</th>
            <th>Status</th>
            <th>FWD Status</th>
            <th>Petitioner</th>
            <th>Patent Owner</th>
            <th>Patent:Claim</th>
            <th>Main USPC</th>
            <th>Inst.</th>
            <th>Inv.</th>
            <th>Survival</th>
          </tr>
        </thead>
        <tbody>
          {props.records.map(record =>
            <tr key={record._id}>
              <td>{record.IPR}</td>
              <td>{record.DateFiled.split('T')[0]}</td>
              <td>{record.Status}</td>
              <td>{record.FWDStatus}</td>
              <td>{record.Petitioner.map(item => item.name)}</td>
              <td>{record.PatentOwner.map(item => item.name)}</td>
              <td>{record.Patent} Clm {record.Claim}</td>
              <td>{record.MainUSPC}</td>
              <td>{record.Instituted ? 'x' : ''}</td>
              <td>{record.Invalid ? 'x' : ''}</td>
              <td>{record.survivalStatus.result}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ResultTable;