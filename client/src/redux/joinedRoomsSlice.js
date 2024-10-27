import { createSlice } from "@reduxjs/toolkit";

const dummyInitalValue = [
  {
    name: "alpha",
    members: ["John Doe", "Jack Doe", "Ruby Karl"],
    chats: [
      { name: "John Doe", content: "Hello! How are you?" },
      { name: "Jack Doe", content: "Hi, I'm fine" },
      { name: "Ruby Karl", content: "It's a nice weather today." },
      { name: "John Doe", content: "What do you like?" },
      { name: "Jack Doe", content: "I like playing soccer." },
      { name: "Ruby Karl", content: "I like playing tennis." },
      { name: "John Doe", content: "I like playing basketball." },
      { name: "Jack Doe", content: "I like playing badminton." },
    ],
  },
  {
    name: "bravo",
    members: ["Alice Smith", "Bob Brown", "Eve White"],
    chats: [
      { name: "Alice Smith", content: "Hey everyone!" },
      { name: "Bob Brown", content: "Good to see you all." },
      { name: "Eve White", content: "What are we discussing today?" },
      { name: "Alice Smith", content: "Let's talk about technology." },
      { name: "Bob Brown", content: "I love programming." },
      { name: "Eve White", content: "Same here, I enjoy web development." },
    ],
  },
  {
    name: "charlie",
    members: ["Tom Green", "Lucy Yellow", "Sam Blue"],
    chats: [
      { name: "Tom Green", content: "Hello team!" },
      { name: "Lucy Yellow", content: "Hi Tom, how's it going?" },
      { name: "Sam Blue", content: "Good afternoon everyone." },
      { name: "Tom Green", content: "Let's plan our next meeting." },
      { name: "Lucy Yellow", content: "We should discuss our project updates." },
      { name: "Sam Blue", content: "I have some new ideas to share." },
    ],
  },
];

const initialState = dummyInitalValue;

const joinedRoomsSlice = createSlice({
  name: "joinedRooms",
  initialState,
  reducers: {
    setJoinedRooms: (state, action) => action.payload,

    addRoomToJoinedRooms: (state, action) =>
      state.includes(action.payload) ? state : [...state, action.payload],

    removeRoomFromJoinedRooms: (state, action) =>
      state.filter((roomInfo) => roomInfo.name !== action.payload),

    addMemberToJoinedRoom: (state, action) =>
      state.map((roomInfo) => {
        if (roomInfo.name !== action.payload.room) {
          return roomInfo;
        }
        roomInfo.members = [...roomInfo.members, action.payload.member];
        return roomInfo;
      }),

    removeMemberFromJoinedRoom: (state, action) =>
      state.map((roomInfo) => {
        if (roomInfo.name !== action.payload.room) {
          return roomInfo;
        }
        roomInfo.members = roomInfo.members.filter(
          (member) => member.username !== action.payload.member.username
        );
        return roomInfo;
      }),
  },
});

export const {
  setJoinedRooms,
  addRoomToJoinedRooms,
  removeRoomFromJoinedRooms,
  addMemberToJoinedRoom,
  removeMemberFromJoinedRoom,
} = joinedRoomsSlice.actions;
export default joinedRoomsSlice.reducer;
