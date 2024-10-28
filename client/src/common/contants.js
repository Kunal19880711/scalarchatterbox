export const IncomingMsg = {};
IncomingMsg.Reset = "reset";
IncomingMsg.ConfirmIdentity = "confirmIdentity";
IncomingMsg.RoomAdded = "roomAdded";
IncomingMsg.RoomDeleted = "roomDeleted";
IncomingMsg.RoomJoined = "roomJoined";
IncomingMsg.UserJoined = "userJoined";
IncomingMsg.UserLeft = "userLeft";
IncomingMsg.NewMessage = "newMessage";

export const OutgoingMsg = {};

OutgoingMsg.SetIdentity = "setIdentity";
OutgoingMsg.CreateRoom = "createRoom";
OutgoingMsg.DeleteRoom = "deleteRoom";
OutgoingMsg.JoinRoom = "joinRoom";
OutgoingMsg.LeaveRoom = "leaveRoom";
OutgoingMsg.SendMessage = "sendMessage";
