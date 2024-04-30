
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
                  Welcome back!  
                  <div className="sub header">{getUser["rolename"]}: {getUser["nickname"]}!</div>
              </div>
          </h2>
      </div>

      <div className="ui grid padded">
      <div className="row">
        <div className="four wide computer eight wide mobile six wide tablet column">
          <div className='ui segment message center aligned purple-box dotted button-animated'>
                <div className="ui statistic inverted forward">
                    <div className="value">
                      5,550
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
                    <div className="value">
                      5,55099
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column plus-top-bit ">
            <div className='ui segment message center aligned purple-box dotted button-animated'>
                <div className="ui statistic inverted green forward ">
                    <div className="value">
                      5,5509
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
        <div className="four wide computer eight wide mobile six wide tablet column plus-top-bit">
            <div className='ui segment message center aligned purple-box dotted button-animated'>
                <div className="ui statistic inverted orange forward">
                    <div className="value">
                      5,5509
                    </div>
                    <div className="label">
                      Accounts
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>

      <div class="ui four doubling stackable cards ">

                        <div class="red card">
                          <div class="content">
                            <div class="header"><i class="sticky note icon"></i> Documenti</div>
                            <div class="meta">Resoconto Documenti</div>
                            <div class="description">
                    
                              <div class="ui list">
                                <div class="item">
                                    <div class="content">
                                      <div class="right floated content">
                                        <span class="header">
                                          5000
                                        </span>
                                      </div>
                                      <div class="header">Attivi</div>
                                    </div>
                                </div>
                                <div class="item">
                                  <div class="content">
                                    <div class="right floated content">
                                      <span class="header">
                                        0
                                      </span>
                                    </div>
                                    <div class="header">Da approvare</div>
                                  </div>
                                </div>
                              </div>
                    
                            </div>
                          </div>
                    
                          <div class="extra content">
                            <span class="right floated">
                              <a href="#">Gestisci <i class="right arrow icon"></i></a>
                            </span>
                          </div>
                    
                        </div>

                        <div class="red card">
                          <div class="content">
                            <div class="header"><i class="th list icon"></i> Avvisi </div>
                            <div class="meta">Totale Avvisi</div>
                            <div class="description">
                              
                                <div class="ui list">
                                  <div class="item">
                                      <div class="content">
                                        <div class="right floated content">
                                          <span class="header">
                                            30
                                          </span>
                                        </div>
                                        <div class="header">Errori</div>
                                      </div>
                                  </div>
                                  <div class="item">
                                    <div class="content">
                                      <div class="right floated content">
                                        <span class="header">
                                          18
                                        </span>
                                      </div>
                                      <div class="header">Warning</div>
                                    </div>
                                  </div>
                                </div>
                    
                            </div>
                          </div>
                    
                          <div class="extra content">
                            <span class="right floated">
                              <a href="#">Gestisci <i class="right arrow icon"></i></a>
                            </span>
                          </div>
                    
                        </div>

                        <div class="red card">
                          <div class="content">
                            <div class="header"><i class="users icon"></i> Utenti</div>
                            <div class="meta">Utenti iscritti al progetto</div>
                            <div class="description">
                    
                                <div class="ui list">
                                  <div class="item">
                                      <div class="content">
                                        <div class="right floated content">
                                          <span class="header">
                                            24
                                          </span>
                                        </div>
                                        <div class="header">Approvati</div>
                                      </div>
                                  </div>
                                  <div class="item">
                                    <div class="content">
                                      <div class="right floated content">
                                        <span class="header">
                                          3
                                        </span>
                                      </div>
                                      <div class="header">Da Approvare</div>
                                    </div>
                                  </div>
                                </div>
                    
                            </div>
                          </div>
                    
                          <div class="extra content">
                            <span class="right floated">
                              <a href="#">Gestisci <i class="right arrow icon"></i></a>
                            </span>
                          </div>
                    
                        </div>

                        <div class="red card">
                          <div class="content">
                            <div class="header"><i class="server icon"></i> Server</div>
                            <div class="meta">Informazioni server</div>
                            <div class="description">
                              <div class="ui indicating progress" data-value="100" data-total="200" id="freeSpaceOnDisk_bar">
                                <div class="bar">
                                  <div class="progress"></div>
                                </div>
                                <div class="label">Spazio utilizzato</div>
                              </div>
                              
                              <div class="ui list">
                                <div class="item">
                                    <div class="content">
                                      <div class="right floated content">
                                        <span class="header">
                                          100 GB
                                        </span>
                                      </div>
                                      <div class="header">Spazio disponibile</div>
                                    </div>
                                </div>
                                <div class="item">
                                  <div class="content">
                                    <div class="right floated content">
                                      <span class="header">
                                        200 GB
                                      </span>
                                    </div>
                                    <div class="header">Spazio totale</div>
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
              </div>

        <div className='ui equal width grid padded segment three doubling' >
          <div class="center aligned row stretched">

              <GridColumn>
                  <Segment>Main</Segment>
              </GridColumn>
                <GridColumn>
                    <Segment>Sub 1</Segment>
                    <Segment>Sub 2</Segment>
                </GridColumn>

              <GridColumn>
                  <Segment>
                  <div class="ui three item menu fluid">
                      <a class="item">Item</a>
                      <a class="item">Item</a>
                      <a class="item">Item</a>
                    </div>
                  </Segment>
                  <Segment>2</Segment>
                  <Segment>3</Segment>
                  <Segment>3</Segment>
              </GridColumn>
          </div>

        </div>




        <div class="ui equal width stackable internally grid padded segment">
          <div class="center aligned row">
            <div class="column">
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
            <div class="column">
              <h4>Smartly Coded & Maintained.</h4>
              <h3>POWERFUL PERFORMANCE</h3>
              <p>
                Medecins du Monde Jane Addams reduce child mortality challenges Ford Foundation. Diversification shifting
                landscape advocate pathway to a better life rights international. Assessment.
              </p>
            </div>
            <div class="column">
              <h4>Flexible & Customizable.</h4>
              <h3>TRULY MULTI-PURPOSE</h3>
              <p>
                Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural resources. Governance
                impact; transformative donation philanthropy, respect reproductive.
              </p>
            </div>
            <div class="column">
              <h4>Flexible & Customizable.</h4>
              <h3>TRULY MULTI-PURPOSE</h3>
              <p>
                Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural resources. Governance
                impact; transformative donation philanthropy, respect reproductive.
              </p>
            </div>
            <div class="column">
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
