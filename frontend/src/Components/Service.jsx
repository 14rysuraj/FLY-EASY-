import React from 'react'
import "./Service.scss"

const Service = ({img,h,p}) => {
    return (
     
        <div className='chooseCard'>
              <div className="img">
             {img}
              </div>
              <h2>{h }</h2>
              <p className="pp">{ p}</p>
            </div>
          
      )
    }
export default Service
