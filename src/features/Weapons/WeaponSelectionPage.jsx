import React, { useState, useContext, useEffect } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { useWeapons } from '../../hooks/useWeapons';
import { useThemes } from '../../hooks/useThemes';
import { useBuddies } from '../../hooks/useBuddies';
import WeaponGrid from './components/WeaponGrid';
import WeaponPreview from './components/WeaponPreview';

const WeaponSelectionPage = ({ weapon, onBack }) => {
  const { equippedWeapons, setEquippedWeapons, equippedBuddies, setEquippedBuddies } = useContext(PlayerContext);
  
  const [activeTab, setActiveTab] = useState('Skins'); // 'Skins' | 'Buddies'
  const [searchQuery, setSearchQuery] = useState('');
  const [previewSkin, setPreviewSkin] = useState(null);
  const [previewBuddy, setPreviewBuddy] = useState(null);

  const { data: weaponsData, isLoading: weaponsLoading, error: weaponsError } = useWeapons();
  const { data: themesData, isLoading: themesLoading } = useThemes();
  const { data: buddiesData, isLoading: buddiesLoading } = useBuddies();

  useEffect(() => {
    // Init preview skin
    const equipped = equippedWeapons[weapon.name];
    if (equipped) {
      setPreviewSkin(equipped);
    } else {
      setPreviewSkin({
        uuid: 'default',
        displayName: "Standard " + weapon.name,
        displayIcon: weapon.defaultImage,
        isDefault: true
      });
    }
    
    // Init preview buddy
    const buddy = equippedBuddies[weapon.name];
    if (buddy) {
      setPreviewBuddy(buddy);
    } else {
      setPreviewBuddy({
        uuid: 'none',
        displayName: "No Buddy Equipped",
        displayIcon: null,
        isDefault: true
      });
    }
  }, [weapon.name, equippedWeapons, equippedBuddies, weapon.defaultImage]);

  const handleEquip = () => {
    if (previewSkin) {
      if (previewSkin.isDefault) {
        setEquippedWeapons(prev => {
          const next = { ...prev };
          delete next[weapon.name];
          return next;
        });
      } else {
        setEquippedWeapons(prev => ({
          ...prev,
          [weapon.name]: previewSkin
        }));
      }
      onBack();
    }
  };

  const handleEquipBuddy = () => {
    if (previewBuddy) {
      if (previewBuddy.uuid === 'none') {
        setEquippedBuddies(prev => {
          const next = { ...prev };
          delete next[weapon.name];
          return next;
        });
      } else {
        setEquippedBuddies(prev => ({
          ...prev,
          [weapon.name]: previewBuddy
        }));
      }
      onBack();
    }
  };

  if (weaponsLoading || themesLoading || buddiesLoading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 text-teal-400 font-Oswald text-2xl tracking-widest">
        LOADING...
      </div>
    );
  }
  
  if (weaponsError) return <div>Error loading data</div>;

  const wData = Array.isArray(weaponsData) ? weaponsData : weaponsData?.data;
  const tData = Array.isArray(themesData) ? themesData : themesData?.data;
  const bData = Array.isArray(buddiesData) ? buddiesData : buddiesData?.data;

  const apiWeapon = wData?.find(w => w.displayName.toUpperCase() === weapon.name.toUpperCase());
  
  let skins = [];
  if (apiWeapon && apiWeapon.skins) {
    skins = apiWeapon.skins.filter(skin => skin.displayIcon || skin.chromas?.[0]?.displayIcon);
  }

  const defaultSkinOption = {
    uuid: 'default',
    displayName: "Standard " + weapon.name,
    displayIcon: weapon.defaultImage,
    isDefault: true
  };

  const allSkins = [defaultSkinOption, ...skins];
  const filteredSkins = allSkins.filter(s => s.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

  const allBuddies = [
    {
      uuid: 'none',
      displayName: "No Buddy Equipped",
      displayIcon: null,
      isDefault: true
    },
    ...(bData?.filter(b => !b.isHiddenIfNotOwned && b.displayIcon) || [])
  ];
  const filteredBuddies = allBuddies.filter(b => b.displayName.toLowerCase().includes(searchQuery.toLowerCase()));

  let backgroundImageUrl = null;
  if (activeTab === 'Skins' && previewSkin && !previewSkin.isDefault) {
    if (previewSkin.wallpaper) {
      backgroundImageUrl = previewSkin.wallpaper;
    } else if (previewSkin.themeUuid && tData) {
      const theme = tData.find(t => t.uuid === previewSkin.themeUuid);
      if (theme) {
        backgroundImageUrl = theme.displayIcon || theme.storeFeaturedImage;
      }
    }
  } else if (activeTab === 'Buddies' && previewBuddy && !previewBuddy.isDefault) {
    if (previewBuddy.themeUuid && tData) {
      const theme = tData.find(t => t.uuid === previewBuddy.themeUuid);
      if (theme) {
        backgroundImageUrl = theme.displayIcon || theme.storeFeaturedImage;
      }
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full flex">
      {backgroundImageUrl ? (
        <div className="absolute inset-0 w-full h-full -z-10 bg-[#0f1923]">
          <img 
            src={backgroundImageUrl} 
            alt="Skin Wallpaper" 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full -z-10 bg-[#0f1923]"></div>
      )}

      <WeaponGrid
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredSkins={filteredSkins}
        filteredBuddies={filteredBuddies}
        previewSkin={previewSkin}
        setPreviewSkin={setPreviewSkin}
        previewBuddy={previewBuddy}
        setPreviewBuddy={setPreviewBuddy}
      />

      <WeaponPreview
        activeTab={activeTab}
        previewSkin={previewSkin}
        previewBuddy={previewBuddy}
        handleEquip={handleEquip}
        handleEquipBuddy={handleEquipBuddy}
        equippedWeapons={equippedWeapons}
        equippedBuddies={equippedBuddies}
        weaponName={weapon.name}
      />
    </div>
  );
};

export default WeaponSelectionPage;
