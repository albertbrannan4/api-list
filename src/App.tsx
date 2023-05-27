import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";
import "./App.css";

const url = "https://api.publicapis.org/entries";
async function getAllAPI(address: string) {
  try {
    const result = await axios.get(url);
    const { entries } = result.data;
    return entries;
  } catch (err) {
    console.error(err);
  }
}

function App() {
  const [apis, setAPIS] = useState<{}[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllAPI(url);
        if (result) {
          setAPIS(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(apis[0]);
  return (
    <div className="App">
      {apis.map((each: any, idx: number) => (
        <Accordion key={idx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {each.API} ({each.Category})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Description: {each.Description}</Typography>
            <a href={each.Link} target="_blank" rel="noreferrer">
              {each.Link}
            </a>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default App;
