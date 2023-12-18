import "./App.css";
import DataHead from "./UserData/DataHead";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(DataHead); // to manage user data
  const [condition, setConditions] = useState<Array<string>>([]); // to manage and/or conditions

  const conditionTypes: any = {
    followers: ["<=", ">="],
    following: ["<=", ">="],
    "Screen Name": ["contains", "equals"],
    Location: ["contains", "equals"],
    Verified: ["yes", "no"],
  };

  const [addBtn, setaddBtn] = useState([
    //add the new field
    {
      id: "1",
      prettyname: "",
      condition: "",
      value: "",
    },
  ]);

  const handleAddBtn = () => {
    //adding the new field
    setaddBtn([
      ...addBtn,
      {
        id: "",
        prettyname: "",
        condition: "",
        value: "",
      },
    ]);
  };

  // handle delete query by users
  const handleRemoveBtn = (index: any) => {
    const newAddDet = addBtn.filter((item, id) => id !== index); // user search query remove
    const c = condition?.filter((item, id) => id !== index - 1); // and / or condition remove
    setaddBtn(newAddDet);
    setConditions(c);
  };

  // Evaluate and get final condition result
  function getFinalOutput(a: any, b: any) {
    console.log("-----------------", a, b);

    let finalOutput = a[0];

    for (let i = 1; i < a.length; i++) {
      const operator = b[i - 1];
      const currentValue = a[i];

      if (operator === "&&") {
        finalOutput = finalOutput && currentValue;
      } else if (operator === "||") {
        finalOutput = finalOutput || currentValue;
      }
    }

    return finalOutput;
  }

  useEffect(() => {
    const final = addBtn.filter((y) => y.condition && y.prettyname && y.value);
    if (final.length) {
      const t = DataHead.filter((w: any) => {
        const sample = final.map((r) => {
          console.log(
            "🚀 ~ file: App.tsx:50 ~ sample ~ r:",
            w[r.prettyname],
            r.condition,
            r.value
          );
          switch (r.condition) {
            case "<=":
              return Number(w[r.prettyname]) <= Number(r.value);
            case ">=":
              return Number(w[r.prettyname]) >= Number(r.value);
            case "contains":
              return w[r.prettyname]
                .toLowerCase()
                .includes(r.value.toLowerCase());
            case "equals":
              return w[r.prettyname].toLowerCase() === r.value.toLowerCase();
            case "yes":
              return w[r.prettyname].toLowerCase() === "yes";
            case "no":
              return w[r.prettyname].toLowerCase() === "no";
            default:
              return false;
          }
        });
        const finalout = getFinalOutput(sample, condition);
        console.log(
          "🚀 ~ file: App.tsx:50 ~ sample ~ sample:",
          sample,
          finalout
        );
        return finalout;
      });
      console.log("🚀 ~ file: App.tsx:51 ~ t ~ t:", t);
      setUserData(t);
    } else {
      setUserData(DataHead);
    }
  }, [addBtn, condition]);

  return (
    <>
      <div className="container_design">
        <p className="">Filter</p>
        <div className="filter_design">
          <button type="button" className="btn_theme" onClick={handleAddBtn}>
            + Add Filter
          </button>
          {addBtn.map((item, idx) => {
            console.log("🚀 ~ file: App.tsx:85 ~ {addBtn.map ~ item:", item);
            return (
              <>
                <div className="field_row">
                  {idx === 0 && (
                    <div key={idx} className="add_rows">
                      <p>Where</p>
                    </div>
                  )}
                  {idx > 0 && (
                    <div className="add_rows">
                      <select
                        className="select_theme"
                        onChange={(e) => {
                          const t = [...condition];
                          t[idx - 1] = e.target.value;
                          console.log("🚀 ~ file: App.tsx:110 ~ t:", t);
                          setConditions(t);
                        }}
                      >
                        <option>choose...</option>
                        <option
                          value="&&"
                          selected={condition[idx - 1] === "&&"}
                        >
                          AND
                        </option>
                        <option
                          value="||"
                          selected={condition[idx - 1] === "||"}
                        >
                          OR
                        </option>
                      </select>
                    </div>
                  )}
                  <div className="add_rows">
                    <select
                      className="select_theme"
                      // name={item.prettyname}
                      onChange={(e) => {
                        const t = [...addBtn];
                        t[idx].prettyname = e.target.value;
                        console.log(
                          "🚀 ~ file: App.tsx:99 ~ {addBtn.map ~ t:",
                          t
                        );
                        setaddBtn(t);
                      }}
                    >
                      <option>choose...</option>
                      <option selected={item.prettyname === "followers"}>
                        followers
                      </option>
                      <option selected={item.prettyname === "following"}>
                        following
                      </option>
                      <option selected={item.prettyname === "Screen Name"}>
                        Screen Name
                      </option>
                      <option selected={item.prettyname === "Location"}>
                        Location
                      </option>
                      <option selected={item.prettyname === "Verified"}>
                        Verified
                      </option>
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
                    <select
                      className="select_theme"
                      onChange={(e) => {
                        const t = [...addBtn];
                        t[idx].condition = e.target.value;
                        if (t[idx].prettyname === "Verified") {
                          t[idx].value = e.target.value;
                        }
                        console.log("🚀 ~ file: App.tsx:110 ~ t:", t);
                        setaddBtn(t);
                      }}
                    >
                      <option>choose...</option>
                      {conditionTypes[item.prettyname]?.map((r: any) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  {item.prettyname !== "Verified" && (
                    <div className="add_rows">
                      <input
                        className="search_theme"
                        name={item.value}
                        onChange={(e) => {
                          const t = [...addBtn];
                          t[idx].value = e.target.value;
                          setaddBtn(t);
                        }}
                        type="text"
                        placeholder="value"
                      />
                    </div>
                  )}
                  <div className="add_rows">
                    <button
                      className="btn_theme"
                      // value={item.removeBtn}
                      onClick={() => handleRemoveBtn(idx)}
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

          {userData.map((itemh, idxh) => {
            return (
              <tr key={idxh} className="heading_data">
                <td>{itemh.name}</td>
                <td>{itemh["Screen Name"]}</td>
                <td>{itemh.followers}</td>
                <td>{itemh.following}</td>
                <td>{itemh.Location}</td>
                <td>{itemh.Verified}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
