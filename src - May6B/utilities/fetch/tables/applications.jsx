import { useState, useEffect } from 'react';
import { Applications } from '../raw/applications'
import * as Set from '../../constants'

export const FetchApplications = ({selectData}) => {

  const [clicked, setClicked] = useState(1)
  const data = Applications().data
  const load = Applications().load

  function setStatus(i) {
    if (i.statusLabel == "Active") {
      return  <button className='ui button green basic'>
                  <i className="check circle outline icon"></i>
                  Active
              </button>;
    } else if (i.statusLabel == "Pending") {
      return  <button className='ui button yellow basic'>
                  <i className="spinner icon"></i>
                  Pending
              </button>;
    } else {
      return  <button className='ui button red basic'>
                  <i className="times circle outline icon"></i>
                  Inactive
              </button>;
    }
  }

  const editData = (id,name,image,company,details,count,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "name": name, 
                    "image": image, 
                    "company": company, 
                    "details": details, 
                    "count": count,
                    "status": status
                  }
      setClicked(clicked+1)
      selectData(array);
      setTimeout(
        window.scrollTo({ top: 0, behavior: 'smooth' })
      , 1000)
    
  };



  return (
<>



{load ? (
        <Set.LoadingData />
      ) : (
      <div className="ui segment basic">
        <h3 class="ui horizontal divider header">
          Applications List
        </h3>
        <br />
        <table className='ui celled striped small table compact'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Application</th>
            <th>Company</th>
            <th>Details</th>
            <th>Users</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h5 className="ui image header">
                    <img src={i.imageFull} className="ui mini rounded image" />
                    <div className="content">
                      {i.name}
                  </div>
                </h5>
              </td>
              <td>{i.company}</td>
              <td>{i.details}</td>
              <td>{i.accountCount == 0 || i.accountCount == 1 ? i.accountCount+" User" :  i.accountCount+" Users"}</td>
              <td>{setStatus(i)}</td>
              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.name,i.imageID,i.companyID,i.details,i.accountCount,i.status)}>
                    <i className="pencil icon"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}

</>

  );
}
