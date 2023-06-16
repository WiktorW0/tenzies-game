import React from 'react'

function Dice(props) {
  const styles = {
    boxShadow: props.isHeld ?
      ["inset 0 3px rgb(200, 200, 200)",
        "inset 0 -3px #007000",
        "inset 3px 0 #00ac14",
        "inset -3px 0 #00ac14"] :
      ["inset 0 3px rgb(200, 200, 200)",
        "inset 0 -3px #272727",
        "inset 3px 0 #484848",
        "inset -3px 0 #484848"],

    backgroundColor: props.isHeld ? "#59E391" : "#444444"
  }

  function diceDots(value) {
    switch (value) {
      case 1:
        return (
          <div className='first face' style={styles} onClick={props.hold}>
            <span className='point'></span>
          </div>
        )
      case 2:
        return (
          <div className='second face' style={styles} onClick={props.hold}>
            <span className='point'></span>
            <span className='point'></span>
          </div>
        )

      case 3:
        return (
          <div className='third face' style={styles} onClick={props.hold}>
            <span className='point'></span>
            <span className='point'></span>
            <span className='point'></span>
          </div>
        )
      case 4:
        return (
          <div className='fourth face' style={styles} onClick={props.hold}>
            <div className='column'>
              <span className='point'></span>
              <span className='point'></span>
            </div>
            <div className='column'>
              <span className='point'></span>
              <span className='point'></span>
            </div>
          </div>
        )
      case 5:
        return (
          <div className='fifth face' style={styles} onClick={props.hold}>
            <div className='column'>
              <span className='point'></span>
              <span className='point'></span>
            </div>
            <div className='column'>
              <span className='point'></span>
            </div>
            <div className='column'>
              <span className='point'></span>
              <span className='point'></span>
            </div>
          </div>
        )
      case 6:
        return (
          <div className='sixth face' style={styles} onClick={props.hold}>
            <div className='column'>
              <span className='point'></span>
              <span className='point'></span>
              <span className='point'></span>
            </div>
            <div className='column'>
              <span className='point'></span>
              <span className='point'></span>
              <span className='point'></span>
            </div>
          </div>
        )
      default:
        break;
    }
  }

  return (
    <div className='dice--container' >
      {diceDots(props.value)}
    </div>
  )
}

export default Dice