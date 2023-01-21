 
import { createContext } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

import React from 'react'

const Theme = () => {

    const [theme, setTheme] = useState("light")
   
    return (
        <>
      <NoteContext.Provider>
       value={{theme,setTheme}}
    </NoteContext.Provider>
        </>
    )
}
export default Theme;
 

