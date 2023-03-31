import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import base from "./components/firebase";
import SignIn from "./pages/SignIn";
import SetUser from "./pages/SetUser";
import "./App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Paper,
} from "@mantine/core";

function App() {
  const auth = base.auth;
  const [isloged] = useAuthState(auth);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <div>
      <style>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }}>
          <Paper className="paper">
            {/* Is Logged */}
            <>{isloged ? <SetUser /> : <SignIn />}</>
            {/* Theme Toggle */}
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
