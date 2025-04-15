import React, { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { MdDateRange, MdOutlineAccessTime } from "react-icons/md";
import { fetchSingleUsers } from "../redux/usersSlice";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Using useParams to get the id

export const UserDetail = () => {
  const { id } = useParams();
  const dispatch =useDispatch()
  const {singleuser,isLoading}=useSelector((state)=>state.users)

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUsers(id)); // Fetch the user based on the id
    }
  }, [id, dispatch]);

  const activityData = [
    {
      img: "activity_user",
      head: "Swati purchased bot",
      txt: "17-03-2025",
      txt1: "12:30 PM",
    },
    {
      img: "activity_user",
      head: "Swati purchased bot",
      txt: "17-03-2025",
      txt1: "12:30 PM",
    },
    {
      img: "activity_user",
      head: "Alex Attempts login",
      txt: "17-03-2025",
      txt1: "12:30 PM",
    },
    {
      img: "activity_user",
      head: "Swati purchased bot",
      txt: "17-03-2025",
      txt1: "12:30 PM",
    },
    {
      img: "activity_user",
      head: "Swati purchased bot",
      txt: "17-03-2025",
      txt1: "12:30 PM",
    },
  ];
  const tableData = [
    {
      num: "1",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
    {
      num: "2",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Failed",
      addcls: "red",
    },
    {
      num: "3",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
    {
      num: "4",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Failed",
      addcls: "red",
    },
    {
      num: "5",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
    {
      num: "6",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Failed",
      addcls: "red",
    },
    {
      num: "7",
      tdate: "16-01-2025",
      edate: "16-01-2025",
      type: "Basic",
      price: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
  ];
  const usertableData = [
    {
      num: "1",
      name: "Demoname",
      email: "demoname@yopmail.com",
      date: "16-01-2025 12:48 PM",
      amt: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
    {
      num: "2",
      name: "Demoname",
      email: "demoname@yopmail.com",
      date: "16-01-2025 12:48 PM",
      amt: "$ 1,000",
      status: "Failed",
      addcls: "red",
    },
    {
      num: "3",
      name: "Demoname",
      email: "demoname@yopmail.com",
      date: "16-01-2025 12:48 PM",
      amt: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
    {
      num: "4",
      name: "Demoname",
      email: "demoname@yopmail.com",
      date: "16-01-2025 12:48 PM",
      amt: "$ 1,000",
      status: "Failed",
      addcls: "red",
    },
    {
      num: "5",
      name: "Demoname",
      email: "demoname@yopmail.com",
      date: "16-01-2025 12:48 PM",
      amt: "$ 1,000",
      status: "Successful",
      addcls: "green",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <section className="user">
          <div className="row">
            <div className="col-xXl-5 col-xl-6 col-lg-8 col-md-9 col-sm-11">
              <div className="count_box">
                <div className=" d-flex justify-content-between align-items-center flex-wrap">
                  <div className="user_data d-flex align-items-center">
                    <img src="/images/users.png" className="img-fluid" alt="" />
                    <div>
                      <h6 className="mb-0">User ID :{singleuser?.id}</h6>
                      <p className="mb-0">{singleuser?.username}</p>
                      <span>Email ID :{singleuser?.email}</span>
                    </div>
                  </div>
                  <div className="user_btn mt-3 mt-sm-0">
                    <select className="form-select" defaultValue={singleuser?.is_active ? "activate" : "deactivate"}>
                      <option value="activate">Activate</option>
                      <option value="deactivate">Deactivate</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt_cstm">
            <div className="col-xxl-4 col-md-5 col-lg-6">
              <div className="count_box center_down p-0">
                <h3 className="mb-0">Recent Activity</h3>
                <ul className="p-0 m-0">
                  {activityData.map((data, i) => (
                    <li key={i} className="d-flex align-items-center">
                      <img
                        src={`/images/${data.img}.png`}
                        className="img-fluid"
                        alt=""
                      />
                      <div>
                        <p>{data.head}</p>
                        <div className="d-flex align-items-center activity_box">
                          <div className="activity_log">
                            <MdDateRange />
                            <span>{data.txt1}</span>
                          </div>
                          <div className="activity_log">
                            <MdOutlineAccessTime />
                            <span>{data.txt}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xxl-8 col-md-7 col-lg-6">
              <div className="count_box p-0">
                <div className="dashboard_head mb-0">
                  <h5 className="mb-0">Subscription History</h5>
                </div>
                <div className="table-responsive">
                  <table
                    id=""
                    className="table simple_tbl nowrap mb-0"
                    style={{ overflowX: "auto" }}
                  >
                    <thead className="gry">
                      <tr className="">
                        <th>Sr. No.</th>
                        <th>Transaction Date</th>
                        <th>Expiry Date</th>
                        <th>Plan Type</th>
                        <th>Plan Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, i) => (
                        <tr key={i}>
                          <td>{data.num}</td>
                          <td>{data.tdate}</td>
                          <td>{data.edate}</td>
                          <td>{data.type}</td>
                          <td>{data.price}</td>
                          <td className={`${data.addcls}`}>{data.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt_cstm">
            <div className="col-lg-12">
              <div className="count_box p-0">
                <div className="dashboard_head mb-0">
                  <h5 className="mb-0">Recent Payments</h5>
                </div>
                <div className="table-responsive">
                  <table
                    id=""
                    className="table simple_tbl nowrap mb-0"
                    style={{ overflowX: "auto" }}
                  >
                    <thead className="gry">
                      <tr className="">
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usertableData.map((data, i) => (
                        <tr key={i}>
                          <td>{data.num}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.date}</td>
                          <td>{data.amt}</td>
                          <td className={`${data.addcls}`}>{data.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  );
};
