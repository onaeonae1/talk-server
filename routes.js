// API
const API = '/api';
const GET_USERS = '/getUsers';
const GET_ROOMS = '/getRooms';
const GET_CHATS = '/getChats';
// USER
const USER_INFO = '/userinfo';
const IS_LOGGED_IN = '/isLoggedin';

const GET_USER = '/getUser';
const GET_USER_EMAIL = '/getUserEmail';
const ADD_FRIEND = '/addFriend';
const REMOVE_FRIEND = '/removeFriend';
const BLOCK_USER = '/blockUser';
const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/register';
const CHANGE_PROFILEIMAGE = '/changeProfileImage';
const CHANGE_BACKGROUND = '/changeBackground';

const TEST_USER = '/testUser';
const TEST_ROOM = '/testRoom';
const TEST_CHAT = '/testChat';

// ROOM
const ROOM = '/room';
const CREATE_ROOM = '/createRoom';
const INVITE_ROOM = '/inviteRoom';
const EXIT_ROOM = '/exitRoom';
const GET_ROOM_CHAT = '/getRoomChat';
const GET_ROOM = '/getRoom';

// dummy
const DUMMY = '/dummy';

const routes = {
  api: API,
  getUsers: GET_USERS,
  getRooms: GET_ROOMS,
  getChats: GET_CHATS,
  getUser: GET_USER,
  getUserEmail: GET_USER_EMAIL,
  userInfo: USER_INFO,
  isLoggedin: IS_LOGGED_IN,
  addFriend: ADD_FRIEND,
  removeFriend: REMOVE_FRIEND,
  blockUser: BLOCK_USER,
  login: LOGIN,
  register: REGISTER,
  testUser: TEST_USER,
  testRoom: TEST_ROOM,
  testChat: TEST_CHAT,
  logout: LOGOUT,
  changeProfileImage: CHANGE_PROFILEIMAGE,
  changeBackground: CHANGE_BACKGROUND,

  dummy: DUMMY,

  room: ROOM,
  createRoom: CREATE_ROOM,
  inviteRoom: INVITE_ROOM,
  exitRoom: EXIT_ROOM,
  getRoomChat: GET_ROOM_CHAT,
  getRoom: GET_ROOM,
};

export default routes;
