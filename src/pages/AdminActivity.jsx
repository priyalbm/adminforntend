import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Pagination from "../components/Pagination";
import { IoSearch } from "react-icons/io5";

export const AdminActivity = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState(1);

  const tableData = [
    {
      num: "1",
      name: "Demoname",
      time: "12:48 PM",
      start: "01:00 PM",
      end: "01:20 PM",
      sub: "Basic",
    },
    {
      num: "2",
      name: "Demoname",
      time: "12:48 PM",
      start: "01:00 PM",
      end: "01:20 PM",
      sub: "Standard",
    },
    {
      num: "3",
      name: "Demoname",
      time: "12:48 PM",
      start: "01:00 PM",
      end: "01:20 PM",
      sub: "Pro",
    },
    {
      num: "4",
      name: "Demoname",
      time: "12:48 PM",
      start: "01:00 PM",
      end: "01:20 PM",
      sub: "Basic",
    },
    {
      num: "5",
      name: "Demoname",
      time: "12:48 PM",
      start: "01:00 PM",
      end: "01:20 PM",
      sub: "Standard",
    },
  ];

  return (
    <>
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
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Admin Activity Logs
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
                      />
                    </div>
                  </div>
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
                        <th>Login Time</th>
                        <th>Bot Start</th>
                        <th>Bot End</th>
                        <th>Subscription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, i) => (
                        <tr key={i}>
                          <td>{data.num}</td>
                          <td>{data.name}</td>
                          <td>{data.time}</td>
                          <td>{data.start}</td>
                          <td>{data.end}</td>
                          <td>{data.sub}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end mt-3">
                    <div className="pagination_count p-xl-3 p-2">
                      <Pagination
                        currentPage={currentSearchPage}
                        totalPages={7}
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
    </>
  );
};
