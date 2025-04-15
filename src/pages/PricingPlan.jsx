import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllPlans } from "../redux/planSlice";
export const PricingPlan = () => {
  const dispatch = useDispatch()
  const {allplans,isLoading,error,message} = useSelector((state)=>state.plans)

  useEffect(()=>{
    dispatch(fetchAllPlans())
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
                  <h5 className="mb-0">Pricing & Plans</h5>
                  <Link to="/add-plan" className="cmn_btn">
                    Add Plan
                  </Link>
                </div>
                {allplans?.length < 1 ? (<p className="text-white text-center">No data Available</p>) : (

                <div className="row mt_cstm plan_btm">
                  {allplans?.map((data, i) => (
                    <div className="col-xxl-3 col-xl-4 col-sm-6" key={i}>
                      <div className="count_box plan_box bg-black p-0">
                        <div className="text-center plan_top">
                          <h5>{data.name}</h5>
                          <p>{data.description}</p>
                          <h3>
                            ${data.price} <sub>{data.duration}Months</sub>
                          </h3>
                        </div>
                        <div className="plan_down">
                          <h6>{data.txt}</h6>
                          <ul className="ps-3 m-0">
                            {data?.features?.map((items, j) => (
                              <li key={j}>{items}</li>
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
