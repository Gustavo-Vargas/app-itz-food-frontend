import { useCreateUser } from "@/api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallBackPage() {
	const navigate = useNavigate();
	const { user } = useAuth0();
	const { createUser } = useCreateUser();
	const hasCreateUser = useRef(false);

	useEffect(() => {
		if (user?.sub && user?.email && !hasCreateUser.current) {
			console.log(user, hasCreateUser.current)
			createUser({ auth0Id: user.sub, email: user.email });
			hasCreateUser.current = true;
		}
		navigate("/");
	}, [createUser, navigate, user]);

	return <div>Loading...</div>;
}
