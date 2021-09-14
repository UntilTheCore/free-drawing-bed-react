import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MyRouter from "router";
import Header from "components/Header";
import Footer from "components/Footer";
import Loading from "components/Loading";
import { makeObservable, observable, computed, action, configure } from "mobx"
import { observer } from "mobx-react-lite";

configure({
  enforceActions: 'observed'
})

class Timer {
  secondsPassed = 0;

  constructor() {
    // makeAutoObservable(this);
/*     makeObservable(this,{
      secondsPassed: observable,
      increaseTimer: action
    }) */
    makeObservable(this,{
      secondsPassed: observable,
      increaseTimer: action
    });
  }

  increaseTimer() {
    this.secondsPassed += 1;
    console.log(this.secondsPassed);
    
  }
}

const myTimer = new Timer();

//被`observer`包裹的函数式组件会被监听在它每一次调用前发生的任何变化
const TimerView: React.FC<{ timer: Timer }> = observer((props) => (
  <>
    <span>Seconds passed: {props.timer.secondsPassed} </span>
    <button onClick={() => props.timer.increaseTimer()}>+1</button>
  </>
));

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Suspense fallback={<Loading />}>
          <TimerView timer={myTimer}></TimerView>
          <MyRouter />
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
