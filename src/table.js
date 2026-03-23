import './table.css'

const TableData = ({ data, deletedata, editdata, sort, setSort, search, setSearch, searchText, setSearchText, getBackground, getAge }) => {

    return (
        <>

            <span>Sorting : </span>
            <select onChange={(e) => setSort(e.target.value)} value={sort}>
                <option value="fnm">Fisrt Name</option>
                <option value="lnm">Last Name</option>
                <option value="email">Email  </option>
                <option value="age">Age</option>
            </select>
            <br /><br />

            <span>Searching : </span>
            <input type="search" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
            <select onChange={(e) => setSearch(e.target.value)} value={search}>
                <option value="fnm">Fisrt Name</option>
                <option value="lnm">Last Name</option>
                <option value="email">Email  </option>
                <option value="age">Age</option>
            </select>
            <br /><br />

            <table>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last name</td>
                        <td>Email</td>
                        <td>Age</td>
                        <td colSpan={2}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((ele, index) => {
                        return (
                            <tr key={index} style={{ backgroundColor: getBackground(ele?.fnm)}} >
                                <td>{ele?.fnm}</td>
                                <td>{ele?.lnm}</td>
                                <td>{ele?.email}</td>
                                <td style={{color : getAge(ele?.age), fontWeight:"500"}}>{ele?.age}</td>
                                {/* lifting stateup => child to parent  */}
                                <td><button onClick={() => deletedata(index)}>Delete</button></td>
                                <td><button onClick={() => editdata(index)}>Edit</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

        </>
    )
}

export default TableData;