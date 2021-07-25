import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardAction from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import TypoGraphy from "@material-ui/core/Typography";
import SocialMedia from "./SocialMediaIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const EmployerCard = ({ employer }) => {
  const classes = useStyle();
  const { firstName, lastName, email, state, socialMedia, jobFiled } = employer;
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>{firstName.split("")[0]}</Avatar>
        }
        title={
          <TypoGraphy
            color="primary"
            variant="h5"
          >{`${firstName} ${lastName}`}</TypoGraphy>
        }
        subheader={
          <TypoGraphy color="secondary" variant="h6">
            <a href={`email:${email}`}>{email}</a>
          </TypoGraphy>
        }
      />
      <CardContent>
        <TypoGraphy
          variant="h6"
          color="textSecondary"
        >{`state : ${state}`}</TypoGraphy>
        <TypoGraphy varint="h6" color="textSecondary">
          {`jobFiled: ${jobFiled}`}
        </TypoGraphy>
      </CardContent>
      <CardAction>
        {socialMedia?.length
          ? socialMedia.map((s) => <SocialMedia key={s.link} s={s} />)
          : ""}
      </CardAction>
    </Card>
  );
};
export default EmployerCard;
