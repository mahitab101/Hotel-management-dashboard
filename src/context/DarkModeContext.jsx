import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setISDarkMode] = useLocalStorageState(false, "isDarkMode");
   
    useEffect(()=>{
        if(isDarkMode){
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        }else{
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    },[isDarkMode])

    function toggleDarkMode() {
        setISDarkMode((isDark) => !isDark)
    }
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
    )
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) throw new Error("Somethis went wrong with dark mode");
    return context;
}

export { DarkModeProvider, useDarkMode }
