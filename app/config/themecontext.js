// themeContext.js
"use client";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext("light");

export const useTheme = () => useContext(ThemeContext);
