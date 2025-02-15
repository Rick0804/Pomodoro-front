import { defineStore } from "pinia";

export const timers = defineStore('timers', {
    state: () => ({
        minuteP: 30,
        secondP: 0,
        minuteB: 10,
        secondB: 0,
        statusTimer: false,
        

    }),
    actions: {
        setMinuteP(value){
            this.minuteP = value
        },
        setSecondP(value){
            this.secondP = value
        },
        setMinuteB(value){
            this.minuteB = value
        },
        setSecondB(value){
            this.secondB = value
        },
        
    },
})