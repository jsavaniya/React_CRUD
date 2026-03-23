
import './form.css'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import addData from './Actions';

function ReduxForm() {

    const [employee, setEmoployee] = useState({ fnm: "", lnm: "", email: "" });
    // const [info, setInfo] = useState(JSON.parse(localStorage.getItem("info")) || []);
    const [editRow, seteditRow] = useState(-1);
    const selector = useSelector((e) => e);
    const dispatch = useDispatch();


    const handleData = (e) => {
        setEmoployee({ ...employee, [e.target.name]: e.target.value })
    }
    const submitData = () => {
        if (editRow !== -1) {
            seteditRow(-1);
        }
        else {
            dispatch(addData(employee))
        }
        setEmoployee({ fnm: "", lnm: "", email: "" });
    };

    // console.log(selector?.formReducer);

    return (
        <>
            <label htmlFor="fname">First Name </label>
            <input type='text' id='fnm' name="fnm" onChange={(e) => handleData(e)} value={employee.fnm} /><br /><br />

            <label htmlFor="lname">Last Name </label>
            <input type='text' id='lnm' name="lnm" onChange={(e) => handleData(e)} value={employee.lnm} /><br /><br />

            <label htmlFor="email">Email </label>
            <input type="email" id="email" name="email" onChange={(e) => handleData(e)} value={employee.email} /><br /><br />

            <button onClick={submitData}>Submit</button>

            <table>
                <thead>
                    <tr>
                        <td>First name</td>
                        <td>Last name</td>
                        <td>Email </td>
                    </tr>
                </thead>
                <tbody>
                    {selector?.formReducer?.map((e, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{e?.fnm}</td>
                                <td>{e?.lnm}</td>
                                <td>{e?.email}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ReduxForm;