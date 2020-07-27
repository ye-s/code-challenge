import React from 'react';
import './App.scss';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import OverviewMarketPage from './pages/OverviewMarketPage';
import CoinDetailsPage from './pages/CoinDetailsPage';
const GET_MARKET = gql`
  query PageAssets {
    assets(sort: [{ marketCapRank: DESC }], page: { limit: 25 }) {
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

const App = () => {
  return (
    <div className='market-app'>
      <Switch>
        <Route exact path="/">
          <OverviewMarketPage />
        </Route>
        <Route exact path="/details/:coin">
          <CoinDetailsPage />
        </Route>
        <Route>
          <div><h1>NOT FOUND 404</h1></div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
