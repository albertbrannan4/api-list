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

type API = {
  Description: string;
  API: string;
  Link: string;
  Category: string;
};

const CategoryOptions: string[] = [
  "All",
  "Anime",
  "Blockchain",
  "Books",
  "Business",
  "Cryptocurrency",
  "Development",
];

function App() {
  const [apis, setAPIS] = useState<API[]>([]);
  const [categories, setCategories] = useState<string[]>(CategoryOptions);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

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

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };

  const filteredApis = apis.filter((apis: any) => {
    if (selectedCategory === "All") {
      return true;
    } else {
      return apis.Category === selectedCategory;
    }
  });

  return (
    <div className="App">
      <nav>
        <h1>All The API's</h1>
        <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
          <InputLabel id="demo-select-small-label">Categories</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedCategory}
            label="Age"
            name="selectedCategory"
            onChange={handleChange}
          >
            {categories.map((each) => (
              <MenuItem key={each} value={each}>
                {each}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </nav>
      <div className="main">
        {filteredApis.map((each, idx) => (
          <Accordion className="row" key={idx}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ color: "#28282B", fontSize: "1.15rem" }}>
                {each.API}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Description: {each.Description}</Typography>
              <Typography>Category: {each.Category}</Typography>
              <a href={each.Link} target="_blank" rel="noreferrer">
                Docs
              </a>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default App;

// {apis.map((each: any, idx: number) => (
// <Accordion className="row" key={idx}>
//   <AccordionSummary
//     expandIcon={<ExpandMoreIcon />}
//     aria-controls="panel1a-content"
//     id="panel1a-header"
//   >
//     <Typography>
//       {each.API} ({each.Category})
//     </Typography>
//   </AccordionSummary>
//   <AccordionDetails>
//     <Typography>Description: {each.Description}</Typography>
//     <a href={each.Link} target="_blank" rel="noreferrer">
//       Click Me
//     </a>
//   </AccordionDetails>
// </Accordion>
// ))}
