import { useState } from 'react';
import {ImagesApps, ImagesClubs, ImagesAvatars, ImagesLogo} from '../raw/images'
import * as SUI from 'semantic-ui-react'

export const FetchImages = ({ selectImage }) => {

  const [clicked, setClicked] = useState(0)
  const dataApps = ImagesApps().data
  const loadApps = ImagesApps().load

  const dataClubs = ImagesClubs().data
  const loadClubs = ImagesClubs().load

  const dataAvat = ImagesAvatars().data
  const loadAvat = ImagesAvatars().load

  const dataLogo = ImagesLogo().data
  const loadLogo = ImagesLogo().load



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

{loadApps ? (
      <div className="ui segment basic">
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Loading table...</div>
        </div>
      </div>
      ) : ( 
        <div className="ui segment basic">

          <div className='ui message violet'>
            <h3 class="ui header">
              Avatar Images
            </h3>
            <div class="ui divider"></div>
            <SUI.ImageGroup size='tiny' >
              {dataAvat.map((i, index) => (
                  <SUI.Image 
                      key={index} 
                      src={i.pathFull} 
                      label={{ as: 'a', color: 'violet', corner: 'right', icon: 'edit outline', size: 'mini' }}
                      className='' />
                  ))}
            </SUI.ImageGroup>
          </div>

          <div className='ui message violet'>
            <h3 class="ui header">
              Application Images
            </h3>
            <div class="ui divider"></div>
            <SUI.ImageGroup size='tiny' >
              {dataApps.map((i, index) => (
                  <SUI.Image 
                  key={index} 
                  src={i.pathFull} 
                  label={{ as: 'a', color: 'violet', corner: 'right', icon: 'edit outline', size: 'mini' }}
                  className='' />
              ))}
            </SUI.ImageGroup>
          </div>

          <div className='ui message violet'>
            <h3 class="ui header">
              Clubs Images
            </h3>
            <div class="ui divider"></div>
            <SUI.ImageGroup size='tiny' >
              {dataClubs.map((i, index) => (
                  <SUI.Image 
                  key={index} 
                  src={i.pathFull} 
                  label={{ as: 'a', color: 'violet', corner: 'right', icon: 'edit outline', size: 'mini' }}
                  className='' />
              ))}
            </SUI.ImageGroup>
          </div>

          <div className='ui message violet'>
            <h3 class="ui header">
              Logo Images
            </h3>
            <div class="ui divider"></div>
            <SUI.ImageGroup size='tiny' >
              {dataLogo.map((i, index) => (
                  <SUI.Image 
                  key={index} 
                  src={i.pathFull} 
                  label={{ as: 'a', color: 'violet', corner: 'right', icon: 'edit outline', size: 'mini' }}
                  className='' />
              ))}
            </SUI.ImageGroup>
          </div>


    </div>
      )}

</>

  );
}
