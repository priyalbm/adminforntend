import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Pagination from "../components/Pagination";
import { IoEye, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../redux/usersSlice";
import { format } from "date-fns";

export const UserManagement = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState(1); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const dispatch = useDispatch();
  
  const { allusers, isLoading, count } = useSelector((state) => state.users);
  
  const limit = 10; 
  

  useEffect(() => {
    dispatch(fetchAllUsers({ page: currentSearchPage, limit, searchQuery }));
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
                  <div className="col-xxl-2 col-sm-6">
                    <h5>User Management</h5>
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
                  {allusers?.length < 1 ? (<p className="text-white text-center">No data Available</p>) : (
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
                        <th>Registration Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allusers?.map((data, i) => (
                        <tr key={i}>
                          <td>{(currentSearchPage - 1) * limit + i + 1}</td> {/* Adjust the row number based on pagination */}
                          <td>
                            <Link to="/user-detail" className="blu">
                              {data?.username}
                            </Link>
                          </td>
                          <td>{data?.email}</td>
                          <td>{format(new Date(data?.date_joined), 'yyyy-MM-dd HH:mm:ss')}</td>
                          <td className="items_list">
                            <select className="form-select green" defaultValue={data?.is_active ? 'active' : 'deactivated'}>
                              <option value="active" className="green">
                                Activate
                              </option>
                              <option value="deactivated" className="red">
                                Deactivate
                              </option>
                            </select>
                          </td>
                          <td>
                            <div className="d-flex align-items-center action_btn">
                              <Link to={`/user-detail/${data?.id}`} className="bg_grn">
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
                        totalPages={Math.ceil(count / limit)} // Calculate total pages based on count and limit
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
      </DashboardLayout>)}
    </>
  );
};
