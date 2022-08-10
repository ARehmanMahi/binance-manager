import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {useAuth} from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

import LayoutApp from "./layouts/App";
import LayoutGuest from "./layouts/Guest";
import PageLoader from "./components/PageLoader";

const Profile = lazy(() => import("./features/Profile"));
const PageNotFound = lazy(() => import("./features/PageNotFound"));

function App() {
  const {user} = useAuth();
  const Layout = user ? LayoutApp : LayoutGuest;

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
