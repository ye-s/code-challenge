import React, { FC } from 'react';
import {
  Table, TableBody, TableHead,
  TableCell, TableRow
  } from '@material-ui/core';
import { IRow } from '../../types/types';
import './MarketTable.scss';

interface MarketTableProps {
  rows: Array<IRow>;
};

const MarketTable: FC<MarketTableProps> = ({rows}) => {

  const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'pair', numeric: false, disablePadding: false, label: 'Pair' },
    { id: 'symbol', numeric: false, disablePadding: false, label: 'Symbol' },
    { id: 'marketCap', numeric: false, disablePadding: false, label: 'Market Cap' },
    { id: 'averagePrice', numeric: false, disablePadding: false, label: 'Average Last Price' },
  ];

  return (
    <Table className="market-table">
      <TableHead className="market-table__header">
        <TableRow>
          { headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={'default'}
            >
              {headCell.label}
            </TableCell>
          )) }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          rows.map((row, index) => {
              return (
                <TableRow
                  hover
                  onClick={() => {
                    // TODO add handler
                    return;
                  }}
                  key={row.id}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{'-'}</TableCell>
                  <TableCell align="left">{row.symbol}</TableCell>
                  <TableCell align="left">{`$ ${row.marketCap}`}</TableCell>
                  <TableCell align="left">{"-"}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
    </Table>
  );
};

export default MarketTable;