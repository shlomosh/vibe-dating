import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { Content } from '@/components/Content';
import { ContentFeed } from '@/components/ContentFeed';
import { LastSeenBadge } from '@/components/LastSeenBadge';
import { MessageCountBadge } from '@/components/MessageCountBadge';
import { InboxNavigationBar } from '@/navigation/InboxNavigationBar';

import anonUserImage from '@/assets/anon-user-back.png';
import { mockInboxConversations } from '@/mock/inbox';

interface ConversationItemProps {
    id: number;
    username: string;
    lastMessage: string;
    lastTime: string;
    unreadCount: number;
    lastSeen: number;
    avatarUrl?: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
    id,
    username,
    lastMessage,
    lastTime,
    unreadCount,
    lastSeen,
    avatarUrl
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/chat/${id}`);
    };

    return (
        <div 
            className="w-full p-2 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-9 h-12 rounded-lg overflow-hidden bg-muted">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={anonUserImage}
                                alt={username}
                                className="w-full h-full object-cover opacity-60"
                            />
                        )}
                    </div>
                </div>

                {/* Message content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <div className="font-semibold text-foreground truncate">
                                {username}
                            </div>
                            <LastSeenBadge lastSeen={lastSeen} hideIfNotOnline={true} />
                        </div>
                        <MessageCountBadge count={unreadCount} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground truncate flex-1">
                            {lastMessage}
                        </div>
                        <div className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {lastTime}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const InboxPage: React.FC = () => {
    const conversations = mockInboxConversations;

    return (
        <Page>
            <Content className="flex flex-col h-full">
                <ContentFeed>
                    {conversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            id={conversation.id}
                            username={conversation.username}
                            lastMessage={conversation.lastMessage}
                            lastTime={conversation.lastTime}
                            lastSeen={conversation.lastSeen}
                            unreadCount={conversation.unreadCount}
                            avatarUrl={conversation.avatarUrl}
                        />
                    ))}
                </ContentFeed>
                <InboxNavigationBar />
            </Content>
        </Page>
    );
}; 