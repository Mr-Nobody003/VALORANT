import React from 'react';

const Play_info = ({ activeType }) => {
  return (
    <>
      <div className="flex justify-center items-center text-white">
        {activeType === 'UNRATED' && <div>Unrated: mode is a more casual way to enjoy the game.</div>}
        {activeType === 'COMPETITIVE' && <div>Competitive: mode lets you rank up and test your skills.</div>}
        {activeType === 'SWIFTPLAY' && <div>Swiftplay: is a faster version of the game with shorter rounds.</div>}
        {activeType === 'SPIKE RUSH' && <div>Spike Rush: is a quick mode where every player gets the same gun.</div>}
        {activeType === 'DEATHMATCH' && <div>Deathmatch: is a free-for-all mode with no objectives.</div>}
        {activeType === 'ESCALATION' && <div>Escalation: is a team-based mode where weapon difficulty increases.</div>}
        {activeType === 'TEAM DEATHMATCH' && <div>Team Deathmatch: is a fast-paced mode with team kills.</div>}
        {activeType === 'PREMIER' && <div>Premier: mode is designed for serious competition and ranking.</div>}
        {activeType === 'CUSTOM GAME' && <div>Create your own rules and play with friends in a custom game.</div>}
      </div>
    </>
  );
};

export default Play_info;
