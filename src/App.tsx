import "./App.css";
import DataHead from "./UserData/DataHead";
import { useState } from "react";

function App() {
  const [selectedPrettyName, setselectedPrettyName] = useState(""); // to select a dropdown

  console.log("check-->9", selectedPrettyName);
  const [search, setSearch] = useState(""); //search from the json data
  console.log(search);

  const [addBtn, setaddBtn] = useState([
    //add the new field
    {
      id: "1",
      prettyname: " ",
      textnumber: "",
      removeBtn: "",
    },
  ]);

  const handleAddBtn = () => {
    //adding the new field
    setaddBtn([
      ...addBtn,
      {
        id: "",
        prettyname: "",
        textnumber: "",
        removeBtn: "",
      },
    ]);
  };

  const handleRemoveBtn = (index: any) => {
    //delete the row
    const newAddDet = [...addBtn];
    newAddDet.splice(index, 1);
    setaddBtn(newAddDet);
  };

  console.log(
    DataHead.filter(
      (item) =>
        item.screen_title.toLowerCase().includes(search) ||
        item.name.toUpperCase().includes(search) ||
        item.location_title.toLowerCase().includes(search) ||
        item.verify_title.toLowerCase().includes(search)
    )
  );

  const changeSelectOption = (event: any) => {
    setselectedPrettyName(event.target.value);
  };

  const screenName = ["<=", ">="];
  const location = ["contains", "equals"];
  const verfied = ["yes","no"];

  let type = null;
  let options: any = null;

  if (selectedPrettyName === "Screen Name") {
    type = screenName;
  } else if (selectedPrettyName === "Location") {
    type = location;
  } else if(selectedPrettyName === "Verfied") {
    type = verfied;
  }

  if (type) {
    options = type.map((item) => <option key={item}>{item}</option>);
  }
  console.log("check->54", type);

  return (
    <>
      <div className="container_design">
        <p className="">Filter</p>
        <div className="filter_design">
          <button type="button" className="btn_theme" onClick={handleAddBtn}>
            + Add Filter
          </button>
          {addBtn.map((item, idx) => {
            return (
              <>
                <div className="field_row">
                  <div key={idx} className="add_rows">
                    <p>Where</p>
                  </div>
                  <div className="add_rows">
                    <select
                      className="select_theme"
                      // name={item.prettyname}
                      onChange={changeSelectOption}
                    >
                      <option>choose...</option>
                      <option>Screen Name</option>
                      <option>Location</option>
                      <option>Verified</option>
                      {/* {dataPretty.map((item, opt) => {
                        return (
                          <option key={opt} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })} */}
                    </select>
                  </div>
                  <div className="add_rows">
                    <select className="select_theme">{options}</select>
                  </div>
                  <div className="add_rows">
                    <input
                      className="search_theme"
                      name={item.textnumber}
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="value"
                    />
                  </div>
                  <div className="add_rows">
                    <button
                      className="btn_theme"
                      value={item.removeBtn}
                      onClick={handleRemoveBtn}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="out_tab">
        <table className="Table_design">
          <tr className="heading_title">
            <th>Name</th>
            <th>Screen title</th>
            <th>Follower count</th>
            <th>Following count</th>
            <th>Location</th>
            <th>Verified</th>
          </tr>

          {DataHead.filter(
            (item) =>
              item.screen_title.toLowerCase().includes(search) ||
              item.name.toUpperCase().includes(search) ||
              item.location_title.toLowerCase().includes(search) ||
              item.verify_title.toLowerCase().includes(search)
          ).map((itemh, idxh) => {
            return (
              <tr key={idxh} className="heading_data">
                <td>{itemh.name}</td>
                <td>{itemh.screen_title}</td>
                <td>{itemh.follow_title}</td>
                <td>{itemh.following_title}</td>
                <td>{itemh.location_title}</td>
                <td>{itemh.verify_title}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
