import { Link } from "react-router-dom";
import DashboardForm from "../components/DashboardForm";

const Register = () => {
  const registerSubTitle = <p className="text-center">Already a member? <Link to="/login"><span>Log in here</span></Link></p>

  return (
    <DashboardForm
      title="Sign Up"
      labels={["Username", "E-mail", "Password"]}
      placeholders={["mmaksi", "example@gmail.com", "Password"]}
      btnDetails={{ title: "Sign Up", type: "submit" }}
      types={["text", "email", "password"]}
      names={["username", "email", "password"]}
      accepts={[null, null, null]}
      formSubTitle={registerSubTitle}
      invalidInputMessages={["Required field", "Invalid email", "Required field"]}
    />
  );
};

export default Register;
