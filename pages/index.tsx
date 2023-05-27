import React from 'react';
import TestPlayer from '@/components/shared/features/api-calls-components/PostSeasonPlayers';
import PlayerData from '@/components/shared/features/api-calls-components/playerData';
import PostSeasonPlayers from '@/components/shared/features/api-calls-components/PostSeasonPlayers';

type Props = {};

const Home = (props: Props) => {

  return (
    <div className='text-black'>
      Home
      <PostSeasonPlayers/>
    </div>
  );
};

export default Home;
