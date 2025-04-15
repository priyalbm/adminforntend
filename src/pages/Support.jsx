import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Pagination from "../components/Pagination";
import { IoEye, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTicket } from "../redux/supportSlice";
import { format } from "date-fns";

export const Support = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const dispatch = useDispatch();
  
  const { alltickets, isLoading, count } = useSelector((state) => state.support);
  
  const limit = 10; 
  

  useEffect(() => {
    dispatch(fetchAllTicket({ page: currentSearchPage, limit, searchQuery }));
  }, [dispatch, currentSearchPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentSearchPage(1); 
  };

  return (
    <>
    {isLoading ? " Loading ..." : (

      <DashboardLayout>
        <section className="table_section">
          <div className="row">
            <div className="col-lg-12">
              <div className="count_box p-0">
                <div className="row align-items-center justify-content-between table_head">
                  <div className="col-xl-2 col-sm-6">
                    <h5>Support</h5>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div className="d-flex gap-2 align-items-center input_box position-relative">
                      <IoSearch />
                      <input
                        className="p-0"
                        type="search"
                        placeholder="Search Users by Name/Email ID"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                {alltickets?.length < 1 ? (<p className="text-white text-center">No data Available</p>) : (

                  <table
                    id=""
                    className="table simple_tbl nowrap mb-0"
                    style={{ overflowX: "auto" }}
                  >
                    <thead className="gry">
                      <tr className="">
                        <th>Sr. No.</th>
                        <th>user</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alltickets?.map((data, i) => (
                        <tr key={i}>
                          <td>{(currentSearchPage - 1) * limit + i + 1}</td>
                          <td>{data.created_by_name}</td>
                          <td>{data.title}</td>
                          <td>{data.description}</td>
                          <td>{data.status}</td>
                          <td>{data.priority}</td>
                          <td>{format(new Date(data?.created_at), 'yyyy-MM-dd HH:mm:ss')}</td>
                          <td>
                            <div className="d-flex align-items-center action_btn">
                              <Link to={`/support-chat/${data.id}`} className="bg_grn">
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
                  </table>)}
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
