import {
    Box,
    Card,
    CardContent,
    CssBaseline,
    Divider,
    Typography,
  } from "@mui/material";

  import Plot from 'react-plotly.js';
  import Plotly from "plotly.js-dist"
  // import Plotly from "plotly.js"


  import LDSCCellPageList from "../components/LDSCCellPageList";
  import './LDSCCellPage.css';
  
  
  import axios from 'axios';
  import { useEffect, useState, useCallback } from 'react';
  import { Row,Col } from 'react-bootstrap';
  import Accordion from 'react-bootstrap/Accordion';
import { type } from "@testing-library/user-event/dist/type";


var data_val={}
var layout_val={}


  
const {api_body_info} = require('../constant.js');


function LDSCCellPage(){


  const [cohortName, setCohortName] = useState("");
  const [cohortData, setCohortData] = useState({});
  var x_val=[]
  var y_val=[]

  useEffect(() => {
    if(cohortName!=""){
    api_body_info["file_path"]=cohortName;
      
      axios
      .post(
        "http://10.20.0.124:8080/plotLDSC",api_body_info
      )
      .then((res) => {
        setCohortData(res.data);
      });
    }
    
  }, [cohortName]);

  // make wrapper function to give child
  const wrapperSetCohortName = useCallback(
    (name) => {
      setCohortName(name);
    },
    [setCohortName]
  );


  
  if("Name" in cohortData && Object.keys(cohortData).length>0 && Object.keys(cohortData["Name"]).length>0) {
    
    // x_val=cohortData.map(d => d.Name);
    // y_val=cohortData.map(d => d['-LOG10P']);
    // const colors = Plotly.d3.scale.category10().range();

    var darkMode=false;


    var tempel=cohortName.split('/').at(-1).split('_').at(0)
    var colorsEl=cohortData["Name"];
    var colorTitle="Name";

    const all_cell_type=["gene","chromatin"]

    {console.log(cohortData)}
    if (all_cell_type.includes(tempel)){
        colorsEl=cohortData["Tissue"];
        colorTitle="Tissue";
    }
    else if (tempel=="immgen"){
      colorsEl=cohortData["celltype1"];
      colorTitle="CellType1";
    }

    data_val = [{
      x: cohortData.Name,
      y: cohortData["-LOG10P"],
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: colorsEl?.map((t, i) => i),
        colorscale: 'Viridis',
        colorbar: {
          title: colorTitle,
          tickvals: [...Array(cohortData.length).keys()],
          ticktext: cohortData.Tissue,
        },
        discrete: true,
      },
      customdata1: cohortData["Coefficient"],//["Coefficient_std_error"],
      customdata2: cohortData["Coefficient_std_error"],
      tissueData: colorsEl,
      hovertemplate: '<b>Chromatin Cell Type</b>: %{x}<br> <b>-LOG10P</b>: %{y}<br> <b>%{colorTitle}</b>: %{{tissueData}}<br> <b>Coefficient</b>: %{customdata1}<br> <b>Std. Error</b>: %{customdata2}'
    }];
  
    layout_val={ 
      title: tempel.toUpperCase() + ' Analysis', 
      xaxis: { showticklabels: false }, 

      plot_bgcolor: darkMode ? "rgb(38, 50, 56)" : "white",
      paper_bgcolor: darkMode ? "rgb(38, 50, 56)" : "white",
      font: {
          color: darkMode ? "white" : "black",
        },

      //template: 'plotly_dark', 
      yaxis: { title: '-LOG10P' } };



  }

  
    // console.log(cohortData)
    // if ("Name" in cohortData){
    // console.log(Object.keys(cohortData).length)
    // }

    return (

<Box
      id="drawer__container"
      sx={{
        position: "relative",
        display: "flex",
        minHeight: "95%",
      }}
    >
      <CssBaseline />
      <LDSCCellPageList
        cohortName={cohortName}
        cohortnameSetter={wrapperSetCohortName}
      />

      {("Name" in cohortData && Object.keys(cohortData).length>0 )? (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginLeft: 10, marginRight: 15 }}
        >
          <Card>
            <CardContent>
              <Typography component="div" variant="h5">
                {cohortName.split(/[/ ]+/).pop()}
              </Typography>
              <Divider
                sx={{
                  border: "2px solid #50CB86",
                  marginTop: 2,
                  marginBottom: 3,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                
                

              {/* <Plot
                  data={[
                    {
                      x: cohortData.map(d => d.Name),
                      y: cohortData.map(d => d['-LOG10P']),
                      type: 'scatter',
                      mode: 'markers',
                      //marker:{colors: ["#5eba7d", "#1565c0"]}
                      colors: cohortData.map(d => d['Tissue'])
                    }
                  ]}
                  layout={{ title: 'My Plotly Graph', xaxis: { title: 'Name' }, yaxis: { title: '-LOG10P' } }}
              /> */}


                {console.log(data_val)}

                <Plot data={data_val} layout={ layout_val} />
                  
            



              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            textAlign: "center",
          }}
        >
          {/* <img src={emptyStateImg} /> */}
          <Typography component="div" variant="h6">
            Please Select a Cohort to Begin
          </Typography>
        </Box>
      )}
    </Box>



    );
}



export default LDSCCellPage;