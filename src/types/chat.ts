export type ChatMessageType = 'TEXT' | 'IMAGE' | 'ORDER' | 'SYSTEM';

export type ChatMessage = {
  chatMessageId: string;
  sender: {
    userId: string;
    profileImageUrl: string;
    nickname: string;
  };
  receiver: {
    userId: string;
    profileImageUrl: string;
    nickname: string;
  };

  chatMessageType: ChatMessageType;
  linkText?: string;
  linkUrl?: string;
  message?: string;
  orderOptions?: {
    optionId: string;
    optionName: string;
    optionPrice: number;
    optionQuantity: number;
  }[];
  additionalFee?: number;
  totalAmount?: number;
  chatMessageImageUrl?: string;
  chatMessageStatus: 'CREATED' | 'REPORTED';
  isRead: boolean;
  createdAt: string;
};

export type ChatRoom = {
  chatRoomId: string;
  profileImageUrl: string;
  nickname: string;
  userId: string;
  lastMessage: {
    chatMessageId: string;
    chatMessageType: ChatMessageType;
    userId: string;
    message: string;
    createdAt: string;
    isSenderRead: boolean;
    isReceiverRead: boolean;
  };
};

export type ChatRoomDetail = {
  chatRoomId: string;
  userId: string;
  nickname: string;
};

export interface ChatMessageRequest {
  receiverUserId: string;
  message: {
    chatMessageType: ChatMessageType;
    linkText?: string;
    linkUrl?: string;
    message?: string;
    orderOptions?: {
      optionId: string;
      optionName: string;
      optionPrice: number;
      optionQuantity: number;
    }[];
    additionalFee?: number;
    totalAmount?: number;
    chatMessageImageId?: string;
  };
}
