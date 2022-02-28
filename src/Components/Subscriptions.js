import React, { useState, useEffect } from "react";
import AddSubscription from "./SubscriptionManagment/AddSubscription";
import AllSubscriptions from "./SubscriptionManagment/AllSubscriptions";
import { useSelector } from "react-redux";
import EditSubscription from "./SubscriptionManagment/EditSubscription";
import SingleSubView from "./SubscriptionManagment/SingleSubView";
import Navbar from "./Navbar";

function Subscriptions(props) {
  const userData = useSelector((state) => state.currentUser);
  const [isAddSub, setIsAddSub] = useState(false);
  const [isAllSubs, setIsAllSubs] = useState(false);
  const [isEditSub, setIsEditSub] = useState(false);
  const [currentEditSub, setCurrentEditSub] = useState({});
  const [isSingleSub, setIsSingleSub] = useState(false);

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      setIsSingleSub(true);
    } else {
    }
  }, []);

  const showAddSub = () => {
    if (isAddSub) {
      setIsAddSub(false);
    } else {
      setIsAddSub(true);
      setIsAllSubs(false);
      setIsSingleSub(false);
    }
  };

  const showAllSubs = () => {
    if (isAllSubs) {
      setIsAllSubs(false);
    } else {
      setIsAllSubs(true);
      setIsAddSub(false);
      setIsSingleSub(false);
    }
  };
  const showEditSub = (subObj) => {
    if (isEditSub) {
      setIsEditSub(false);
      setIsAllSubs(true);
    } else {
      setCurrentEditSub(subObj);
      setIsEditSub(true);
      setIsAllSubs(false);
      setIsAddSub(false);
    }
  };

  return (
    <div>
      <Navbar props={props} subColor="#389cff" />
      <h1 className="webHead">Subscriptions </h1>
      <br />
      <div className="comp">
        {userData.permissions.permissions.includes("viewSubscriptions") ? (
          <button
            className="inCompButton"
            onClick={showAllSubs}
            style={{ backgroundColor: isAllSubs ? "#389cff" : null }}
          >
            All Members
          </button>
        ) : null}{" "}
        {userData.permissions.permissions.includes("createSubscriptions") ? (
          <button
            className="inCompButton"
            onClick={showAddSub}
            style={{ backgroundColor: isAddSub ? "#389cff" : null }}
          >
            Add Member
          </button>
        ) : null}
        {isAddSub ? <AddSubscription showAddSub={showAddSub} /> : null}
        {isAllSubs ? (
          <AllSubscriptions
            showAllSubs={showAllSubs}
            showEditSub={showEditSub}
          />
        ) : null}
        {isEditSub ? (
          <EditSubscription
            currentEditSub={currentEditSub}
            showEditSub={showEditSub}
          />
        ) : null}
        {isSingleSub ? <SingleSubView subId={props.match.params.id} /> : null}
      </div>
    </div>
  );
}

export default Subscriptions;
