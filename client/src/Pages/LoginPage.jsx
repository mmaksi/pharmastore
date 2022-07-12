import { Link } from "react-router-dom";
import DashboardForm from "../components/DashboardForm";

const Register = () => {
  const loginSubTitle = (
    <p className="text-center">
      Don't have an account?{" "}
      <Link to="/register">
        <span>Create one here</span>
      </Link>
    </p>
  );

  return (
    <DashboardForm
      title="Login"
      labels={["Username", "Password"]}
      placeholders={["mmaksi", "Password"]}
      btnDetails={{ title: "Log in", type: "submit" }}
      types={["text", "password"]}
      names={["username", "password"]}
      accepts={[null, null]}
      formSubTitle={loginSubTitle}
    />
  );
};

export default Register;
