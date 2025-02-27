import { useAuth0 } from "@auth0/auth0-react";

const AuthComponent = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Sign in with Auth0
        </button>
      ) : (
        <div className="text-center">
          <p className="font-bold text-lg">Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
