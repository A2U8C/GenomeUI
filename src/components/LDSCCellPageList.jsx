import React, { useEffect, useState } from "react";
import axios from "axios";
import MuiDrawer from "@mui/material/Drawer";
import styled from "@emotion/styled";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";

// Icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";



const drawerWidth = "240px";
const Drawer = styled(MuiDrawer)({
  // "& .MuiDrawer-paper": {
  //   backgroundColor: "#312F44",
  //   color: "#fff",
  // },
});

export default function CohortsList(props) {
  const [availOpen, setAvailOpen] = useState(false);
  const [unavailOpen, setUnavailOpen] = useState(false);

  const [cohortAllList, setcohortAllList] = useState([]);
  const [cohortMissingList, setCohortMissingList] = useState([]);
  const [childCohortName, setChildCohortName] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(
    (cohortnameSetter = props.cohortnameSetter) => {
      cohortnameSetter(childCohortName);
    },
    [props.cohortnameSetter, childCohortName]
  );

  // Get List of Cohorts
  useEffect(() => {
    axios.post("http://10.20.0.124:8080/allLDSCCell").then((res) => {
        //console.log(res.data);
      setcohortAllList(res.data);
    });
  }, []);

  const handleAvailClick = (text, id) => {
    setChildCohortName(text);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{ style: { position: "absolute" } }}
      BackdropProps={{ style: { position: "absolute" } }}
      ModalProps={{
        container: document.getElementById("drawer__container"),
        style: { position: "absolute" },
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },

        "& ::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* Available Cohorts  */}
      <List
        subheader={
          <ListSubheader component="div">List of Cell Type </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            setAvailOpen((availOpen) => !availOpen);
          }}
        >
          <ListItemText primary="Available" />
          {availOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={availOpen} timeout="auto" unmountOnExit>
          {cohortAllList.map((text, index) => (
            <Tooltip title={text} enterDelay={700} arrow>

              <Box key={index + "_" + text}>
                <ListItemButton
                  onClick={() => {
                    handleAvailClick(text, index);
                    setSelected(text);
                  }}
                  selected={selected === text}
                >
                    {/* {console.log(text.split(/[/ ]+/).pop())} */}
                  <ListItemText
                    primary={
                        
                        text.split(/[/ ]+/).pop().length > 15 ? text.split(/[/ ]+/).pop().slice(0, 15) + "..." : text.split(/[/ ]+/).pop()
                    }
                  />
                </ListItemButton>
              </Box>
            </Tooltip>
          ))}
        </Collapse>

      </List>
    </Drawer>
  );
}