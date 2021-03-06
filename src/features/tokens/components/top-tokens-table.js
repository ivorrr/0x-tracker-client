import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import TokenImage from './token-image';
import TokenLink from './token-link';
import tokensPropTypes from '../prop-types';

const TableCell = styled.td`
  padding-bottom: 1.4rem;
`;

const TableRow = styled.tr`
  &:last-child ${TableCell} {
    padding-bottom: 0;
  }
`;

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  font-size: 0.9rem;
`;

const TopTokensTable = ({ statsPeriod, tokens }) => (
  <table css="width: 100%;">
    <thead css="display: none;">
      <tr>
        <th colSpan="2">Token</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      {tokens.map((token) => (
        <TableRow key={token.address}>
          <TableCell css="padding-right: 1.25rem;">
            <TokenImage imageUrl={token.imageUrl} size="40px" />
          </TableCell>
          <TableCell width="99%">
            <TokenLink
              address={token.address}
              css="display: block; line-height: 1;"
              params={{ statsPeriod }}
            >
              {token.symbol}
            </TokenLink>
            <SecondaryText>
              {_.truncate(token.name, { length: 35 })}
            </SecondaryText>
          </TableCell>
          <TableCell css="text-align: right; white-space: nowrap;">
            <LocalisedAmount
              amount={token.stats.tradeVolume.USD}
              css="font-weight: 500; display: block; line-height: 1;"
              summarize
            />
            {_.isNumber(token.stats.tradeVolumeChange.USD) && (
              <PercentageChange css="display: block;">
                {token.stats.tradeVolumeChange.USD}
              </PercentageChange>
            )}
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  </table>
);

TopTokensTable.propTypes = {
  statsPeriod: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats).isRequired,
};

export default TopTokensTable;
