import React, { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { MdDateRange, MdOutlineAccessTime } from "react-icons/md";
import { fetchSingleUsers } from "../redux/usersSlice";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Using useParams to get the id
import { fetchAllSubscription } from "../redux/subscriptionSlice";

export const UserDetail = () => {
  const { id } = useParams();
  const dispatch =useDispatch()
  const {singleuser,isLoading}=useSelector((state)=>state.users)
  const { allsubscriptions } = useSelector((state) => state.subscriptions);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUsers(id)); 
    dispatch(fetchAllSubscription({ page: 1, limit:5,searchQuery:'',user_id:Number(id) }));
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
                      {(allsubscriptions)?.slice(0,5)?.map((data, i) => (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{data.start_date}</td>
                          <td>{data.end_date}</td>
                          <td>{data.plan.name}</td>
                          <td>{data.plan.price}</td>
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
                        <th>ID</th>
                        <th>Currency</th>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allsubscriptions?.map((data, i) => (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{data.transactions?.[0]?.razorpay_payment_id}</td>
                          <td>{data.transactions?.[0]?.currency}</td>
                          <td>{data.transactions?.[0]?.transaction_date}</td>
                          <td>{data.transactions?.[0]?.amount}</td>
                          <td className={`${data.addcls}`}>{data.transactions?.[0]?.status}</td>
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
