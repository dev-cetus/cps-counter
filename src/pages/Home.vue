<script setup lang="ts">
import {ref} from "vue"

const timer = ref(0.0)
const clicks = ref(0)
const clicksPreSecond = ref(0)
const lastClicksPerSecond = ref(0)
const time = ref(10)
const useGameState = ref('start' as 'start' | 'inGame' | 'finish')

function startCpsCounter() {
    // timer: 0.1 -> 0.2 ... 0.9 -> 1.0 -> 1.1 -> 1.2
    useGameState.value = 'inGame'
    if (clicks.value == 0) {
        const internalTimer = setInterval(() => {
            timer.value += 0.1;
            timer.value = parseFloat(timer.value.toFixed(1)); // Trim excess decimals
            if (timer.value >= time.value) {
                useGameState.value = 'finish'
                clearInterval(internalTimer);

                clicksPreSecond.value = parseFloat((clicks.value / timer.value).toFixed(2))
            }
        }, 100);
    }
    clicks.value++
}

function reset() {
    lastClicksPerSecond.value = clicksPreSecond.value
    clicks.value = 0
    timer.value = 0.0
    clicksPreSecond.value = 0
    useGameState.value = 'start'
}

</script>

<template>
    <div class="bg-gray-800 m-0 p-0 h-screen font-poppins">
        <header class="bg-indigo-400 py-12">
            <div class="flex flex-col items-center">
                <h1 class="font-bold text-4xl">CPS Counter</h1>
                <p>You have 1 minute to click</p>
            </div>
        </header>
        <div class="flex flex-col items-center">
            <p class="text-xl text-white py-4">{{ timer }}s</p>
            <div v-if="useGameState != 'finish'"
                 class="bg-orange-500/80 ring-1 ring-orange-800 h-96 md:w-1/2 rounded-lg flex justify-center items-center text-gray-600 font-bold text-sm md:text-xl select-none cursor-pointer w-full mx-4"
                 @click="startCpsCounter">
                <p v-if="clicks != 0">{{ clicks }}</p>
                <p v-else class="px-4 md:px-0 text-center">Click in the orange rectangle to start</p>
            </div>
            <div v-else @click="reset"
                 class="ring-1 ring-gray-900 h-96 md:w-1/2 text-white flex flex-col justify-center items-center select-none rounded-lg cursor-pointer text-sm md:text-xl px-4 md:px-0 text-center w-full mx-4" id="resetBox">
                <p>~{{ clicksPreSecond }} clicks per second, GG!</p>
                <p>Click in the box to restart</p>
            </div>
            <p v-if="lastClicksPerSecond != 0" class="text-white my-2">Last score: {{ lastClicksPerSecond }} clicks per
                second!</p>
            <select v-model="time" class="my-2" :disabled="useGameState == 'inGame'">
                <option :value="10">10 seconds</option>
                <option :value="20">20 seconds</option>
                <option :value="30">30 seconds</option>
                <option :value="60">1 minute</option>
            </select>
        </div>
    </div>
</template>