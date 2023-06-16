import Dice from './components/dice';
import './App.css';
import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from './components/useWindowSize';
import Stats from './components/stats';



function App() {

  const { width, height } = useWindowSize()
  const [diceComp, setDiceComp] = React.useState(allNewDice)
  const [tenzies, setTenzies] = React.useState(false)
  const [rollCount, setRollCount] = React.useState({
    currentRolls: 0,
    bestRolls: JSON.parse(localStorage.getItem('bestRolls')) || 0
  })


  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }


  React.useEffect(() => {
    const allEqual = diceComp.every(dice => dice.isHeld)
    const firstValue = diceComp[0].value
    const equalValue = diceComp.every(dice => dice.value === firstValue)

    if (allEqual && equalValue) {
      setTenzies(true)
      console.log("you won")
      setIsRunning(false)
      if (bestTime === "--:--:--:--" || currentTime < bestTime) {
        setBestTime(prevBestTime => prevBestTime = currentTime)
      }
      if (rollCount.bestRolls === 0 || rollCount.currentRolls < rollCount.bestRolls) {
        setRollCount(prevRoll => {
          return {
            ...prevRoll,
            bestRolls: prevRoll.currentRolls
          }
        })
      }


    }
  }, [diceComp])

  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(
        generateNewDie()
      )
    }
    return diceArray
  }

  const newDiceArray = diceComp.map((dice, index) => {
    return (
      <Dice
        key={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        hold={() => hold(dice.id)}
      />
    )
  })

  function Roll() {
    setDiceComp(prevDiceComp => prevDiceComp.map(diceComp => {
      return diceComp.isHeld ? diceComp : generateNewDie()
    })
    )
    setRollCount(prevRollCount => {
      return {
        ...prevRollCount,
        currentRolls: prevRollCount.currentRolls + 1
      }
    })
  }

  function hold(id) {
    setDiceComp(prevDiceComp => prevDiceComp.map(diceComp => {
      return diceComp.id === id ? { ...diceComp, isHeld: !diceComp.isHeld } : diceComp
    })
    )
    if (tenzies === false && isRunning === false) {
      setIsRunning(true)
    }
  }

  function newGame() {
    setDiceComp(allNewDice)
    setTenzies(false)
    setTimer(0)
    setRollCount(prevRollCount => {
      return {
        ...prevRollCount,
        currentRolls: 0
      }
    })
  }


  const [timer, setTimer] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const [bestTime, setBestTime] = React.useState((localStorage.getItem("bestTime")) || "--:--:--:--")
  const hrs = Math.floor(timer / 360000)
  const mins = Math.floor((timer % 360000) / 6000)
  const secs = Math.floor((timer % 6000) / 100)
  const milisecs = timer % 100
  const currentTime = `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${milisecs.toString().padStart(2, "0")}`
  localStorage.setItem("bestTime", bestTime)
  localStorage.setItem('bestRolls', JSON.stringify(rollCount.bestRolls))
  React.useEffect(() => {
    let internalId
    if (isRunning) {
      internalId = setInterval(() => setTimer(prevTimer => prevTimer + 1), 10)
    }
    return () => clearInterval(internalId)
  }, [isRunning, timer])

  return (
    <main className="App">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='App--gameSpace'>
        {newDiceArray}
      </div>
      <button className='App--rollBtn' onClick={tenzies ? newGame : Roll}>
        <h4>{tenzies ? "New Game" : "Roll"}</h4>
      </button>
      {tenzies && <Confetti width={width} height={height} />}
      <Stats
        cTime={currentTime}
        bTime={bestTime}
        cRolls={rollCount.currentRolls}
        bRolls={rollCount.bestRolls}
      />
    </main>
  );
}

export default App;
