import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Pagination from "../components/Pagination";
import { IoEye, IoSearch } from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubscription } from "../redux/subscriptionSlice";
import { format } from "date-fns";

export const SubPayment = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [transactionDetail, setTransactionDetail] = useState(null);
  const limit = 10; 
  const dispatch = useDispatch();
  const {count, allsubscriptions, isLoading, error, message } = useSelector(
    (state) => state.subscriptions
  );

  useEffect(() => {
    dispatch(fetchAllSubscription({ page: currentSearchPage, limit, searchQuery }));
  }, [dispatch, currentSearchPage, searchQuery]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  let completeSum = 0;
  let monthlySum = 0;

  allsubscriptions?.forEach((subscription) => {
    if (subscription?.transactions && subscription.transactions.length > 0) {
      const { status, amount, transaction_date } = subscription.transactions[0];
      if (status && amount && transaction_date) {
        const transactionDate = new Date(transaction_date);
        
        if (
          transactionDate.getFullYear() === currentYear &&
          transactionDate.getMonth() === currentMonth &&
          status === "COMPLETE"
        ) {
          monthlySum += Number(amount);
        }
        
        if (status === "COMPLETE") {
          completeSum += Number(amount);
        }
      }
    }
  });


  const subData = [
    {
      img: "dash1",
      txt: "Total Revenue",
      head: `$ ${completeSum}`,
    },
    {
      img: "dash1",
      txt: "Monthly Earnings",
      head: `$ ${monthlySum}`,
    },
  ];
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentSearchPage(1); 
  };

  return (
    <>
    {isLoading ? " Loading ..." : (
      <DashboardLayout>
        <section className="table_section">
          <div className="count_box sub_box bg-black">
            <div className="row align-items-center justify-content-between table_head p-0 mb-0">
              <div className="col-xxl-3 col-sm-6">
                <h5>Subscription & Payments</h5>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="d-flex gap-2 align-items-center input_box position-relative">
                  <IoSearch />
                  <input
                    className="p-0"
                    type="search"
                    placeholder="Search Users by Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt_cstm">
            <div className="col-lg-12">
              <div className="count_box p-0">
                <div className="row pay_line">
                  {subData?.map((data, i) => (
                    <div
                      className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6"
                      key={i}
                    >
                      <div className="count_box pay_box position-relative ">
                        <div className="box_img">
                          <img
                            src={`/images/${data?.img}.png`}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <p>{data?.txt}</p>
                        <h6>{data?.head}</h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="table-responsive mt_cstm">
                {allsubscriptions?.length < 1 ? (<p className="text-white text-center">No data Available</p>) : (

                  <table
                    id=""
                    className="table simple_tbl nowrap mb-0"
                    style={{ overflowX: "auto" }}
                  >
                    <thead className="gry">
                      <tr className="">
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Payment Status</th>
                        {/* <th>Action</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allsubscriptions?.map((data, i) => (
                        <tr key={i}>
                          <td>{(currentSearchPage - 1) * limit + i + 1}</td>
                          <td>{data?.user?.username}</td>
                          <td>{data?.plan?.price}</td>
                          <td>
                            {format(
                              new Date(data?.start_date),
                              "yyyy-MM-dd HH:mm:ss"
                            )}
                          </td>
                          <td>
                            {format(
                              new Date(data?.end_date),
                              "yyyy-MM-dd HH:mm:ss"
                            )}
                          </td>
                          <td className={`${data?.addcls}`}>{data?.status}</td>
                          {/* <td className="items_list">
                            <select className="form-select green">
                              <option value="pause" className="green">
                                Pause
                              </option>
                              <option value="stop" className="red">
                                Stop
                              </option>
                              <option value="restart" className="blu">
                                Restart
                              </option>
                            </select>
                          </td> */}
                          <td>
                            <div className="d-flex align-items-center action_btn">
                              <Link to="#" onClick={()=>setTransactionDetail(data?.transactions?.[0])} className="bg_grn">
                                <IoEye />
                              </Link>
                              <Link to="#" className="bg_blu">
                                <BiSolidEditAlt />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}
                  <div className="text-end mt-3">
                    <div className="pagination_count p-xl-3 p-2">
                      <Pagination
                        currentPage={currentSearchPage}
                        totalPages={Math.ceil(count / limit)}
                        onPageChange={(currentSearchPage) =>
                          setCurrentSearchPage(currentSearchPage)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
      )}
    </>
  );
};
