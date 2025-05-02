import React, { useState,useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import Barchart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import PieChart from "../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { MdDateRange, MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {dashboardData} from "../redux/dashboardSlice"


const Dashboard = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const {isAuthenticated }= useSelector((state)=>state.auth)
  const {data,isLoading }= useSelector((state)=>state.dashboard)


  useEffect(()=>{
    if (!isAuthenticated) {
      navigate("/");
    }
    else{
      dispatch(dashboardData())
    }
  },[isAuthenticated,dispatch])
  console.log(data);
  
  const dashboardData2 = [
    {
      img: "dash1",
      txt: "Total Registered Users",
      para: data?.user_statistics?.total_users,
    },
    {
      img: "dash1",
      txt: "Active users",
      para: data?.user_statistics?.active_users,
    },
    {
      img: "dash2",
      txt: "New Signups",
      para:  data?.user_statistics?.new_users_last_30_days,
      addcls: "mt_cstm",
    },
    {
      img: "dash3",
      txt: "Current Subscription",
      para: data?.subscription_statistics?.current_active_subscriptions,
      addcls: "mt_cstm",
    },
  ];
  
  return (
    <>
      <DashboardLayout>
        <section className="home">
          <h2>Good Morning ,Alex</h2>
          <div className="row mt_cstm">
            <div className="col-xxl-3 col-xl-4 col-md-6 ">
              <div className="count_box first_box">
                <h6 className="mb-0">Most Used Trading Pair</h6>
                <div className="d-flex align-items-center box_data">
                  <img
                    src="/images/etherium.png"
                    className="img-fluid"
                    alt=""
                  />
                  <div>
                    <span>{data?.bot_statistics?.top_pairs?.[0]?.pair_symbol}</span>
                    {/* <p className="mb-0">$ 100</p> */}
                  </div>
                </div>
              </div>

              <div className="count_box down_box mt_cstm">
                <div className="d-flex align-items-start justify-content-between">
                  <div>
                    <h3>Revenue</h3>
                    <h4>$ {data?.financial_statistics?.total_revenue}</h4>
                  </div>
                  {/* <div>
                    <select className="form-select">
                      <option value="week">Weekly</option>
                      <option value="month">Monthly</option>
                      <option value="annual">Annually</option>
                    </select>
                  </div> */}
                </div>
                <div className="chart_data">
                  <Barchart barData={data?.financial_statistics?.daily_revenue_last_7_days}/>
                </div>
              </div>

              <div className="count_box down_box mt_cstm">
                <h3 className="mb-0">Bot Statistics</h3>

                <div className="chart_data">
                  <DonutChart active={data?.bot_statistics?.active_bots} inactive={data?.bot_statistics?.inactive_bots}/>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="row">
                {dashboardData2.map((data, i) => (
                  <div className="col-sm-6" key={i}>
                    <div className={`count_box center_box ${data.addcls}`}>
                      <div className="box_img">
                        <img
                          src={`/images/${data.img}.png`}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <p>{data.txt}</p>
                      <h6 className="mb-0">{data.para}</h6>
                    </div>
                  </div>
                ))}
              </div>
              <div className="count_box center_down mt_cstm p-0">
                <h3 className="mb-0">Recent Activity</h3>
                <ul className="p-0 m-0">
                  {data?.recent_activities?.map((item, i) => (
                    <li key={i} className="d-flex align-items-center">
                      <img
                        src={`/images/activity_user.png`}
                        className="img-fluid"
                        alt=""
                      />
                      <div>
                        <p>{item.message}</p>
                        <div className="d-flex align-items-center activity_box">
                          <div className="activity_log">
                            <MdDateRange />
                            <span>{(item.created_at)?.slice(0,10)}</span>
                          </div>
                          <div className="activity_log">
                            <MdOutlineAccessTime />
                            <span>{(item.created_at)?.slice(11,19)}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xxl-5 col-xl-4">  
              <div className="count_box down_box ">
                <div className="d-flex align-items-start justify-content-between">
                  <h3 className="mb-0">Top Exchanges</h3>
                  <div>
                    <select className="form-select">
                      <option value="week">Weekly</option>
                      <option value="month">Monthly</option>
                      <option value="annual">Annually</option>
                    </select>
                  </div>
                </div>
                <div className="chart_data mt-0">
                  <PieChart botdata={data?.bot_statistics?.top_exchanges}/>
                </div>
              </div>

              <div className="count_box down_box mt_cstm bg-black ">
                <div className="row align-items-center justify-content-center">
                  <div className="col-sm-5">
                    <div className="google_links">
                      <h3 className="">Download and Start Trading Now</h3>
                      <div className="add_links">
                        <Link to="#">
                          <img
                            src="/images/google1.png"
                            className="img-fluid"
                            alt=""
                          />
                        </Link>
                        <Link to="#" className="">
                          <img
                            src="/images/google2.png"
                            className="img-fluid mt-2"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="google_img">
                      <img
                        src="/images/google_bg.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt_cstm">
            <div className="col-lg-12">
              <div className="count_box pb-4 p-0">
                <div className="d-flex align-items justify-content-between dashboard_head m-0">
                  <h5>Recent Transactions</h5>
                  <Link to="/sub-payment" className="text-decoration-underline">
                    View All
                  </Link>
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
                        <th>Plan Name</th>
                        <th>Email Address</th>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.financial_statistics?.recent_transactions?.map((item, i) => (
                        <tr key={i}>
                          <td>{item.id}</td>
                          <td>{item.subscription__plan__name}</td>
                          <td>{item.subscription__user__email}</td>
                          <td>{item.transaction_date}</td>
                          <td>{item.amount}</td>
                          <td className={`${data.addcls}`}>{item.status}</td>
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

export default Dashboard;
