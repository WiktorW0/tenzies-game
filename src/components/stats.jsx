import React from 'react'

function Stats(props) {
  return (
    <div className='timer'>
      <div className="timeContainer">
        <div className="timeDisplay currentTime">
          <h4>Your current time:</h4>
          {props.cTime}
          <h4 className='currentRolls'>You are at roll: {props.cRolls}</h4>
        </div>
      </div>
      <div className="timeContainer">
        <div className="timeDisplay  bestTime">
          <h4>Your best time:</h4>
          {props.bTime}
          <h4 className="fewestRolls">Fewest number of rolls: {props.bRolls}</h4>
        </div>
      </div>
    </div>
  )
}


export default Stats