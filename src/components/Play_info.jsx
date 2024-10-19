import React from 'react';

const Play_info = ({ activeType }) => {
  return (
    <>
      <div className="flex justify-center items-center text-white text-[10px] pb-[10px]">
        {activeType === 'UNRATED' && <div>Unrated:Standard VALORANT.Switch between attack and defense at the half.Plant, defuse, or eliminate the enemy team to win rounds.First to 13 wins</div>}
        {activeType === 'COMPETITIVE' && <div>Competitive: Standard VALORANT with a ranked ladder. Prove your skills & climb the ranks. Switch between attack and defense at the half. Plant, defuse, or eliminate the enemy team to win rounds. First to 13 wins.</div>}
        {activeType === 'SWIFTPLAY' && <div>Swiftplay: Shorter games of VALORANT with a simplified economy. Plant, defuse, or eliminate the enemy team to win rounds. First to 5 wins.</div>}
        {activeType === 'SPIKE RUSH' && <div>Spike Rush: Shorter games of VALORANT with added powerup orbs and randomized weapons. Plant, defuse, or eliminate the enemy team to win rounds. First to 4 wins.</div>}
        {activeType === 'DEATHMATCH' && <div>Deathmatch: Practice your gunplay in a quick free-for-all. No abilities, economy, or rounds. First player to 40 kills wins</div>}
        {activeType === 'ESCALATION' && <div>Escalation: Eliminate enemies to advance your team's arsenal. Cycle through a series of 12 randomized weapons. First to complete the series wins.</div>}
        {activeType === 'TEAM DEATHMATCH' && <div>Team Deathmatch: Ability-enabled team deathmatch on a unique ast of maps. Progress through a series of increasingly powerful loadouts. First team to 100 kills wins</div>}
        {activeType === 'PREMIER' && <div>Premier: mode is designed for serious competition and ranking.</div>}
        {/* {activeType === 'CUSTOM GAME' && <div> </div>} */}
      </div>
    </>
  );
};

export default Play_info;
