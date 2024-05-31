import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Transition } from "semantic-ui-react";
import useInterval from 'use-interval'

export const Logout = (props) => {

  return (
      <>
        <Transition animation='pulse' duration={500} >
          <Modal dimmer="blurring" size="mini" closeIcon  onClose={props.onClose} open={props.open}>
          
            <h2 className="ui icon header">
              <i className="log out icon"></i>
              <div className="content">
                Log Out
              <div className="sub header">Would you like to continue?</div>
              </div>
            </h2>
              <div className="actions">
                <a href="/" className="ui button red">
                  Log Out
                </a>
                <div className="ui cancel button" onClick={props.onClose} open={props.open}>
                  Cancel
                </div>
              </div>
          </Modal>
        </Transition>
      </>
        );
};

export const SessionExpire = (props) => {
  const navigate = useNavigate();
  function LogOut(){
    localStorage.clear();
    navigate("/");
  }
  return (
      <>
        <Transition dimmer="blurring" animation='pulse' duration={500} >
        <Modal size="mini" closeIcon onClose={props.onClose} open={props.open}>
            <h2 className="ui icon header">
              <i className="exclamation triangle icon red"></i>
              <div className="content">
                Session Ending
              <div className="sub header">You will be logged out for inactivity.</div>
              </div>
            </h2>
              <div className="actions">
              <div className="ui cancel button" onClick={props.onClose} open={props.open}>
                  Close
                  </div>
                <div className="ui red button" onClick={LogOut} open={props.open}>
                  Logout
                </div>
              </div>
          </Modal>
        </Transition>
      </>
        );
};

export const Warning = (props) => {
    return (
        <>
          <Transition animation='tada' duration={500} >
            <Modal dimmer="blurring" size="mini" closeIcon onClose={props.onClose} open={props.open}>
              <h2 className="ui icon header">
                <i className="exclamation circle icon yellow"></i>
                <div className="content">
                    {props.AlertMessage['Title'] ? props.AlertMessage['Title'] : "Oops!"}
                  <div className="sub header">
                    {props.AlertMessage['Message'] ? props.AlertMessage['Message'] : "Please check details"}
                  </div>
                </div>
              </h2>
                <div className="actions">
                  <div className="ui cancel button" onClick={props.onClose} open={props.open}>
                  Close
                  </div>
                </div>

            </Modal>
          </Transition>
        </>
          );
};

export const Success = (props) => {
    return (
        <>
          <Transition animation='pulse' duration={500} >
            <Modal dimmer="blurring" size="mini" closeIcon onClose={props.onClose} open={props.open}>
              <h2 className="ui icon header">
                <i className="check circle outline icon green"></i>
                <div className="content">
                  {props.AlertMessage['Title'] ? props.AlertMessage['Title'] : "Success!"}
                  <div className="sub header">
                    {props.AlertMessage['Message'] ? props.AlertMessage['Message'] : "Changes has been saved."}
                  </div>
                </div>
              </h2>
                <div className="actions">
                  <div className="ui cancel button" onClick={props.onClose} open={props.open}>
                  Close
                  </div>
                </div>
            </Modal>
          </Transition>
        </>
          );
};

export const SuccessRefresh = (props) => {
    function refresh(){
        window.location.reload();
    }
    return (
        <>
          <Transition animation='pulse'  duration={500} >
            <Modal dimmer="blurring" size="mini" open={props.open}>
              <h2 className="ui icon header">
                <i className="check circle outline icon green"></i>
                <div className="content">
                  {props.AlertMessage['Title'] !== null ? props.AlertMessage['Title'] : "Success!"}
                  <div className="sub header">
                    {props.AlertMessage['Message']  !== null ? props.AlertMessage['Message'] : "Changes has been saved."}
                  </div>
                </div>
              </h2>
                <div className="actions">
                  <div className="ui cancel button" onClick={refresh} open={props.open}>
                  Close
                  </div>
                </div>
            </Modal>
          </Transition>
        </>
          );
};

export const Error = (props) => {
    function refresh(){
        window.location.reload();
    }
    return (
        <>
          <Transition animation='pulse' duration={500} >
            <Modal dimmer="blurring" size="mini" closeIcon onClose={props.onClose} open={props.open}>
              <h2 className="ui icon header">
                <i className="exclamation triangle icon red"></i>
                <div className="content">
                  Error!
                <div className="sub header">Changes is not saved.</div>
                </div>
              </h2>
                <div className="actions">
                  <div className="ui cancel button" onClick={refresh} open={props.open}>
                    Close
                  </div>
                </div>
            </Modal>
          </Transition>
        </>
          );
};

export const ErrorRefresh = (props) => {
    return (
        <>
          <Transition animation='pulse' duration={500} >
          <Modal dimmer="blurring" size="mini" open={props.open}>
              <h2 className="ui icon header">
                <i className="exclamation triangle icon red"></i>
                <div className="content">
                  Error!
                <div className="sub header">Changes is not saved.</div>
                </div>
              </h2>
                <div className="actions">
                  <div className="ui cancel button" onClick={props.onClose} open={props.open}>
                    Close
                  </div>
                </div>
            </Modal>
          </Transition>
        </>
          );
};
