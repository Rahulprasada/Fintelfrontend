import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Divider, Popover } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface ProfileDialogBoxProps {
  open: boolean;
  onClose: (value: string) => void;
  setOpen: (value: boolean) => void;
}

export function ProfileDialogBox(props: ProfileDialogBoxProps) {

  const navigate = useNavigate();  
  const { onClose, open, setOpen } = props;

  const handleClose = () => {
    // onClose(selectedValue);
    setOpen(false);
  };

  const handleClickLog =()=>{
    navigate("/");
  }

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column"}}>
        <Box sx={{ display: "flex", flexDirection: "row", p: 2  }}>
          <AccountCircleIcon />&nbsp;&nbsp;
          <Typography>User@gmail.com</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "row", p: 2 ,cursor:"pointer" }}  onClick={handleClickLog}>
          <LogoutIcon />&nbsp;&nbsp;
          <Typography>Log Out</Typography>
        </Box>
      </Box>
    </Popover>
  );
}
