import React, { useEffect, useState } from "react";
import "./UserDetails.scss";
import DataTable from "react-data-table-component";
import axios from "axios";

const UserDetails = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  const handleFilter = (event) => {
    const newData = data.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase()) || row.email.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: row => row.address,
      sortable: true,
    },
   
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setData(response.data.users);
        setRecords(response.data.users);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="user-details-body">
      <div>
        <input type="text" onChange={handleFilter} placeholder="Filter by name or email" />
      </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        selectableRows
        fixedHeader
      />
    </div>
  );
};

export default UserDetails;
