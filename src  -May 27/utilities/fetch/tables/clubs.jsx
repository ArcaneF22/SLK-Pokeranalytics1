import { useState } from 'react';
import { Clubs } from '../raw/clubs'
import * as Set from '../../constants'
import * as Func from '../../functions'

export const FetchClubs = ({ selectData }) => {

  const [clicked, setClicked] = useState(1)
  const data = Clubs().data
  const load = Clubs().load

  const editData = (id,idd,name,image,app,details,type,union,percent,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":    clicked,
                    "proceed":    "true",
                    "id":         id, 
                    "idd":        idd, 
                    "name":       name, 
                    "image":      image, 
                    "app":        app, 
                    "details":    details, 
                    "type":       type,
                    "union":      union,
                    "percent":    percent,
                    "status":     status,
                  }
      setClicked(clicked+1)
      selectData(array);
      window.scrollTo({ top: 0, behavior: 'smooth' })

  };

  return (
<>

{load ? (
          <Set.LoadingData />
      ) : ( 
        <div className="ui segment basic">
        <h3 className="ui horizontal divider header">
          Clubs List
        </h3>
        <br />
        <table className='ui celled striped table fluid small compact'>
        <thead>
          <tr>
            <th>CLUB</th>
            <th>APPLICATION</th>
            <th>DETAILS</th>
            <th>TYPE</th>
            <th>ACCOUNTS</th>
            <th>STATUS</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr key={index}>
              <td>
                <h5 className="ui image header">
                    <img src={i.imageFull ? i.imageFull : "./images/club.png"} className="ui mini rounded image" />
                    <div className="content">
                      {i.name}
                      <div className="sub header">
                        ID: {i.idd}
                      </div>
                  </div>
                </h5>
              </td>
              <td>{i.appName}</td>
              <td className='ui relaxed divided list'>
                {i.details ? 
                  <div className='item'>
                      <div className="content">
                        <div className="header">
                          Details:
                        </div>
                        <div className="description">{i.details}</div>
                      </div>
                  </div>
                : null}
                {i.percent ? 
                  <div className='item'>
                        <div className="description">
                          Cut: {i.percent}%
                        </div>
                  </div>
                : null}
              </td>
              <td className='ui relaxed divided list'>
                  <div className='item'>
                      <div className="content">
                        <div className="header">
                          {i.type}
                        </div>
                        {i.unionName ? <div className="description">{i.unionName}</div> : null}
                      </div>
                  </div>
              </td>
              <td className="ui list">
                {Func.toListState(i.usersActive,"active")}
                {Func.toListState(i.usersPending,"active")}
                {i.usersPending == 0 && i.usersActive == 0 ? "None" : null}
              </td>
              <td>{Func.toStatus(i.statusLabel)}</td>
              <td>
                <button className='ui icon button violet' onClick={()=> editData(i.id,i.idd,i.name,i.imageID,i.appID,i.details,i.type,i.unionID,i.percent,i.statusLabel)}>
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