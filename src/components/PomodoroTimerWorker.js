
let timer;
onmessage = (e) => {
    let {action, duration} = e.data;
    if(action === 'start'){
        console.log('start')
        timer = setInterval(() => {
            duration -= 1000;
            self.postMessage(duration);
            if(duration <= 0) {
                clearInterval(timer);
                self.postMessage('time-up');
            }
        }, 1000)
    } else if(action === 'stop'){
        console.log('parou')
        clearInterval(timer)
        self.postMessage(duration)
    }

}