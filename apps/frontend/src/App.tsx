import { SyntheticEvent, useCallback, useState } from "react";
import "./App.css";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { AppTab } from "./App.model";
import { Films } from "./features/films";

const App = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.Films);
  const handleTabChange = useCallback(
    (event: SyntheticEvent, newValue: AppTab) => {
      setCurrentTab(newValue);
    },
    [],
  );
  return (
    <div className="App">
      <header className="App-header">
        <TabContext value={currentTab}>
          <Box>
            <TabList onChange={handleTabChange}>
              <Tab label="Films" value={AppTab.Films} />
            </TabList>
          </Box>
          <TabPanel value={AppTab.Films}>
            <Films />
          </TabPanel>
        </TabContext>
      </header>
    </div>
  );
};

export default App;
