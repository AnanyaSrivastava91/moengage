import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SearchPage from "./Components/SearchPage";
import MyLists from "./Components/MyLists";
import Context from "./Context";
import { supabase } from "../src/supabaseClient";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";

function App() {
  const [session, setSession] = useState("");

  const signOut = async () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = useMemo(
    () => ({ session, setSession, signOut }),
    [session, setSession, signOut]
  );

  return (
    <div>
      <Context.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/lists" element={<MyLists />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
