import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import PreHarvestingCard from './PreHarvestingCard';
import PostHarvestingCard from './PostHarvestingCard';
import { SummaryCardsSkeleton } from './Skeletons';

const SummaryCardsContainer: React.FC = () => {
 
  const { baseCapitalGains, holdings, selectedCoins } = useSelector(
    (state: RootState) => state.portfolio
  );

  if (!baseCapitalGains) return <SummaryCardsSkeleton/>;

  // calculate pre-harvesting
  const preStcg = {
    profits: baseCapitalGains.capitalGains.stcg.profits,
    losses: baseCapitalGains.capitalGains.stcg.losses,
    net: baseCapitalGains.capitalGains.stcg.profits - baseCapitalGains.capitalGains.stcg.losses
  };
  const preLtcg = {
    profits: baseCapitalGains.capitalGains.ltcg.profits,
    losses: baseCapitalGains.capitalGains.ltcg.losses,
    net: baseCapitalGains.capitalGains.ltcg.profits - baseCapitalGains.capitalGains.ltcg.losses
  };
  const preRealized = preStcg.net + preLtcg.net;

  
  // calculate post-harvesting
  let postStcgProfits = preStcg.profits;
  let postStcgLosses = preStcg.losses;
  let postLtcgProfits = preLtcg.profits;
  let postLtcgLosses = preLtcg.losses;


  selectedCoins.forEach((coinId) => {
    const asset = holdings.find((h) => h.coin === coinId);
    if (asset) {

      if (asset.stcg.gain > 0) postStcgProfits += asset.stcg.gain;
      if (asset.stcg.gain < 0) postStcgLosses += Math.abs(asset.stcg.gain);

      if (asset.ltcg.gain > 0) postLtcgProfits += asset.ltcg.gain;
      if (asset.ltcg.gain < 0) postLtcgLosses += Math.abs(asset.ltcg.gain);
    }
  });

  const postStcgNet = postStcgProfits - postStcgLosses;
  const postLtcgNet = postLtcgProfits - postLtcgLosses;
  const postRealized = postStcgNet + postLtcgNet;


  // calculate savings
  const savings = preRealized - postRealized;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
      <PreHarvestingCard 
        stcg={preStcg} 
        ltcg={preLtcg} 
        realized={preRealized} 
      />
      <PostHarvestingCard 
        stcg={{ profits: postStcgProfits, losses: postStcgLosses, net: postStcgNet }} 
        ltcg={{ profits: postLtcgProfits, losses: postLtcgLosses, net: postLtcgNet }} 
        realized={postRealized} 
        savings={savings} 
      />
    </div>
  );
};

export default SummaryCardsContainer;