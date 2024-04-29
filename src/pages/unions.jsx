import { useLayoutEffect, useState } from 'react';
import { FetchUnions } from '../utilities/fetch/tables/unions'

export const UnionsPage = () => {

  const selectUnion = (newValue) => {
    setgotClub(newValue)
  };

    return (
    <>
      <div className='ui segment message purple-box'>
        <h2 className="ui header inverted">
              <i className="layer group big icon"></i>
              <div className="content">
                  Unions Page
                  <div className="sub header">Manage your preferences</div>
              </div>
          </h2>
      </div>
        
        <table class="ui table basic">
          <tr class="ui middle aligned divided list">
            <td className='center aligned'>
            <FetchUnions selectUnion={selectUnion} />
            </td>
            <td class="left aligned collapsing top aligned" style={{minWidth:"300px", border:"none"}}>
              <div className=' ui segment' style={{marginTop:"68px"}}>
                <h4 className='center aligned'>HISTORY</h4>
                  <div class="ui relaxed divided list">
                    <div class="item">
                    <i class="history large middle aligned icon grey"></i>
                      <div class="content">
                        <span class="header">Data ABCD</span>
                        <div class="description">Updated 10 mins ago</div>
                      </div>
                    </div>
                    <div class="item">
                    <i class="history large middle aligned icon grey"></i>
                      <div class="content">
                        <span class="header">Data ABCD</span>
                        <div class="description">Added 15 mins ago</div>
                      </div>
                    </div>
                  </div>
              </div>
            </td>
          </tr>
        </table>



    </>

    );
  };
  