import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

  const handleChange = () => {};

  return (
    <div className="App">
      <nav>
        <h1>All The API's</h1>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Categories</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={categories}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </nav>
      {apis.map((each: any, idx: number) => (
        <Accordion className="row" key={idx}>
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
