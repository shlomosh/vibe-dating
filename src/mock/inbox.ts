import { generateRandomProfileNickNameSimple } from "@/utils/generator";

export const mockInboxConversations = [
    {
        id: 1,
        username: generateRandomProfileNickNameSimple(1),
        lastMessage: "Hey! How are you doing? 😊",
        lastTime: "2m ago",
        lastSeen: 0,
        unreadCount: 3,
        avatarUrl: `https://picsum.photos/100/100?random=1`
    },
    {
        id: 2,
        username: generateRandomProfileNickNameSimple(2),
        lastMessage: "Thanks for the message!",
        lastTime: "5m ago",
        lastSeen: 5,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=2`
    },
    {
        id: 3,
        username: generateRandomProfileNickNameSimple(3),
        lastMessage: "Are you free this weekend?",
        lastTime: "12m ago",
        lastSeen: 15,
        unreadCount: 1,
        avatarUrl: `https://picsum.photos/100/100?random=3`
    },
    {
        id: 4,
        username: generateRandomProfileNickNameSimple(4),
        lastMessage: "That sounds great! Let's meet up",
        lastTime: "1h ago",
        lastSeen: 45,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=4`
    },
    {
        id: 5,
        username: generateRandomProfileNickNameSimple(5),
        lastMessage: "I had a really good time last night",
        lastTime: "2h ago",
        lastSeen: 90,
        unreadCount: 5,
        avatarUrl: `https://picsum.photos/100/100?random=5`
    },
    {
        id: 6,
        username: generateRandomProfileNickNameSimple(6),
        lastMessage: "Can't wait to see you again!",
        lastTime: "3h ago",
        lastSeen: 120,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=6`
    },
    {
        id: 7,
        username: generateRandomProfileNickNameSimple(7),
        lastMessage: "What are your plans for tonight?",
        lastTime: "5h ago",
        lastSeen: 180,
        unreadCount: 2,
        avatarUrl: `https://picsum.photos/100/100?random=7`
    },
    {
        id: 8,
        username: generateRandomProfileNickNameSimple(8),
        lastMessage: "Thanks for the great conversation",
        lastTime: "1d ago",
        lastSeen: 1440,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=8`
    },
    {
        id: 9,
        username: generateRandomProfileNickNameSimple(9),
        lastMessage: "Hope you're having a good day!",
        lastTime: "2d ago",
        lastSeen: 2880,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=9`
    },
    {
        id: 10,
        username: generateRandomProfileNickNameSimple(10),
        lastMessage: "Let's catch up soon!",
        lastTime: "3d ago",
        lastSeen: 4320,
        unreadCount: 1,
        avatarUrl: `https://picsum.photos/100/100?random=10`
    },
    {
        id: 11,
        username: generateRandomProfileNickNameSimple(11),
        lastMessage: "Thanks for the great conversation",
        lastTime: "1d ago",
        lastSeen: 1440,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=11`
    },
    {
        id: 12,
        username: generateRandomProfileNickNameSimple(12),
        lastMessage: "Hope you're having a good day!",
        lastTime: "2d ago",
        lastSeen: 2880,
        unreadCount: 0,
        avatarUrl: `https://picsum.photos/100/100?random=12`
    },
    {
        id: 13,
        username: generateRandomProfileNickNameSimple(13),
        lastMessage: "Let's catch up soon!",
        lastTime: "3d ago",
        lastSeen: 4320,
        unreadCount: 1,
        avatarUrl: `https://picsum.photos/100/100?random=13`
    }        
];