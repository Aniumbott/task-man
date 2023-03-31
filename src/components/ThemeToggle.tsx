// Modules
import { ActionIcon } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

function ThemeToggle(props: any) {
  const { colorScheme, toggleColorScheme } = props;
  const dark = colorScheme === "dark";
  
  // Main
  return (
    <ActionIcon
      variant="filled"
      color={dark ? "blue" : "gray"}
      onClick={() => {
        toggleColorScheme();
        console.log(colorScheme);
      }}
      className="toggle"
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}

      {/* Style */}
      <style>
        {`.toggle{
            margin: 1rem;
            position: fixed;
                top: 0;
                right: 0;
            }`}
      </style>
    </ActionIcon>
  );
}

export default ThemeToggle;
