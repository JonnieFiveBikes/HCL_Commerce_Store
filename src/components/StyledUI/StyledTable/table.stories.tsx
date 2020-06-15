/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import StyledTable, { StyledTableIcons } from "./StyledTable";
import { ThumbUp, ThumbDown } from "@material-ui/icons";

const nbaDataString =
  '[{"id":1,"abbreviation":"ATL","city":"Atlanta","conference":"East","division":"Southeast","full_name":"Atlanta Hawks","name":"Hawks"},{"id":2,"abbreviation":"BOS","city":"Boston","conference":"East","division":"Atlantic","full_name":"Boston Celtics","name":"Celtics"},{"id":3,"abbreviation":"BKN","city":"Brooklyn","conference":"East","division":"Atlantic","full_name":"Brooklyn Nets","name":"Nets"},{"id":4,"abbreviation":"CHA","city":"Charlotte","conference":"East","division":"Southeast","full_name":"Charlotte Hornets","name":"Hornets"},{"id":5,"abbreviation":"CHI","city":"Chicago","conference":"East","division":"Central","full_name":"Chicago Bulls","name":"Bulls"},{"id":6,"abbreviation":"CLE","city":"Cleveland","conference":"East","division":"Central","full_name":"Cleveland Cavaliers","name":"Cavaliers"},{"id":7,"abbreviation":"DAL","city":"Dallas","conference":"West","division":"Southwest","full_name":"Dallas Mavericks","name":"Mavericks"},{"id":8,"abbreviation":"DEN","city":"Denver","conference":"West","division":"Northwest","full_name":"Denver Nuggets","name":"Nuggets"},{"id":9,"abbreviation":"DET","city":"Detroit","conference":"East","division":"Central","full_name":"Detroit Pistons","name":"Pistons"},{"id":10,"abbreviation":"GSW","city":"Golden State","conference":"West","division":"Pacific","full_name":"Golden State Warriors","name":"Warriors"},{"id":11,"abbreviation":"HOU","city":"Houston","conference":"West","division":"Southwest","full_name":"Houston Rockets","name":"Rockets"},{"id":12,"abbreviation":"IND","city":"Indiana","conference":"East","division":"Central","full_name":"Indiana Pacers","name":"Pacers"},{"id":13,"abbreviation":"LAC","city":"LA","conference":"West","division":"Pacific","full_name":"LA Clippers","name":"Clippers"},{"id":14,"abbreviation":"LAL","city":"Los Angeles","conference":"West","division":"Pacific","full_name":"Los Angeles Lakers","name":"Lakers"},{"id":15,"abbreviation":"MEM","city":"Memphis","conference":"West","division":"Southwest","full_name":"Memphis Grizzlies","name":"Grizzlies"},{"id":16,"abbreviation":"MIA","city":"Miami","conference":"East","division":"Southeast","full_name":"Miami Heat","name":"Heat"},{"id":17,"abbreviation":"MIL","city":"Milwaukee","conference":"East","division":"Central","full_name":"Milwaukee Bucks","name":"Bucks"},{"id":18,"abbreviation":"MIN","city":"Minnesota","conference":"West","division":"Northwest","full_name":"Minnesota Timberwolves","name":"Timberwolves"},{"id":19,"abbreviation":"NOP","city":"New Orleans","conference":"West","division":"Southwest","full_name":"New Orleans Pelicans","name":"Pelicans"},{"id":20,"abbreviation":"NYK","city":"New York","conference":"East","division":"Atlantic","full_name":"New York Knicks","name":"Knicks"},{"id":21,"abbreviation":"OKC","city":"Oklahoma City","conference":"West","division":"Northwest","full_name":"Oklahoma City Thunder","name":"Thunder"},{"id":22,"abbreviation":"ORL","city":"Orlando","conference":"East","division":"Southeast","full_name":"Orlando Magic","name":"Magic"},{"id":23,"abbreviation":"PHI","city":"Philadelphia","conference":"East","division":"Atlantic","full_name":"Philadelphia 76ers","name":"76ers"},{"id":24,"abbreviation":"PHX","city":"Phoenix","conference":"West","division":"Pacific","full_name":"Phoenix Suns","name":"Suns"},{"id":25,"abbreviation":"POR","city":"Portland","conference":"West","division":"Northwest","full_name":"Portland Trail Blazers","name":"Trail Blazers"},{"id":26,"abbreviation":"SAC","city":"Sacramento","conference":"West","division":"Pacific","full_name":"Sacramento Kings","name":"Kings"},{"id":27,"abbreviation":"SAS","city":"San Antonio","conference":"West","division":"Southwest","full_name":"San Antonio Spurs","name":"Spurs"},{"id":28,"abbreviation":"TOR","city":"Toronto","conference":"East","division":"Atlantic","full_name":"Toronto Raptors","name":"Raptors"},{"id":29,"abbreviation":"UTA","city":"Utah","conference":"West","division":"Northwest","full_name":"Utah Jazz","name":"Jazz"},{"id":30,"abbreviation":"WAS","city":"Washington","conference":"East","division":"Southeast","full_name":"Washington Wizards","name":"Wizards"}]';
const nbaData = JSON.parse(nbaDataString);

const columnData = [
  { title: "Team Name", field: "full_name" },
  { title: "Abbreviation", field: "abbreviation" },
  { title: "City", field: "city" },
  { title: "Conference", field: "conference" },
  { title: "Division", field: "division" }
];

storiesOf("Widgets/Material Table", module)
  .addDecorator(withKnobs)
  .add("Bare Minimum Table", () => (
    <StyledTable
      columns={[
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" }
      ]}
      data={[
        {
          name: "Vince",
          surname: "Carter"
        },
        {
          name: "Jon",
          surname: "Jones"
        }
      ]}
      title="Simple Table"
      icons={StyledTableIcons}
      options={{
        search: false,
        filtering: false
      }}
    />
  ))
  .add("Basic Material Table Example", () => (
    <StyledTable
      columns={[
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa", 22: "Toronto" }
        }
      ]}
      data={[
        {
          name: "Mehmet",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 63
        },
        {
          name: "Vincent",
          surname: "Chan",
          birthYear: 1989,
          birthCity: 22
        }
      ]}
      title="Basic Material Table Example"
      icons={StyledTableIcons}
    />
  ))
  .add("Fixed First Column", () => (
    <StyledTable
      icons={StyledTableIcons}
      columns={columnData}
      data={nbaData}
      title="Fixed First Column"
      options={{
        fixedColumns: {
          left: 1,
          right: 0
        }
      }}
    />
  ))
  .add("Actions Column", () => (
    <StyledTable
      icons={StyledTableIcons}
      columns={columnData}
      data={nbaData}
      title="Actions Column"
      options={{
        search: false,
        actionsColumnIndex: -1
      }}
      actions={[
        {
          icon: () => <ThumbUp />,
          tooltip: "Like",
          onClick: (event, rowData: any) =>
            alert(`You're a fan of the ${rowData.full_name}`)
        },
        {
          icon: () => <ThumbDown />,
          tooltip: "Delete User",
          onClick: (event, rowData: any) =>
            alert(`You don't like the ${rowData.name}`)
        }
      ]}
    />
  ))
  .add("Details Drawer", () => (
    <StyledTable
      icons={StyledTableIcons}
      columns={[
        { title: "Team Name", field: "full_name" },
        { title: "Abbreviation", field: "abbreviation" }
      ]}
      data={nbaData}
      title="Details Drawer"
      detailPanel={[
        {
          tooltip: "Show Name",
          render: (rowData: any) => {
            return (
              <div
                style={{
                  color: "white",
                  backgroundColor: "#EEE",
                  fontSize: "10px",
                  padding: "25px"
                }}>
                <StyledTable
                  columns={[
                    { title: "City", field: "city" },
                    { title: "Conference", field: "conference" },
                    { title: "Division", field: "division" }
                  ]}
                  data={[
                    {
                      id: 1,
                      abbreviation: "ATL",
                      city: "Atlanta",
                      conference: "East",
                      division: "Southeast",
                      full_name: "Atlanta Hawks",
                      name: "Hawks"
                    }
                  ]}
                  icons={StyledTableIcons}
                  title="Team Details"
                  options={{
                    search: false,
                    minBodyHeight: "0px",
                    paging: false,
                    rowStyle: {
                      fontSize: "10px"
                    }
                  }}
                />
              </div>
            );
          }
        }
      ]}
      options={{
        search: false
      }}
    />
  ));
