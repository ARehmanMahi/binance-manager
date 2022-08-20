import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
	let { user } = useAuth();

	return (
		<>
			<h1>Profile</h1>
			<h2>Welcome {user.displayName}!</h2>
		</>
	);
};

export default Profile;
