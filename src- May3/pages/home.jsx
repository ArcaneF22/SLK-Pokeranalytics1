
import { isNumeric } from '../utilities/tools'
import { FetchNotificationPending } from '../utilities/fetch/items/notifications'
import { useGlobalOutside  } from '../utilities/context/global';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { GridRow, GridColumn, Grid, Segment, Image } from 'semantic-ui-react'


export const HomePage = () => {

  const { countNotif } = useGlobalOutside();
  const isToken = JSON.parse(localStorage.getItem('Token'))["id"]
  const getUser = JSON.parse(localStorage.getItem('User'))
  const isNum = isNumeric(isToken)


    useLayoutEffect(() => {

    }, []);

  return (
    <>
      <div className='ui segment message purple-box div-animated'>
        <h2 className="ui header inverted">
              <i className="home big icon"></i>
              <div className="content">
                  <div className="sub header">WELCOME {getUser["rolename"]}</div>
                  {getUser["nickname"]}
              </div>
          </h2>
      </div>

      <div className="ui grid padded">
      <div className="row">
        <div className="four wide computer eight wide mobile six wide tablet column">
          <div className='ui segment message center aligned purple-box dotted button-animated'>
                <div className="ui statistic inverted forward">
                    <div className="value">
                      <span className='label-small'>5,550</span>
                    </div>
                    <div className="label">
                      Users
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column">
            <div className='ui segment message center aligned purple-box dotted button-animated'>
                <div className="ui statistic inverted blue forward">
                    <div className="value text-label-title">
                    <span className='label-small'>5,5509989</span>
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column plus-top-bit ">
            <div className='ui segment message center aligned purple-box dotted button-animated '>
                <div className="ui statistic inverted green forward">
                    <div className="value ">
                    <span className='label-small'>5,5509989</span>
                    </div>
                    <div className="label">
                       <span  style={{alignItems:"left !important"}}>Accounts</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column plus-top-bit">
            <div className='ui segment message center aligned purple-box dotted button-animated'>
                <div className="ui statistic inverted orange forward">
                    <div className="value">
                    <span className='label-small'>5,5509989</span>
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>

      <div className="ui four doubling stackable cards ">

                        <div className="red card">
                          <div className="content">
                            <div className="header"><i className="sticky note icon"></i> Documenti</div>
                            <div className="meta">Resoconto Documenti</div>
                            <div className="description">
                    
                              <div className="ui list">
                                <div className="item">
                                    <div className="content">
                                      <div className="right floated content">
                                        <span className="header">
                                          5000
                                        </span>
                                      </div>
                                      <div className="header">Attivi</div>
                                    </div>
                                </div>
                                <div className="item">
                                  <div className="content">
                                    <div className="right floated content">
                                      <span className="header">
                                        0
                                      </span>
                                    </div>
                                    <div className="header">Da approvare</div>
                                  </div>
                                </div>
                              </div>
                    
                            </div>
                          </div>
                    
                          <div className="extra content">
                            <span className="right floated">
                              <a href="#">Gestisci <i className="right arrow icon"></i></a>
                            </span>
                          </div>
                    
                        </div>

                        <div className="red card">
                          <div className="content">
                            <div className="header"><i className="th list icon"></i> Avvisi </div>
                            <div className="meta">Totale Avvisi</div>
                            <div className="description">
                              
                                <div className="ui list">
                                  <div className="item">
                                      <div className="content">
                                        <div className="right floated content">
                                          <span className="header">
                                            30
                                          </span>
                                        </div>
                                        <div className="header">Errori</div>
                                      </div>
                                  </div>
                                  <div className="item">
                                    <div className="content">
                                      <div className="right floated content">
                                        <span className="header">
                                          18
                                        </span>
                                      </div>
                                      <div className="header">Warning</div>
                                    </div>
                                  </div>
                                </div>
                    
                            </div>
                          </div>
                    
                          <div className="extra content">
                            <span className="right floated">
                              <a href="#">Gestisci <i className="right arrow icon"></i></a>
                            </span>
                          </div>
                    
                        </div>

                        <div className="red card">
                          <div className="content">
                            <div className="header"><i className="users icon"></i> Utenti</div>
                            <div className="meta">Utenti iscritti al progetto</div>
                            <div className="description">
                    
                                <div className="ui list">
                                  <div className="item">
                                      <div className="content">
                                        <div className="right floated content">
                                          <span className="header">
                                            24
                                          </span>
                                        </div>
                                        <div className="header">Approvati</div>
                                      </div>
                                  </div>
                                  <div className="item">
                                    <div className="content">
                                      <div className="right floated content">
                                        <span className="header">
                                          3
                                        </span>
                                      </div>
                                      <div className="header">Da Approvare</div>
                                    </div>
                                  </div>
                                </div>
                    
                            </div>
                          </div>
                    
                          <div className="extra content">
                            <span className="right floated">
                              <a href="#">Gestisci <i className="right arrow icon"></i></a>
                            </span>
                          </div>
                    
                        </div>

                        <div className="red card">
                          <div className="content">
                            <div className="header"><i className="server icon"></i> Server</div>
                            <div className="meta">Informazioni server</div>
                            <div className="description">
                              <div className="ui indicating progress" data-value="100" data-total="200" id="freeSpaceOnDisk_bar">
                                <div className="bar">
                                  <div className="progress"></div>
                                </div>
                                <div className="label">Spazio utilizzato</div>
                              </div>
                              
                              <div className="ui list">
                                <div className="item">
                                    <div className="content">
                                      <div className="right floated content">
                                        <span className="header">
                                          100 GB
                                        </span>
                                      </div>
                                      <div className="header">Spazio disponibile</div>
                                    </div>
                                </div>
                                <div className="item">
                                  <div className="content">
                                    <div className="right floated content">
                                      <span className="header">
                                        200 GB
                                      </span>
                                    </div>
                                    <div className="header">Spazio totale</div>
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
              </div>

        <div className='ui equal width grid padded segment three doubling' >
          <div className="center aligned row stretched">

              <GridColumn>
                  <Segment>Main</Segment>
              </GridColumn>
                <GridColumn>
                    <Segment>Sub 1</Segment>
                    <Segment>Sub 2</Segment>
                </GridColumn>

              <GridColumn>
                  <Segment>
                  <div className="ui three item menu fluid">
                      <a className="item">Item</a>
                      <a className="item">Item</a>
                      <a className="item">Item</a>
                    </div>
                  </Segment>
                  <Segment>2</Segment>
                  <Segment>3</Segment>
                  <Segment>3</Segment>
              </GridColumn>
          </div>

        </div>




        <div className="ui equal width stackable internally grid padded segment">
          <div className="center aligned row">
            <div className="column">
              <h3>RESPONSIVE & RETINA</h3>
              <div className='ui segment message center aligned purple-box'>
                <div className="ui statistic inverted orange">
                    <div className="value">
                      5,550
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
            </div>
            <div className="column">
              <h4>Smartly Coded & Maintained.</h4>
              <h3>POWERFUL PERFORMANCE</h3>
              <p>
                Medecins du Monde Jane Addams reduce child mortality challenges Ford Foundation. Diversification shifting
                landscape advocate pathway to a better life rights international. Assessment.
              </p>
            </div>
            <div className="column">
              <h4>Flexible & Customizable.</h4>
              <h3>TRULY MULTI-PURPOSE</h3>
              <p>
                Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural resources. Governance
                impact; transformative donation philanthropy, respect reproductive.
              </p>
            </div>
            <div className="column">
              <h4>Flexible & Customizable.</h4>
              <h3>TRULY MULTI-PURPOSE</h3>
              <p>
                Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural resources. Governance
                impact; transformative donation philanthropy, respect reproductive.
              </p>
            </div>
            <div className="column">
              <h4>Flexible & Customizable.</h4>
              <h3>TRULY MULTI-PURPOSE</h3>
              <p>
                Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural resources. Governance
                impact; transformative donation philanthropy, respect reproductive.
              </p>
            </div>
          </div>
        </div>


      <div className="ui vertical stripe quote segment heros">
        <div className="ui middle aligned stackable grid container">
          <div className="row">
              <div className="six wide right floated column">
                <h3>Welcome </h3>
              </div>
            </div>
            <div className="eight wide left floated column">
              <FetchNotificationPending />
            </div>
          </div>
        </div>


  

</>

  );
};
