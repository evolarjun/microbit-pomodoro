# update the screen with a number of minutes
def updateTimerDisplay(t: number):
    global t2, max_brightness, brightness
    t2 = t
    brightness = (t - int(t)) * max_brightness
    for row in range(5):
        for col in range(5):
            # if t2 > 0 and t2 < 2:
            # led.plot_brightness(col, row, brightness)
            # elif t2 > 1:
            if t2 > 0:
                # led.plot(col, row)
                if int(t2) == 0:
                    led.plot_brightness(col, row, brightness)
                else:
                    led.plot_brightness(col, row, max_brightness)
                t2 += -1
            else:
                led.unplot(col, row)

def on_button_pressed_a():
    global time
    if time == 25:
        time = 5
    else:
        time = 25
input.on_button_pressed(Button.A, on_button_pressed_a)

def Alert():
    global updatedisplay
    music.play(music.tone_playable(440, music.beat(BeatFraction.SIXTEENTH)),
        music.PlaybackMode.UNTIL_DONE)
    updatedisplay = 0
    for index2 in range(4):
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
        basic.pause(100)
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            """)
        basic.pause(100)
    basic.show_leds("""
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        """)
    updatedisplay = 1

def on_button_pressed_b():
    global running, left, updatedisplay
    if running == 0:
        running = 1
        left = time
        updatedisplay = 0
        basic.show_number(left)
        updatedisplay = 1
        updateTimerDisplay(left)
    else:
        running = 0
        left = time
input.on_button_pressed(Button.B, on_button_pressed_b)

left = 0
brightness = 0
max_brightness = 150
t2 = 0
updatedisplay = 0
running = 0
time = 0
step2 = 0
index = 0
# time in minutes for the entire timer
time = 25
ms_multiplier = 60000
# ms_multiplier = 1000
# number of ms in a minute (reduce to accelerate timer)
running = 0
updatedisplay = 1
radio.off()

def on_every_interval():
    global left, running
    if running == 1:
        left += 0 - 0.1
        if updatedisplay == 1:
            updateTimerDisplay(left)
        if left <= 0:
            running = 0
            Alert()
    elif updatedisplay == 1:
        if time == 25:
            basic.show_leds("""
                . . . . .
                . . . . .
                # # # # #
                . . . . .
                . . . . .
                """)
        else:
            basic.show_leds("""
                . . . . .
                . . . . .
                # . . . .
                . . . . .
                . . . . .
                """)
loops.every_interval(ms_multiplier / 20, on_every_interval)
