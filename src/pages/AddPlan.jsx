import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, createplan } from "../redux/planSlice";
import DashboardLayout from "../layouts/DashboardLayout";
import Chips from "../components/Chips";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddPlan = () => {
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planDuration, setPlanDuration] = useState("quarterly");
  const [isPromoChecked, setIsPromoChecked] = useState(false);
  const [features, setFeatures] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.plans);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      name: planName,
      description: planDescription,
      price: planPrice,
      duration: planDuration,
      // isPromoChecked,
      features,
    };
    dispatch(createplan(values));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (message) {
      console.log(message);
      toast.success(message);
      dispatch(clearMessage())
    }
    if (error) {
      toast.error(error);
      dispatch(clearError())
    }
  }, [error, message,clearMessage,clearError]);

  return (
    <DashboardLayout>
      <section className="plan">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-12">
            <div className="count_box">
              <div className="dashboard_head">
                <h5 className="mb-0">Pricing & Plans</h5>
              </div>
              <div className="row">
                <div className="col-xl-4 col-sm-6">
                  <div className="input_spc">
                    <label htmlFor="" className="mb-2 text-white">
                      Plan Name*
                    </label>
                    <input
                      type="text"
                      className="input_box w-100"
                      placeholder="Enter Plan name"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                    />
                  </div>
                  <div className="input_spc">
                    <label htmlFor="" className="mb-2 text-white">
                      Plan Description*
                    </label>
                    <textarea
                      className="w-100"
                      rows="4"
                      placeholder="Enter Plan Description"
                      value={planDescription}
                      onChange={(e) => setPlanDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="input_spc">
                    <label htmlFor="" className="mb-2 text-white">
                      Plan Price*
                    </label>
                    <input
                      type="text"
                      className="input_box w-100"
                      placeholder="$2,511"
                      value={planPrice}
                      onChange={(e) => setPlanPrice(e.target.value)}
                    />
                  </div>
                  <div className="input_spc">
                    <label htmlFor="" className="mb-2 text-white">
                      Plan Duration*
                    </label>
                    <select
                      className="form-select"
                      value={planDuration}
                      onChange={(e) => setPlanDuration(e.target.value)}
                    >
                      <option value={1}>Monthly</option>
                      <option value={3}>Quarterly</option>
                      <option value={12}>Yearly</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-3 mb-sm-0">
                    <input
                      type="checkbox"
                      id="code"
                      checked={isPromoChecked}
                      onChange={(e) => setIsPromoChecked(e.target.checked)}
                    />
                    <label htmlFor="code">
                      Promotional discounts and coupon codes
                    </label>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <Chips features={features} setFeatures={setFeatures} />
                </div>
                <div className="add_btn">
                  <button className="cmn_btn" onClick={handleSubmit}>
                    {isLoading ? "Saving ..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};
