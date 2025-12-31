import React from 'react'
import "./Service.scss"

const Service = ({img, h, p, stat}) => {
    return (
     
        <div className='chooseCard'>
              {stat && <div className="stat-badge">{stat}</div>}
              <div className="img">
             {img}
              </div>
              <h2>{h}</h2>
              <p className="pp">{p}</p>
            </div>
          
      )
    }
export default Service
