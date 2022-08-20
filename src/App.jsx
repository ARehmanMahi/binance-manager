import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

import LayoutApp from "./layouts/App";
import LayoutGuest from "./layouts/Guest";
import PageLoader from "./components/PageLoader";

const Login = lazy(() => import("./features/Login"));
const Market = lazy(() => import("./features/Market"));
const Profile = lazy(() => import("./features/Profile"));
const PageNotFound = lazy(() => import("./features/PageNotFound"));

function App() {
  const { user } = useAuth();
  const Layout = user ? LayoutApp : LayoutGuest;

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route
                path="/market"
                element={(
                  <RequireAuth>
                    <Market />
                  </RequireAuth>
                )}
              />
              <Route
                path="/profile"
                element={(
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                )}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
