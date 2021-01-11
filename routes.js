
//API
const API = "/api";
const GET_USERS = "/getUsers";
const GET_ROOMS = "/getRooms";
const GET_CHATS = "/getChats";

const GET_USER = "/getUser";
const ADD_FRIEND = "/addFriend";
const REMOVE_FRIEND = "/removeFriend";
const BLOCK_USER = "/blockUser";
const CREATE_ROOM = "/createRoom";

const TEST_USER = "/testUser";
const TEST_ROOM = "/testRoom";
const TEST_CHAT = "/testChat";

const DUMMY = "/dummy";

const routes = {
    api:API,
    getUsers:GET_USERS,
    getRooms:GET_ROOMS,
    getChats:GET_CHATS,
    getUser:GET_USER,
    addFriend:ADD_FRIEND,
    removeFriend:REMOVE_FRIEND,
    blockUser:BLOCK_USER,
    createRoom:CREATE_ROOM,
    testUser:TEST_USER,
    testRoom:TEST_ROOM,
    testChat:TEST_CHAT,
    dummy:DUMMY
};

export default routes;
