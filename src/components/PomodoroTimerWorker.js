let timer;

onmessage = (e) => {
    const {action, duration} = e.data;
    if(action == 'start'){
        timer = setInterval(() => {
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