
import TableData from "./table";
import { useState, useEffect, useMemo, useCallback } from "react";

const PropsApp = () => {

    const [employee, setEmoployee] = useState({ fnm: "", lnm: "", email: "", age: "" });
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")) || []);
    const [editRow, seteditRow] = useState(-1);
    const [sort, setSort] = useState("fnm");
    const [search, setSearch] = useState("fnm");
    const [searchText, setSearchText] = useState("");

    const handleData = (e) => {
        setEmoployee({ ...employee, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {

        if (editRow !== -1) {
            const updateEdit = info.map((item, index) => index === editRow ? employee : item);
            setInfo(updateEdit);
            seteditRow(-1);
        }
        else {
            setInfo([...info, employee])
        }
        setEmoployee({ fnm: "", lnm: "", email: "", age: "" });
    }

    const handleDelete = (idx) => {
        const deleteRow = info?.filter((item, index) => {
            return (
                index !== idx
            )
        });
        setInfo(deleteRow);
    }

    const handleEdit = (indx) => {
        seteditRow(indx);
        setEmoployee(info[indx]);
    }

    const getValue = useMemo(() => {
        let data = [...info];

        if (searchText && search) {
            data = data.filter((item) =>
                item[search]?.toLowerCase()?.includes(searchText.toLowerCase())
            );
        }

        data.sort((a, b) =>
            a[sort] > b[sort] ? 1 : -1
        );

        return data;
    }, [info, search, searchText, sort]);


    const getBackground = useCallback((fnm) => {
        return fnm?.toLowerCase().startsWith("a") ? "pink" : "lightblue";
    }, [])

    const getAge = useCallback((age) => {
        return age > "30" ? "purple" : "green";
    }, [])

    useEffect(() => {
        localStorage.setItem("info", JSON.stringify(info));
    }, [info]);

    return (
        <div>

            <label htmlFor="fname">First Name </label>
            <input type='text' id='fnm' name="fnm" onChange={(e) => handleData(e)} value={employee.fnm} /><br /><br />

            <label htmlFor="lname">Last Name </label>
            <input type='text' id='lnm' name="lnm" onChange={(e) => handleData(e)} value={employee.lnm} /><br /><br />

            <label htmlFor="email">Email </label>
            <input type="email" id="email" name="email" onChange={(e) => handleData(e)} value={employee.email} /><br /><br />

            <label htmlFor="age">Age </label>
            <input type="number" id="age" name="age" onChange={(e) => handleData(e)} value={employee.age} /><br /><br />

            {/* props => parent to child  */}
            <button type="button" onClick={() => handleSubmit()}>Submit</button><br /><br />

            <TableData data={getValue} deletedata={(e) => handleDelete(e)} editdata={(e) => handleEdit(e)} sort={sort} setSort={setSort} search={search} setSearch={setSearch}
                searchText={searchText} setSearchText={setSearchText} getBackground={getBackground} getAge={getAge} />

        </div>
    )
}
export default PropsApp