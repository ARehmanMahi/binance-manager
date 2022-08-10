import {useAuth} from "../../contexts/AuthContext";

const Dashboard = () => {
  let {user} = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome {user.displayName}!</h2>
    </>
  );
};

export default Dashboard;