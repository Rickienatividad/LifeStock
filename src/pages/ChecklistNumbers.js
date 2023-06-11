import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export function ChecklistNumbers() {
  // acquire rig checklist index for all rigs
  const [checklists, setChecklists] = useState([]);

  const handleChecklists = () => {
    axios
      .get("http://localhost:3000/rig_checklists.json")
      .then((response) => {
        setChecklists(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  useEffect(handleChecklists, []);

  // logic for populating chart with number of checklists for each rig

  const [counts, setCounts] = useState({});
  const [countsVisible, setCountsVisible] = useState(false);

  const checklistCounter = () => {
    setCountsVisible(!countsVisible);
    let listCounts = {};
    for (let i = 0; i < checklists.length; i++) {
      if (listCounts[checklists[i]["rig_id"]]) {
        listCounts[checklists[i]["rig_id"]]++;
      } else {
        listCounts[checklists[i]["rig_id"]] = 1;
      }
    }
    setCounts(listCounts);
    return listCounts;
  };

  return (
    <div>
      <button type="button" onClick={() => checklistCounter()}>
        Checklists Per Rig
      </button>
      <div
        style={{
          display: countsVisible ? "block" : "none",
          width: "40vw",
          height: "50vh",
        }}
      >
        <Bar
          data={{
            labels: Object.entries(counts).map((list) => list[0]),
            datasets: [
              {
                label: "# of lists saved",
                data: Object.entries(counts).map((list) => list[1]),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: [
                  "red",
                  "green",
                  "blue",
                  "purple",
                  "orange",
                  "yellow",
                ],
              },
            ],
          }}
          options={{
            maintainAspectRatio: true,
            scale: {
              ticks: {
                precision: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
}