import type { FC, ReactNode } from 'react';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PlusIcon, TrashIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Page } from '@/components/Page.tsx';
import { Content } from '@/components/Content';
import { ContentFeed } from '@/components/ContentFeed';
import { ContentNavigation } from '@/components/ContentNavigation';
import { TextEditor } from '@/components/TextEditor';
import { ImageEditor } from '@/components/ImageEditor';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { useProfile } from '@/contexts/ProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProfileId, ProfileRecord, defaultProfile } from '@/types/profile';
import { generateRandomId } from '@/utils/generator';
import { cn } from '@/lib/utils';

import { mockProfileImageUrls } from '@/mock/profile';

const ProfileSelect: FC<{ selectCfg: { label?: string | ReactNode, options: any }, className?: string, enableClearOption?: boolean, disabled?: boolean, value?: string, onValueChange?: (value: string) => void }> = ({ selectCfg, className = "", enableClearOption = true, disabled = false, value = '--', onValueChange }) => {
    const emptyValue = '--';

    return (
        <div className={cn(className, "text-sm text-foreground")}>
            <Select disabled={disabled} value={value} onValueChange={onValueChange}>
                {selectCfg.label && <span className="px-1">{selectCfg.label}</span>}
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={emptyValue} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{selectCfg.label}</SelectLabel>
                        {enableClearOption ? (<SelectItem className="italic" key={emptyValue} value={emptyValue}>{emptyValue}</SelectItem>) : null}
                        {
                            Object.keys(selectCfg.options).map((value) => (
                                <SelectItem key={value} value={value}>{selectCfg.options[value]}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

const ProfileAlbumCarousel = () => {
    const [images, setImages] = useState<string[]>([]);
    const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const { translations: { globalDict } } = useLanguage();

    useEffect(() => {
        const loadImages = async () => {
            // Using Lorem Picsum for random placeholder images
            const imageUrls = mockProfileImageUrls;

            setImages(imageUrls);
        };

        loadImages();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const clickPercentage = (clickY / rect.height) * 100;

        if (clickPercentage <= 75) {
            setIsAlbumDialogOpen(true);
        }
    };

    const handleDeleteImage = () => {
        if (images.length > 0) {
            const newImages = [...images];
            newImages.splice(currentSlideIndex, 1);
            setImages(newImages);
            // Reset current slide index if we're at the end
            if (currentSlideIndex >= newImages.length) {
                setCurrentSlideIndex(Math.max(0, newImages.length - 1));
            }
        }
    };

    const handleAddImage = (imageUrl: string) => {
        console.log('handleAddImage', imageUrl);
        setImages([...images, imageUrl]);
    };

    const CarouselContent = () => {
        const swiperRef = React.useRef<any>(null);

        return (
            <div className="relative aspect-[3/4] w-full swiper-container">
                <Swiper
                    modules={[Pagination]}
                    grabCursor={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: function (_index, className) {
                            return '<span class="' + className + '"></span>';
                        },
                    }}
                    className="w-full h-full rounded-lg"
                >
                    {images.length > 0 ? images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex w-full h-full relative">
                                <img
                                    src={item}
                                    alt={`Profile Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    style={{
                                        minWidth: "100%",
                                        minHeight: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                                {index === 0 && (
                                    <div className="absolute bottom-[1.25rem] right-[1.25rem] z-10">
                                        <Badge variant="outline" className="bg-black/80 text-foreground h-[1.5rem]">
                                            {globalDict.profileImage}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    )) : (
                        <SwiperSlide className="flex items-center justify-center">
                            <div className="flex w-full h-full items-center justify-center text-foreground">
                                {(isAlbumDialogOpen) ? (<>{globalDict.noImagesOnAlbum}</>) : (<>{globalDict.clickToEditAlbum}</>)}
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        );
    };

    return (
        <>
            <div onClick={handleClick} className="cursor-pointer">
                <CarouselContent />
            </div>
            <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
                <DialogContent className="w-auto h-auto p-0 border-2 border border-white rounded-[2%]">
                    <div className="w-[85vw] -[3/4]">
                        <CarouselContent />
                        <div className="absolute top-[100%] pb-16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                            <div className="flex gap-2">
                                <TrashIcon
                                    className={
                                        `w-10 h-10 rounded-[8px] p-2 border-2 bg-black/50 ${images.length == 0
                                            ? "text-white/50 border-white/10 cursor-not-allowed"
                                            : "text-white border-white/20 hover:border-white/50"
                                        }`}
                                    onClick={handleDeleteImage}
                                />
                                <PlusIcon
                                    className={
                                        `w-10 h-10 rounded-[8px] p-2 border-2 bg-black/50 ${images.length >= 5
                                            ? "text-white/50 border-white/10 cursor-not-allowed"
                                            : "text-white border-white/20 hover:border-white/50"
                                        }`}
                                    onClick={() => {
                                        if (images.length < 5) {
                                            setIsImageEditorOpen(true);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isImageEditorOpen} onOpenChange={setIsImageEditorOpen}>
                <DialogContent className="w-auto h-auto p-0 border-2 border border-white rounded-[2%]">
                    <div className="w-[85vw] aspect-[3/4]">
                        <ImageEditor
                            onClose={() => setIsImageEditorOpen(false)}
                            onImageSave={handleAddImage}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

const CreateProfileDialog: FC<{
    onClose?: () => void,
    onSubmit?: (newProfileId: string) => void
}> = ({ onClose, onSubmit }) => {
    const [newProfileName, setNewProfileName] = useState<string>('');
    const { translations: { globalDict } } = useLanguage();

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" size="icon" className="text-foreground">
                    <PlusIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{globalDict.addProfile}</DialogTitle>
                    <DialogDescription>
                        {globalDict.enterNewProfileName}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        className="w-full"
                        type="text"
                        placeholder="Enter new profile name (visible only to you)"
                        value={newProfileName}
                        onChange={(e) => setNewProfileName(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <div className="flex gap-2 justify-end">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (onClose) onClose();
                                }}
                            >
                                {globalDict.cancel}
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                disabled={newProfileName.trim().length === 0}
                                onClick={() => {
                                    if (onSubmit) onSubmit(newProfileName.trim());
                                }}
                                autoFocus
                            >
                                {globalDict.create}
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

const DeleteProfileDialog: FC<{
    profileName: string | undefined,
    onClose?: () => void,
    onSubmit?: () => void
}> = ({ profileName, onClose, onSubmit }) => {
    const { translations: { globalDict } } = useLanguage();

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" size="icon" className="text-foreground">
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{globalDict.deleteProfile}</DialogTitle>
                    <DialogDescription>
                        {globalDict.deleteProfileAreYouSureQ(profileName || 'Default Profile')}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex gap-2 justify-end">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (onClose) onClose();
                                }}
                            >
                                {globalDict.cancel}
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={async () => {
                                    if (onSubmit) { onSubmit(); }
                                }}
                                autoFocus
                            >
                                {globalDict.delete}
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export const ProfileSetupPage: FC = () => {
    const navigate = useNavigate();
    const { profileDB, setProfileDB, isLoading } = useProfile();
    const { translations: { globalDict, profileDict }, direction } = useLanguage();

    const [profileId, setProfileId] = useState<string | undefined>();
    const [profileIdList, setProfileIdList] = useState<Array<string>>([]);
    const [profileRecord, setProfileRecord] = useState<ProfileRecord>(defaultProfile);

    const PrevArrowIcon = direction === 'rtl' ? ArrowRightIcon : ArrowLeftIcon;
    const NextArrowIcon = direction === 'rtl' ? ArrowLeftIcon : ArrowRightIcon;

    useEffect(() => {
        if (profileDB) {
            const activeProfileId = profileDB.id || Object.keys(profileDB.db)[0];
            if (activeProfileId) {
                setProfileId(activeProfileId);
                setProfileIdList(Object.keys(profileDB.db));
                setProfileRecord(profileDB.db[activeProfileId]);
            }
        }
    }, [profileDB]);

    const handleProfileChange = (field: keyof ProfileRecord, value: string | undefined) => {
        if (!profileDB || !profileId) return;

        const newProfileDB = { ...profileDB };
        if (field === 'hosting' && value === 'hostOnly') {
            newProfileDB.db[profileId] = {
                ...profileRecord,
                [field]: value || '',
                travelDistance: 'none'
            };
        } else {
            newProfileDB.db[profileId] = {
                ...profileRecord,
                [field]: value || ''
            };
        }
        setProfileDB(newProfileDB);
        setProfileRecord(newProfileDB.db[profileId]);
    };

    const handleActiveProfileChange = (value: ProfileId) => {
        if (!profileDB) return;
        const newProfileDB = { ...profileDB, id: value };
        setProfileDB(newProfileDB);
        setProfileId(value);
        setProfileRecord(newProfileDB.db[value]);
    };

    const handlePrevPageClick = () => {
        navigate('/');
    }

    const handleNextPageClick = () => {
        navigate('/location');
    }

    const handleDeleteProfile = async () => {
        if (!profileDB || !profileId) return;

        const newProfileDB = { ...profileDB };
        delete newProfileDB.db[profileId];
        newProfileDB.id = Object.keys(newProfileDB.db)[0];
        await setProfileDB(newProfileDB);
    }

    const handleCreateProfile = async (newProfileName: string) => {
        if (!profileDB) return;

        const newProfileId = generateRandomId();
        const newProfileDB = { ...profileDB };
        newProfileDB.db[newProfileId] = {...profileRecord, profileName: newProfileName };
        newProfileDB.id = newProfileId;
        await setProfileDB(newProfileDB);
    }

    const profileOptions = profileIdList.reduce((obj, id) => {
        obj[id] = profileDB?.db[id]?.profileName || id;
        return obj;
    }, {} as Record<string, string>);

    const navigationItems = [
        {
            icon: PrevArrowIcon,
            label: globalDict.back,
            onClick: handlePrevPageClick
        },
        {
            icon: NextArrowIcon,
            label: globalDict.next,
            onClick: handleNextPageClick
        }
    ];

    if (isLoading) {
        return (
            <Page back={true}>
                <Content>
                    <div className="flex items-center justify-center h-full">
                        <div>{globalDict.loading}</div>
                    </div>
                </Content>
            </Page>
        );
    }

    return (
        <Page back={true}>
            <Content className='text-sm text-foreground'>
                <ContentFeed>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <div className="flex items-end">
                                <div className="grow">
                                    <ProfileSelect
                                        className="font-bold"
                                        selectCfg={{
                                            label: globalDict.selectProfile,
                                            options: profileOptions
                                        }}
                                        enableClearOption={false}
                                        value={profileId}
                                        onValueChange={(value) => handleActiveProfileChange(value)}
                                    />
                                </div>
                                <div>
                                    <CreateProfileDialog onSubmit={handleCreateProfile} />
                                </div>
                                <div>
                                    <DeleteProfileDialog 
                                        profileName={profileRecord?.profileName}
                                        onSubmit={handleDeleteProfile} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <span className="ps-1">{profileDict.nickName.label}</span>
                            <Input
                                type="text"
                                className="text-sm"
                                placeholder={profileDict.nickName.label}
                                value={profileRecord?.nickName}
                                onChange={(e) => handleProfileChange('nickName', e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 px-10 py-5">
                            <ProfileAlbumCarousel />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.age}
                                value={profileRecord?.age}
                                onValueChange={(value) => handleProfileChange('age', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.position}
                                value={profileRecord?.position}
                                onValueChange={(value) => handleProfileChange('position', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.hosting}
                                value={profileRecord?.hosting}
                                onValueChange={(value) => handleProfileChange('hosting', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.travelDistance}
                                disabled={(profileRecord?.hosting !== 'travelOnly') && (profileRecord?.hosting !== 'hostAndTravel')}
                                value={profileRecord?.travelDistance}
                                onValueChange={(value) => handleProfileChange('travelDistance', value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <span className="ps-1">{profileDict.aboutMe.label}</span>
                            <TextEditor
                                className="text-sm"
                                placeholder={profileDict.aboutMe.label}
                                value={profileRecord?.aboutMe}
                                onChange={(value) => handleProfileChange('aboutMe', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.body}
                                value={profileRecord?.body}
                                onValueChange={(value) => handleProfileChange('body', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.healthPractices}
                                value={profileRecord?.healthPractices}
                                onValueChange={(value) => handleProfileChange('healthPractices', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.equipmentSize}
                                value={profileRecord?.equipmentSize}
                                onValueChange={(value) => handleProfileChange('equipmentSize', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.buttShape}
                                value={profileRecord?.buttShape}
                                onValueChange={(value) => handleProfileChange('buttShape', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.hivStatus}
                                value={profileRecord?.hivStatus}
                                onValueChange={(value) => handleProfileChange('hivStatus', value)}
                            />
                        </div>

                        <div>
                            <ProfileSelect
                                selectCfg={profileDict.preventionPractices}
                                value={profileRecord?.preventionPractices}
                                onValueChange={(value) => handleProfileChange('preventionPractices', value)}
                            />
                        </div>
                    </div>
                </ContentFeed>
                <ContentNavigation items={navigationItems} />
            </Content>
        </Page>
    );
}
