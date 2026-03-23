import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Antd() {

    const [details, setDetails] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Address',
            dataIndex: ['address', 'city'],
            key: 'address'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website'
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: ((a, r) => {
                const keys = Object.keys(a);
                const values = Object.values(a);
                return (
                    <div>
                        {keys.map((k, v) => {

                            // console.log("kkkkkk :", k)
                            //  console.log("vvvvvvvv :", values[v])

                            return (
                                <p>
                                    <b>{k} :</b> {values[v]}
                                </p>
                            )
                        })}
                    </div>
                )
            })
        },
        {
            title: 'Action',
            render: ((e, u, y) => {
                return (
                    <button onClick={() =>
                        axios.delete(`https://jsonplaceholder.typicode.com/${y}`)
                            .then((res) => console.log(res)
                            )
                            .catch((e) => {
                                console.log(e);

                            })

                    }>Delete</button>
                )
            })
        }, {
            title: 'Action',
            render: ((e, u, y) => {
                return (
                    <button onClick={() =>
                        axios.put(`https://jsonplaceholder.typicode.com/users/${y}`, { name: "Janvi", username: "test", phone: "+91 78965 12365" })
                            .then((res) => console.log(res)
                            )
                            .catch((e) => {
                                console.log(e);

                            })

                    }>Edit</button>
                )
            })
        }
    ];

    useEffect(() => {

        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                const data = res?.data?.map(item => ({
                    ...item, key: item.id
                }));
                setDetails(data);
            })
            .catch((e) => {
                console.log(e);
            })

    }, [])

    return (
        <>
            <Table columns={columns} dataSource={details} />

        </>
    )

}

export default Antd;