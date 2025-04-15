import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Pagination from "../components/Pagination";
import { IoEye, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBot,botStatusUpdate } from "../redux/botSlice";
import { format } from "date-fns";

export const BotsManagement = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;
  const dispatch = useDispatch();
  const { count, allbots, isLoading, error, message } = useSelector(
    (state) => state.bots
  );

  useEffect(() => {
    dispatch(fetchAllBot({ page: currentSearchPage, limit, searchQuery }));
  }, [dispatch, currentSearchPage, searchQuery]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentSearchPage(1);
  };

  return (
    <>
      {isLoading ? (
        " Loading ..."
      ) : (
        <DashboardLayout>
          <section className="table_section">
            <div className="row">
              <div className="col-lg-12">
                <div className="count_box p-0">
                  <div className="row align-items-center justify-content-between table_head">
                    <div className="col-xxl-2 col-sm-6">
                      <h5>Bots Management</h5>
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
                  <div className="table-responsive">
                    {allbots?.length < 1 ? (
                      <p className="text-white text-center">
                        No data Available
                      </p>
                    ) : (
                      <table
                        id=""
                        className="table simple_tbl nowrap mb-0"
                        style={{ overflowX: "auto" }}
                      >
                        <thead className="gry">
                          <tr className="">
                            <th>Sr. No.</th>
                            <th>Username</th>
                            <th>Exchange</th>
                            <th>Coin</th>
                            <th>Volume</th>
                            <th>TOLERANCE</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allbots?.map((data, i) => (
                            <tr key={i}>
                              <td>{(currentSearchPage - 1) * limit + i + 1}</td>
                              <td>{data?.user?.username}</td>
                              <td>{data?.exchange_name}</td>
                              <td>{data?.trading_pair_symbol}</td>
                              <td>{data?.trade_volume}</td>
                              <td>{data?.risk_tolerance}</td>
                              <td>
                                {format(
                                  new Date(data?.created_at),
                                  "yyyy-MM-dd HH:mm:ss"
                                )}
                              </td>
                              <td className="items_list">
                                <select
                                  className="form-select green"
                                  value={data?.status === 'started' ? 'start' : 'stop'}
                                  onChange={(e) => {
                                    const newStatus = e.target.value.toLowerCase(); // "started" or "stopped"
                                    dispatch(botStatusUpdate({ id: data?.id, status: newStatus }));
                                  }}
                                  defaultValue={
                                    data?.is_active ? "start" : "stop"
                                  }
                                >
                                  <option value="start" className="green">
                                    Start
                                  </option>
                                  <option value="stop" className="red">
                                    Stop
                                  </option>
                                </select>
                              </td>
                              <td>
                                <div className="d-flex align-items-center action_btn">
                                  <Link to="#" className="bg_grn">
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
