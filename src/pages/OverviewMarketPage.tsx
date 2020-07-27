import React, { useState, useEffect } from 'react';
import MarketTable from '../components/marketTable/MarketTable';
import SearchBar from '../components/search/SearchBar';
import { gql, useQuery } from '@apollo/client';
import { IRow } from '../types/types';

const GET_MARKET = gql`
  query PageAssets {
    assets(sort: [{ marketCapRank: ASC }], page: { limit: 25 }) {
      id
      assetName
      assetSymbol
      marketCap
      markets {
        marketSymbol
        baseSymbol
        exchangeSymbol
        ticker {
          lastPrice
          highPrice
          lowPrice
          percentChange
        }
      }
    }
  }
`;

const OverviewMarketPage = () => {
  const { loading, error, data } = useQuery(GET_MARKET);
  const [ searchInput, setSearchInput ] = useState <string>('');
  const [ tableRows, setTableRows ] = useState <Array<IRow>>([]);
  const [ filteredRows, setFilteredRows ] = useState <Array<IRow>>([]);

  const prepareRows = (rawData: any[]) => {
    const rows: Array<IRow> = rawData.map(item => {
      const { id, assetName: name, assetSymbol: symbol, marketCap } = item;
      return { id, name, symbol, marketCap };
    })
    console.log(data);
    return rows;
  }

  const filterTableByCoinName = (searchInput: string) => {
    // Checks if any row contais coin which name starts with search input
    let filteredByInputRows = tableRows.filter((row: IRow) => { 
      return row.name.toLowerCase().startsWith(searchInput.toLowerCase())});

    setFilteredRows(filteredByInputRows);
  };

  useEffect(() => {
    if (!loading && !error && data) {
      let rows = prepareRows(data.assets);
      setTableRows(rows);
    }
  }, [data]);

  useEffect(() => {
    if (searchInput.length) filterTableByCoinName(searchInput);
  }, [searchInput]);

  console.log('render ', searchInput);
  return loading ? <div>LOADING</div> :(
    <div>
      <h1>Overview Page</h1>
      <SearchBar
        onSearch={setSearchInput}
      />
      <MarketTable
        rows={searchInput.length ? filteredRows : tableRows}
      />
    </div>
  );
};

export default OverviewMarketPage;