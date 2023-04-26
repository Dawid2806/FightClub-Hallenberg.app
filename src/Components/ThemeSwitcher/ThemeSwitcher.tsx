import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useColorMode } from "../../hooks/useColorMode";

export const ThemeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <div className="flex mr-7">
      {colorMode === "light" ? (
        <MoonIcon
          className="h-6 w-6 text-gray-300 "
          onClick={toggleColorMode}
        />
      ) : (
        <SunIcon className="h-6 w-6 text-gray-300 " onClick={toggleColorMode} />
      )}
    </div>
  );
};
