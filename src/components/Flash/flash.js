import React, { useEffect, useState } from 'react';
import {event} from '../../App';
import './flash.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export const Flash = () => {
  
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
      event.addListener('flash', ({message, type}) => {
          setVisibility(true);
          setMessage(message);
          setType(type);
      });
              

  }, []);

  useEffect(() => {
      setTimeout(() => {
        setVisibility(false);
      }, 10000)
  })

  return (
      visibility && 
        <div className={`alert alert-${type}`}>
            <br />
            <p>{message}</p>
            <span className="close">
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => setVisibility(false)} />
            </span>
            <br />
          </div>
  )
}