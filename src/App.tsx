// Modules
import { useState } from "react";
import "./styles/App.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Paper,
} from "@mantine/core";

// Components
import ThemeToggle from "./components/ThemeToggle";

// Pages
import Home from "./pages/Home";

function App() {
  // States
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Main
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
            <Home />
            <ThemeToggle
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
