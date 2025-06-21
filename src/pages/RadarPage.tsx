import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SendIcon, HeartIcon, CircleOffIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { Page } from '@/components/Page';
import { Content } from '@/components/Content';
import { ContentFeed } from '@/components/ContentFeed';
import { LastSeenBadge } from '@/components/LastSeenBadge';
import { RadarNavigationBar } from '@/navigation/RadarNavigationBar';
import { FiltersDrawer } from '@/pages/drawers/FiltersDrawer';
import { FiltersDrawerProvider } from '@/contexts/FiltersDrawerContext';

import anonUserImage from '@/assets/anon-user-front.png';
import { mockRadarFeedImages } from '@/mock/radar';

interface FeedImageProps {
  id: number;
  imageUrls: string[];
  nickName: string;
  profileSummary: string;
  distance: string;
  lastSeen: number;
}

export const FeedImage: React.FC<FeedImageProps> = ({ id, imageUrls, nickName, profileSummary, distance, lastSeen }) => {
  const navigate = useNavigate();

  const handleSendClick = () => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="w-full mb-4 bg-background overflow-hidden">
      
      {/* Image */}
      {imageUrls.length > 0 ? (
        <div className="relative aspect-[3/4] w-full swiper-container">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              renderBullet: function (_index, className) {
                return '<span class="' + className + '"></span>';
              },
            }}
            className="w-full h-full rounded-lg"
          >
            {imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={nickName}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="relative aspect-[3/1] w-full bg-black/70 rounded-lg">
          <img
            src={anonUserImage}
            alt={nickName}
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: "center 80%" }}
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="p-3 text-foreground">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button className="hover:opacity-70 transition-opacity">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <CircleOffIcon className="w-6 h-6" />
            </button>
            <button 
              className="hover:opacity-70 transition-opacity"
              onClick={handleSendClick}
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <LastSeenBadge lastSeen={lastSeen} />
          </div>
        </div>
        
        {/* Profile info */}
        <div className="text-sm">
          <div className="flex justify-between items-center font-medium">
            <div>{nickName}</div>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <div>{profileSummary}</div>
            <div>{distance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RadarPage: React.FC = () => {
  // Mock data for feed images with multiple images per post
  const feedImages = mockRadarFeedImages;

  return (
    <FiltersDrawerProvider>
      <Page>
        <Content className="flex flex-col h-full">
          <ContentFeed>
            {feedImages.map((image) => (
              <FeedImage
                key={image.id}
                id={image.id}
                imageUrls={image.imageUrls}
                nickName={image.nickName}
                profileSummary={image.profileSummary}
                distance={image.distance}
                lastSeen={image.lastSeen}
              />
            ))}
          </ContentFeed>
          <RadarNavigationBar />
        </Content>
        <FiltersDrawer />
      </Page>
    </FiltersDrawerProvider>
  );
};
