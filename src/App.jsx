import Counter from "./components/Counter";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/auth/Login";
import {Link, Outlet, Route, Routes} from "react-router-dom";
import RequireAuth from "./utils/RequireAuth";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import Logout from "./components/auth/Logout";

function App() {
  return (
    <div className="App">
      <h1>Auth Example</h1>

      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/protected"
              element={(
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              )}
            />
          </Route>
        </Routes>
      </AuthProvider>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Counter />
      </header>
    </div>
  );
}

function AuthStatus() {
  let {user} = useAuth();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      Welcome {user.displayName}!{" "}
      <Logout />
    </div>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export default App;
