import React from 'react';

import { renderWithRouter } from '../../../test-util/react';
import RelayerList from './relayer-list';

const basicProps = {
  relayers: [
    {
      id: 'ddex',
      name: 'DDEX',
      slug: 'ddex',
      stats: {
        tradeCount: 256,
        tradeVolume: 150456.56,
        tradeVolumeChange: 22.5,
        traderCount: 30,
      },
      url: 'https://ddex.io',
    },
    {
      id: 'paradex',
      name: 'Paradex',
      slug: 'paradex',
      stats: {
        tradeCount: 345,
        tradeVolume: 124000,
        tradeVolumeChange: -5.2,
        traderCount: 123,
      },
      url: 'https://paradex.io',
    },
    {
      id: 'radarRelay',
      name: 'Radar Relay',
      slug: 'radar-relay',
      stats: {
        tradeCount: 512,
        tradeVolume: 100000,
        tradeVolumeChange: 221.3,
        traderCount: 82,
      },
      url: 'https://radarrelay.com',
    },
  ],
  statsPeriod: 'month',
};

it('renders with basic props', () => {
  const { container } = renderWithRouter(<RelayerList {...basicProps} />);

  expect(container.firstChild).toMatchSnapshot();
});
