import "./Flagpatients.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlagIcon from "@mui/icons-material/Flag";
import Cookies from "js-cookie";
import ToggleFlagged from "../../components/ToggleFlag";
import { Checkbox } from "@mui/material";

export default function FlaggedPatients() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/get/flag"
        );
        console.log(response.data);
        setPatients(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchPosts();
  }, []);
  const [patients, setPatients] = useState([]);

  // const handleDelete = (accountID) => {
  //   setData(data.filter((item) => item.accountID !== accountID));
  // };

  const columns = [
    { field: "accountID", headerName: "accountID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.accountID}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              // onClick={() => handleDelete(params.row.accountID)}
            />
          </>
        );
      },
    },
  ];
  const makeID = (props) => {
    setTimeout(() => {
      Cookies.set("PatientID", props);
    }, 10);
  };

  const [flagged, setFlagged] = useState(false);
  const [flagmessage, setflagmessage] = useState(false);

  const toggleFlag = (event) => () => {
    try {
      console.log("flaggingggg " + event);
      const response = axios
        .put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/set/flag",
          {
            patientID: event,
          }
        )
        .then((response) => {
          console.log(response);
          setflagmessage(response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userList">
      <h1 className="userHeader">Flagged Patients </h1>

      {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      {patients.map((values) => {
        return (
          <div className="userCard">
            <AccountCircleRoundedIcon fontSize="large" />

            <span
              className="userDetails"
              value={values.accountID}
              onClick={() => makeID(values.accountID)}
            >
              <Link to="/profile">
                <span>
                  {" "}
                  {values.patientID}: {values.lastName}, {values.firstName}
                </span>
              </Link>
            </span>
            {/* onclick=cookies.set() */}
            {/* //value={value.accountID} */}
            <Checkbox onChange={toggleFlag(values.patientID)} />
          </div>
        );
      })}
      <h2>{flagmessage}</h2>
    </div>
  );
}
