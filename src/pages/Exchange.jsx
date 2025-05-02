import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllExchange } from "../redux/botSlice";
export const Exchanges = () => {
  const dispatch = useDispatch()
  const {allexchange,isLoading,error,message} = useSelector((state)=>state.bots)

  useEffect(()=>{
    dispatch(fetchAllExchange())
  },[dispatch])

 
  return (
    <>
    {isLoading ? " Loading ..." : (
    
      <DashboardLayout>
        <section className="plan">
          <div className="row">
            <div className="col-lg-12">
              <div className="count_box bg-black">
                <div className="dashboard_head d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Exchanges </h5>
                  <Link to="/add-exchange" className="cmn_btn">
                    Add Exchange
                  </Link>
                </div>
                {allexchange?.length < 1 ? (<p className="text-white text-center">No data Available</p>) : (

                <div className="row mt_cstm plan_btm ">
                  {allexchange?.map((data, i) => (
                    <div className="col-xxl-3 col-xl-4 col-sm-6" key={i}>
                      <div className="count_box plan_box bg-black p-0">
                        <div className="text-center plan_top">
                          <h5>{data.name}</h5>
                          <p>{data.description}</p>
                          <p>
                            {data.api_endpoint} 
                                                      </p>
                        </div>
                        <div className="plan_down">
                          <h6>{data.txt}</h6>
                          <ul className="ps-3 m-0">
                            {data?.plans?.map((items, j) => (
                              <li key={j}>{items.name}</li>
                            ))}
                          </ul>
                          <div className="plan_btn text-center">
                            <button className="cmn_btn bg-white text-black">
                              Choose
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>)}
    </>
  );
};
