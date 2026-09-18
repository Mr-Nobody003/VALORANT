import React from 'react';

const WeaponPreview = ({
  activeTab,
  previewSkin,
  previewBuddy,
  handleEquip,
  handleEquipBuddy,
  equippedWeapons,
  equippedBuddies,
  weaponName
}) => {
  return (
    <div className="w-full lg:w-[calc(100%-400px)] ml-auto h-full flex flex-col items-center pt-[120px] relative z-10">
      <h1 className="text-3xl text-white font-Oswald tracking-widest mb-16 uppercase font-bold text-center px-4 max-w-[800px]">
        {activeTab === 'Skins'
          ? (previewSkin ? previewSkin.displayName : 'SELECT A SKIN')
          : (previewBuddy ? previewBuddy.displayName : 'SELECT A BUDDY')
        }
      </h1>

      {/* Preview Weapon Area */}
      <div className="flex flex-col items-center justify-center m-0 p-0 relative w-full max-w-[1000px] h-[300px] px-8">
        {/* Weapon Image */}
        {previewSkin && (
          <img
            src={previewSkin.displayIcon || previewSkin.chromas?.[0]?.displayIcon}
            alt="Weapon Preview"
            className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
          />
        )}

        {/* Buddy Image (floating near the gun) */}
        {previewBuddy && previewBuddy.displayIcon && (
          <div className="absolute left-[40%] bottom-0 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none hover:scale-110 transition-transform duration-300">
            <img
              src={previewBuddy.displayIcon}
              alt="Buddy Preview"
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </div>
        )}
      </div>

      <div className="mt-16 flex gap-4">
        {activeTab === 'Skins' ? (
          <button
            onClick={handleEquip}
            disabled={!previewSkin || equippedWeapons[weaponName]?.uuid === previewSkin?.uuid || (previewSkin.isDefault && !equippedWeapons[weaponName])}
            className={`
              font-Oswald px-12 py-3 text-xl tracking-widest border border-slate-500
              transition-all duration-300
              ${(!previewSkin || equippedWeapons[weaponName]?.uuid === previewSkin?.uuid || (previewSkin.isDefault && !equippedWeapons[weaponName]))
                ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-[#1a212d] text-white hover:bg-slate-700 hover:border-teal-400'
              }
            `}
          >
            EQUIP SKIN
          </button>
        ) : (
          <button
            onClick={handleEquipBuddy}
            disabled={!previewBuddy || equippedBuddies[weaponName]?.uuid === previewBuddy?.uuid || (previewBuddy.isDefault && !equippedBuddies[weaponName])}
            className={`
              font-Oswald px-12 py-3 text-xl tracking-widest border border-slate-500
              transition-all duration-300
              ${(!previewBuddy || equippedBuddies[weaponName]?.uuid === previewBuddy?.uuid || (previewBuddy.isDefault && !equippedBuddies[weaponName]))
                ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-[#1a212d] text-white hover:bg-slate-700 hover:border-teal-400'
              }
            `}
          >
            EQUIP BUDDY
          </button>
        )}
      </div>
    </div>
  );
};

export default WeaponPreview;
