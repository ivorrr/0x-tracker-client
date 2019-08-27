import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import AsyncTimePeriodSelector from '../../../components/async-time-period-selector';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import TokenList from './token-list';
import useTokens from '../hooks/use-tokens';

const TokensPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.DAY;
  const page = params.get('page') || 1;

  const [tokens, loadingTokens] = useTokens({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = tokens;

  return (
    <>
      <Helmet>
        <title>Traded Tokens</title>
      </Helmet>
      <PageLayout
        filter={
          <AsyncTimePeriodSelector
            defaultValue={statsPeriod}
            onChange={newPeriod => {
              history.push(
                `${URL.TOKENS}?page=${page}&statsPeriod=${newPeriod}`,
              );
            }}
          />
        }
        title="Traded Tokens"
      >
        <Card fullHeight>
          {loadingTokens ? (
            <LoadingIndicator centered />
          ) : (
            <TokenList
              onPageChange={newPage => {
                history.push(
                  `${URL.TOKENS}?page=${newPage}&statsPeriod=${statsPeriod}`,
                );
              }}
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              recordCount={recordCount}
              tokens={items}
            />
          )}
        </Card>
      </PageLayout>
    </>
  );
};

TokensPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default TokensPage;
