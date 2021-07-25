import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  userTypeContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  userTypeicon: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  userTypeLAbel: {
    cursor: "pointer",
    textAlign: "center",
  },
}));

function UserTypeField({
  states,
  setState,
  handleChange,
  handleBack,
  handleNext,
}) {
  const classes = useStyle();
  function getNext() {
    handleNext();
    if (states.userType === "jobSekeer") {
      const userData = states;
      delete userData.employer;
      setState({ ...userData, jobSekeer: { type: "employee", jobs: "" } });
      return;
    }
    const userData = states;
    delete userData.jobSekeer;
    setState({ ...userData, employer: { employerType: "freelancer_hired" } });
  }
  return (
    <>
      <Typography className={classes.title} variant="h4">
        you will enter as
      </Typography>
      <br />
      <br />
      <div className={classes.userTypeContainer}>
        <label className={classes.userTypeLAbel} htmlFor="employer">
          <Typography
            className={classes.title}
            color={states.userType === "employer" ? "primary" : "textSecondary"}
            variant="h6"
          >
            Employer
          </Typography>
        </label>
        <input
          hidden
          type="radio"
          name="userType"
          value="employer"
          id="employer"
          onChange={handleChange}
        />
        <label className={classes.userTypeLAbel} htmlFor="jobSekeer">
          <Typography
            color={
              states.userType === "jobSekeer" ? "primary" : "textSecondary"
            }
            variant="h6"
          >
            Job Sekeer
          </Typography>
        </label>
        <input
          hidden
          type="radio"
          name="userType"
          value="jobSekeer"
          id="jobSekeer"
          onChange={handleChange}
        />
      </div>
      <br />
      <br />
      <Button
        onClick={handleBack}
        disabled={false}
        color="secondary"
        variant="contained"
      >
        Back
      </Button>
      <Button
        color="primary"
        variant="contained"
        style={{ float: "right" }}
        onClick={getNext}
      >
        next
      </Button>
    </>
  );
}

export default UserTypeField;
