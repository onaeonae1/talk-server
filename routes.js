// API
const API = '/api';
const GET_USERS = '/getUsers';
const GET_ROOMS = '/getRooms';
const GET_CHATS = '/getChats';

const GET_USER = '/getUser';
const ADD_FRIEND = '/addFriend';
const REMOVE_FRIEND = '/removeFriend';
const BLOCK_USER = '/blockUser';

const TEST_USER = '/testUser';
const TEST_ROOM = '/testRoom';
const TEST_CHAT = '/testChat';

// ROOM
const ROOM = '/room';
const CREATE_ROOM = '/createRoom';
const INVITE_ROOM = '/inviteRoom';
const EXIT_ROOM = '/exitRoom';
const GET_ROOM_CHAT = '/getRoomChat';

// dummy
const DUMMY = '/dummy';

const routes = {
  api: API,
  getUsers: GET_USERS,
  getRooms: GET_ROOMS,
  getChats: GET_CHATS,
  getUser: GET_USER,
  addFriend: ADD_FRIEND,
  removeFriend: REMOVE_FRIEND,
  blockUser: BLOCK_USER,
  testUser: TEST_USER,
  testRoom: TEST_ROOM,
  testChat: TEST_CHAT,
  dummy: DUMMY,

  room: ROOM,
  createRoom: CREATE_ROOM,
  inviteRoom: INVITE_ROOM,
  exitRoom: EXIT_ROOM,
  getRoomChat: GET_ROOM_CHAT,
};

export default routes;
