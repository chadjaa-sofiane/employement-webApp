import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import { userInfo } from "../../../cache";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  userBarContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginLeft: "auto",
  },
  avatar: {
    marginLeft: "2rem",
    cursor: "pointer",
  },
}));

const UserBar = () => {
  const classes = useStyles();
  const myInfo = userInfo();
  const history = useHistory();
  if (!myInfo) return "";
  const userName = `${myInfo?.firstName}_${myInfo?.lastName}`;
  if (myInfo)
    return (
      <div className={classes.userBarContainer}>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <Avatar
          onClick={() => history.push(`/dashboard/profile/${userName}`)}
          className={classes.avatar}
        ></Avatar>
      </div>
    );
};

export default UserBar;
