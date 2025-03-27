//  update the screen with a number of minutes
function updateTimerDisplay(t: number) {
    
    t2 = t
    max_brightness = 150
    brightness = (t - Math.trunc(t)) * max_brightness
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            //  if t2 > 0 and t2 < 2:
            //  led.plot_brightness(col, row, brightness)
            //  elif t2 > 1:
            if (t2 > 0) {
                //  led.plot(col, row)
                if (Math.trunc(t2) == 0) {
                    led.plotBrightness(col, row, brightness)
                } else {
                    led.plotBrightness(col, row, max_brightness)
                }
                
                t2 += -1
            } else {
                led.unplot(col, row)
            }
            
        }
    }
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (time == 25) {
        time = 5
    } else {
        time = 25
    }
    
})
function Alert() {
    
    music.play(music.tonePlayable(440, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    updatedisplay = 0
    for (let index2 = 0; index2 < 4; index2++) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(100)
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    updatedisplay = 1
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (running == 0) {
        running = 1
        left = time
        updatedisplay = 0
        basic.showNumber(left)
        updatedisplay = 1
        updateTimerDisplay(left)
    } else {
        running = 0
        left = time
    }
    
})
let left = 0
let brightness = 0
let max_brightness = 0
let t2 = 0
let updatedisplay = 0
let running = 0
let time = 0
let step2 = 0
let index = 0
//  time in minutes for the entire timer
time = 25
let ms_multiplier = 60000
//  ms_multiplier = 1000
//  number of ms in a minute (reduce to accelerate timer)
running = 0
updatedisplay = 1
loops.everyInterval(ms_multiplier / 10, function on_every_interval() {
    
    if (running == 1) {
        left += 0 - 0.1
        if (updatedisplay == 1) {
            updateTimerDisplay(left)
        }
        
        if (left <= 0) {
            Alert()
            running = 0
        }
        
    } else if (updatedisplay == 1) {
        if (time == 25) {
            basic.showLeds(`
                . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . . . . .
                # . . . .
                . . . . .
                . . . . .
                `)
        }
        
    }
    
})
