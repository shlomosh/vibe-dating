import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RadarIcon, ZapIcon, SlidersHorizontalIcon, UserIcon, HeartIcon, InboxIcon } from 'lucide-react';
import { ContentNavigation } from '@/components/ContentNavigation';
import { useFiltersDrawer } from '@/contexts/FiltersDrawerContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const RadarNavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openDrawer } = useFiltersDrawer();
  const { translations: { globalDict } } = useLanguage();

  const handleNavigationClick = (label: string) => { 
    switch (label) {
      case 'Inbox':
        navigate('/inbox');
        break;
      case 'Radar':
        navigate('/radar');
        break;
      case 'Filters':
        openDrawer();
        break;
      case 'Likes':
        break;
      case 'Board':
        break;
      case 'Profile':
        break;
      default:
        console.log(`Navigation to ${label} not implemented yet`);
    }
  };

  // Determine active state based on current location
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { 
      icon: RadarIcon, 
      label: globalDict.radar, 
      isActive: isActive('/radar'),
      onClick: () => handleNavigationClick("Radar")
    },
    { 
      icon: SlidersHorizontalIcon, 
      label: globalDict.filters,
      isActive: false,
      onClick: () => handleNavigationClick("Filters")
    },
    { 
      icon: HeartIcon, 
      label: globalDict.likes,
      isActive: false,
      onClick: () => handleNavigationClick("Likes")
    },
    { 
      icon: InboxIcon, 
      label: globalDict.inbox,
      isActive: isActive('/inbox'),
      onClick: () => handleNavigationClick("Inbox")
    },
    { 
      icon: ZapIcon, 
      label: globalDict.board,
      isActive: false,
      onClick: () => handleNavigationClick("Feed")
    },
    { 
      icon: UserIcon, 
      label: globalDict.profile,
      isActive: false,
      onClick: () => handleNavigationClick("Profile")
    }
  ];

  return <ContentNavigation items={navigationItems} />;
}; 