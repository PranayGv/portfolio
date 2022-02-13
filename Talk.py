def talk(Text):
    import pyttsx3
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[2].id)
    print('  ')
    print(f'A.I:{Text}')
    engine.say(text=Text)
    engine.runAndWait()
    print('  ')