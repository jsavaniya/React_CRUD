import axios from 'axios';
import { useEffect, useState } from 'react';
import './demo.css'

function Demo() {


    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3001/info/create")
            .then((res) => {
                console.log(res?.data);
                setInfo(res?.data);
            })
            .catch((err) => {
                console.log(err);

            });
    }, []);

    console.log("infooo : ",info);

    return (
        <>
            <br />
            <h2>Employee Information</h2><br />
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Post</td>
                        <td>Salary </td>
                    </tr>
                </thead>
                <tbody>
                    {info?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.post}</td>
                                <td>{item?.salary}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )

}

export default Demo;