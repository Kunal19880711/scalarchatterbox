export const SocketEvents = {};
SocketEvents.Connect = "connect";
SocketEvents.Disconnect = "disconnect";

export const OutgoingMsg = {};
OutgoingMsg.ConfirmIdentity = "confirmIdentity";
OutgoingMsg.RoomAdded = "roomAdded";
OutgoingMsg.RoomDeleted = "roomDeleted";
OutgoingMsg.RoomJoined = "roomJoined";
OutgoingMsg.UserJoined = "userJoined";
OutgoingMsg.UserLeft = "userLeft";
OutgoingMsg.NewMessage = "newMessage";

export const OutgoingFormResponseMsg = {};
OutgoingFormResponseMsg.UserCreation = "userCreationResponse";
OutgoingFormResponseMsg.RoomCreation = "roomCreationResponse";

export const IncomingMsg = {};

IncomingMsg.SetIdentity = "setIdentity";
IncomingMsg.CreateRoom = "createRoom";
IncomingMsg.DeleteRoom = "deleteRoom";
IncomingMsg.JoinRoom = "joinRoom";
IncomingMsg.LeaveRoom = "leaveRoom";
IncomingMsg.SendMessage = "sendMessage";
