
import './form.css'
import { useState } from "react";

function Form() {

    const [employee, setEmoployee] = useState({ fnm: "", lnm: "", email: "" });
    const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")) || []);
    const [editRow, seteditRow] = useState(-1);

    const handleData = (e) => {
        setEmoployee({ ...employee, [e.target.name]: e.target.value })
    }


    const submitData = () => {
        if (editRow !== -1) {
            const updated = info.map((item, index) => index === editRow ? employee : item);

            setInfo(updated);
            seteditRow(-1);
        }
        else {
            setInfo([...info, employee]);
        }
        localStorage.setItem("info", JSON.stringify(info));
        setEmoployee({ fnm: "", lnm: "", email: "" });


    };

    const deleteData = (index1) => {
        const deleteRow = info.filter((item, index) => index !== index1);
        setInfo(deleteRow);
        localStorage.setItem("info", JSON.stringify(info));
    }

    const editData = (index2) => {
        seteditRow(index2);
        setEmoployee(info[index2]);
        localStorage.setItem("info", JSON.stringify(info));
    }

    return (
        <>
            <label htmlFor="fname">First Name </label>
            <input type='text' id='fnm' name="fnm" onChange={(e) => handleData(e)} value={employee.fnm} /><br /><br />

            <label htmlFor="lname">Last Name </label>
            <input type='text' id='lnm' name="lnm" onChange={(e) => handleData(e)} value={employee.lnm} /><br /><br />

            <label htmlFor="email">Email </label>
            <input type="email" id="email" name="email" onChange={(e) => handleData(e)} value={employee.email} /><br /><br />

            <button onClick={submitData}>Submit</button><br /><br />


            <table>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>LAst Name</td>
                        <td>Email </td>
                        <td colSpan={2}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {info?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item?.fnm}</td>
                                <td>{item?.lnm}</td>
                                <td>{item?.email}</td>
                                <td>
                                    <button onClick={() => deleteData(index)}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => editData(index)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Form;