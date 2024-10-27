import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const ViewMembersView = ({ members }) => {
  const creatememberView = (member, index) => (
    <ListItem key={index}>
      <ListItemText primary={member} />
    </ListItem>
  );
  const memberCountTitle = `${members.length} ${
    members.length === 1 ? "member" : 'members'
  }`;
  return (
    <Box variant="section" sx={{ mt: 2, width: 250 }}>
      <Typography variant="h6" sx={{textAlign: "center"}}>{memberCountTitle}</Typography>
      <Divider />
      <List>{members.map(creatememberView)}</List>
    </Box>
  );
};

export default ViewMembersView;
