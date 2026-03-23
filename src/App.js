import './App.css';
import { useMemo, useState, useEffect } from 'react';

function App() {

  const [user, setUser] = useState({ fname: "", lname: "", age: "" });
  const [information, setInformation] = useState(JSON.parse(localStorage.getItem("information")) || []);
  const [editRow, seteditRow] = useState(-1);
  const [sort, setSort] = useState("fname");
  const [search, setSearch] = useState("fname");
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState([]);

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (editRow !== -1) {
      setInformation(
        information.map(item =>
          item.id === editRow ? { ...user, id: editRow } : item
        )
      );
      seteditRow(-1);
    } else {
      setInformation([...information, { ...user, id: Date.now() }]);
    }

    setUser({ fname: "", lname: "", age: "" });
  }
  const editData = (id) => {
    const row = information.find(item => item.id === id);
    setUser(row);
    seteditRow(id);
  };

  const deleteData = (id) => {
    setInformation(information.filter((item) => {
      return (
        item.id !== id
      )
    }));
  };

  const handleCheckbox = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(information.map(item => item.id));
    } else {
      setSelected([]);
    }
  };

  const deleteSelected = () => {
    setInformation(information.filter((item) => {
      return (
        !selected.includes(item.id)
      )
    }));
    setSelected([]);
  };

  const getValue = useMemo(() => {
    let data = [...information];

    if (searchText) {
      data = data.filter((item) =>
        item[search]?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    }

    data.sort((a, b) =>
      a[sort] > b[sort] ? 1 : -1
    );

    return data;
  }, [information, search, searchText, sort]);

  useEffect(() => {
    localStorage.setItem("information", JSON.stringify(information));
  }, [information]);

  return (
    <>
      <br />
      <label htmlFor="fname">First Name </label>
      <input type='text' id="fname" onChange={(e) => handleOnChange(e)} name="fname" value={user.fname} /><br /><br />

      <label htmlFor="lname">Last Name </label>
      <input type='text' id="lname" name="lname" onChange={(e) => handleOnChange(e)} value={user.lname} /><br /><br />

      <label htmlFor="age">Age </label>
      <input type='number' id="age" name="age" onChange={(e) => handleOnChange(e)} value={user.age} /><br /><br />

      <button onClick={handleSubmit}>Submit</button><br /><br />

      <sapn>Sorting : </sapn>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="fname">Fisrt Name</option>
        <option value="lname">Last Name</option>
        <option value="age">Age</option>
      </select><br /><br />

      <sapn>Searching : </sapn>
      <input type='search' onChange={(e) => setSearchText(e.target.value)} />
      <select onChange={(e) => setSearch(e.target.value)}>
        <option value="fname">Fisrt Name</option>
        <option value="lname">Last Name</option>
        <option value="age">Age  </option>
      </select>
      <br /><br />

      <button onClick={deleteSelected}>Delete Selected</button>
      <br /><br />

      <table>
        <thead>
          <tr>
            <td><input type='checkbox' onChange={handleSelectAll}></input></td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td colSpan={2}>Action</td>
          </tr>
        </thead>
        <tbody>
          {getValue?.map((item) => {
            return (
              <tr key={item.id}>
                <td><input type='checkbox' onChange={() => handleCheckbox(item.id)}></input></td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.age}</td>
                <td><button onClick={() => deleteData(item.id)}>Delete</button></td>
                <td><button onClick={() => editData(item.id)}>Edit</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
