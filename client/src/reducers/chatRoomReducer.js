import { actionTypes } from "../actions/chatRoomActions";

export const chatroomInitialState = {
    stompClient: null,
    connected: false,
    room: '',
    roomsSuscribed: [],
    message: '',
    messages: {}
  }

export const chatRoomReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_CONNECTED:
            return { ...state, connected: action.payload };
            case actionTypes.SET_STOMP_CLIENT:
                return { ...state, stompClient: action.payload };
                case actionTypes.ADD_MESSAGE:
                    const { room, message } = action.payload;
                    return {
                        ...state,
                        messages: {
                            ...state.messages,
                            [room]: [...(state.messages[room] || []), message]
                        }
                    };
                    case actionTypes.ADD_ROOM:
                        return {
                            ...state,
                            roomsSuscribed: [...state.roomsSuscribed, action.payload]
                        };
                        case actionTypes.SET_ROOM:
                            return { ...state, room: action.payload };
                            case actionTypes.SET_MESSAGES:
                                return { ...state, messages: action.payload };
                                case actionTypes.SET_MESSAGE:
                                    console.log(action.payload)
                                    return { ...state, message: action.payload };
        default:
            return state;
    }
}