import { useState } from 'react';
import { Images } from '../raw/images'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'

export const FetchImages = ({ selectImage }) => {

  const [clicked, setClicked] = useState(0)
  const data = Images().data
  const load = Images().load

  const editImage = (id,name,type,path,status) => {
    setClicked(clicked+1)
    const array = {
                    "clicked":clicked,
                    "id": id, 
                    "name": name, 
                    "type": type, 
                    "path": path, 
                    "status": status,
                  }
      setTimeout(
        window.scrollTo({ top: 0, behavior: 'smooth' })
      , 300)
  };

  return (
<>

{load ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : ( 
        <div className="ui segment ">
        <h3>Images List</h3>

   

        <div className="ui grid">

        </div>
          {data.map((i, index) => (
            <tr key={index}>
              <td>{i.id}</td>
              <td>
                <h4 className="ui image header">
                    <img src={i.pathFull} className="ui mini rounded image" />
                    <img src={`data:image/svg+xml;base64,${btoa(i.svg)}`}/>

                    <div className="content">
                        {i.name}
                        <div className="sub header">
                            {i.type}
                        </div>
                    </div>
                </h4>
              </td>
              <td>
                <button className='ui button blue' onClick={()=> editImage(i.id,i.name,i.type)}>
                    <i className="edit outline icon"></i>
                    Edit
                </button>
              </td>
            </tr>
          ))}

    </div>
      )}

</>

  );
}
