
export const UpsertApplication = () => {



    return (
      <div className="ui segment">
        <h1>Insert / Update Applications</h1>

        <div className="ui form">

          <div className="field">
            <label>ID</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Name</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Company</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Details</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Image</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Status</label>
            <input type="text" />
          </div>

          <div className="field">
            <div className="ui button purple">Submit Application</div>
          </div>

        </div>
      </div>
    );
  };
  