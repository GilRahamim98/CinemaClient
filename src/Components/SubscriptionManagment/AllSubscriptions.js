import React, { useEffect, useState } from "react";
import Axios from "axios";
import SubscriptionChild from "./SubscriptionChild";

const membersUrl = "http://localhost:5000/api/subMemberRouter";

function AllSubscriptions({ showAllSubs, showEditSub }) {
  const [members, setMembers] = useState([]);

  


  useEffect(() => {
    async function getMembers() {
      const { data } = await Axios.get(membersUrl);
      setMembers(data);
    }
    getMembers();
  }, []);

  useEffect(() => {
    async function refreshMembers() {
      const { data } = await Axios.get(membersUrl);
      setMembers(data);
    }
    refreshMembers();
  }, [members]);

  const membersRep = members.map((member) => {
    return (
      <SubscriptionChild
        key={member._id}
        member={member}
        showAllSubs={showAllSubs}
        showEditSub={showEditSub}
      />
    );
  });

  return (
    <div>
      <h1>All Subscriptions </h1>
      <div className="allSubs">
      {membersRep}
      </div>
    </div>
  );
}

export default AllSubscriptions;
