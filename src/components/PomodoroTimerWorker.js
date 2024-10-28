let timer;

onmessage = (e) => {
    let {action, duration} = e.data;
    if(action == 'start'){
        
        timer = setInterval(() => {
            console.log(duration)
            duration -= 1000;
            self.postMessage(duration);
            if(duration <= 0) {
                clearInterval(timer);
                self.postMessage('time-up');
            }
        }, 1000)
    } else if(action == 'stop'){
        clearInterval(timer)
    }

}