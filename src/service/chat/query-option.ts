export const chatQueryKey = {
  all: ['chat'],

  roomList: () => [...chatQueryKey.all, 'room-list'],

  rooms: () => [...chatQueryKey.all, 'room'],
  room: (chatRoomId: string) => [...chatQueryKey.rooms(), chatRoomId],
  userRoom: (userId: string) => [...chatQueryKey.rooms(), userId],

  roomMessages: () => [...chatQueryKey.rooms(), 'message'],
  roomMessage: (chatRoomId: string) => [
    ...chatQueryKey.roomMessages(),
    chatRoomId,
  ],
};
