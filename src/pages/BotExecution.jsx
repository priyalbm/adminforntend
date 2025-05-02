import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../redux/logSlice"; // Adjust path if needed
import DashboardLayout from "../layouts/DashboardLayout";
import Pagination from "../components/Pagination";
import { IoSearch } from "react-icons/io5";

export const BotExecution = () => {
  const dispatch = useDispatch();
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const {alllogs} = useSelector((state) => state.logs);
  const totalCount = useSelector((state) => state.logs.count);
  const loading = useSelector((state) => state.logs.loading);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchLogs({ log_type: "bot_operation", page: currentSearchPage, page_size: pageSize }));
  }, [dispatch, currentSearchPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <DashboardLayout>
      <section className="table_section">
        <div className="row">
          <div className="col-lg-12">
            <div className="count_box p-0">
              <div className="row align-items-center justify-content-between table_head">
                <div className="col-xxl-4 col-sm-7">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">Logs & Reporting</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Bot Activity Reports
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="col-xl-3 col-sm-5">
                  <div className="d-flex gap-2 align-items-center input_box position-relative">
                    <IoSearch />
                    <input
                      className="p-0"
                      type="search"
                      placeholder="Search Users by Name/Email ID"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table simple_tbl nowrap mb-0">
                  <thead className="gry">
                    <tr>
                      <th>Sr. No.</th>
                      <th>Exchange</th>
                      <th>Pair</th>
                      <th>User</th>
                      <th>Level</th>
                      <th>Message</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4">Loading...</td>
                      </tr>
                    ) : alllogs?.length > 0 ? (
                      alllogs?.map((log, index) => (
                        <tr key={log.id}>
                          <td>{(currentSearchPage - 1) * pageSize + index + 1}</td>
                          <td>{log.exchange_name}</td>
                          <td>{log.pair}</td>
                          <td>{log.username}</td>
                          <td>{log.level}</td>
                          <td>{log.message}</td>
                          <td>{new Date(log.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No bot activity found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="text-end mt-3">
                  <div className="pagination_count p-xl-3 p-2">
                    <Pagination
                      currentPage={currentSearchPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentSearchPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};
