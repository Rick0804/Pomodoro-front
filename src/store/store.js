import { defineStore } from "pinia";

export const timers = defineStore('timers', {
    state: () => ({
        second: 35,
        minute: 48
    }),
    actions: {
        setMinute(value){
            this.minute = value
        },
        setSecond(value){
            this.second = value
        }
    }
})