import { useState } from "react";

export const UpsertApplications = () => {

  const [loading, setLoading] =         useState(false);
  const [message, setMessage] =         useState("");

  const [appID, setappID] =             useState("");
  const [appName, setappName] =         useState("");
  const [appCompany, setappCompany] =   useState("");
  const [appDetails, setappDetails] =   useState("");
  const [appImage, setappImage] =       useState("");
  const [appStatus, setappStatus] =     useState("");

  const validate = (e) => {
    e.preventDefault()
    setLoading(true)

      if(appName == "" || appCompany == "" || appDetails == "" || appImage == ""){
            setMessage("Details incomplete!")
      } else {
        proceedUpsert()
      }
      
  }

  const proceedUpsert = async () => {
    setMessage("Details submitting")
  }



    return (
      <div className="ui segment">
        <h1>Insert / Update Applications</h1>

        <div className="ui form">

          <div className="field">
            <label>ID</label>
            <input type="text" value={appID} onChange={(e) => setappID(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <label>Name</label>
            <input type="text" value={appName} onChange={(e) => setappName(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <label>Company</label>
            <input type="text" value={appCompany} onChange={(e) => setappCompany(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <label>Details</label>
            <input type="text" value={appDetails} onChange={(e) => setappDetails(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <label>Image</label>
            <input type="text" value={appImage} onChange={(e) => setappImage(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <label>Status</label>
            <input type="text" value={appStatus} onChange={(e) => setappStatus(e.currentTarget.value)}/>
          </div>

          <div className="field">
            <div className="ui button purple" onClick={validate}>Submit App</div>
            <p>{message}</p>
          </div>

        </div>
      </div>
    );
  };
  