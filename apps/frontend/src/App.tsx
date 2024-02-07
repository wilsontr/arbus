import { useCallback, useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import "./App.css";

import { Box, Tab, Tabs } from "@mui/material";
import { Films } from "./features/films";
import { Developers } from "./features/developers";

const App = () => {
  const [currentTab, setCurrentTab] = useState<string>("/films");
  const handleTabChange = useCallback(
    (_: any, newTab: string) => {
      setCurrentTab(newTab);
    },
    [setCurrentTab],
  );
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <>
            <Box>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab
                  label="Films"
                  value="/films"
                  component={Link}
                  to="/films"
                />
                <Tab
                  label="Developers"
                  value="/developers"
                  component={Link}
                  to="/developers"
                />
              </Tabs>
            </Box>
            <Routes>
              <Route
                path="/films"
                element={
                  <Box>
                    <Films />
                  </Box>
                }
              />
              <Route
                path="/developers"
                element={
                  <Box>
                    <Developers />
                  </Box>
                }
              />
            </Routes>
          </>
        </header>
      </div>
    </BrowserRouter>
  );
};

export default App;
