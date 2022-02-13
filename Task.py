import os
import webbrowser
import pywhatkit
from Talk import talk

# Non-Input


def Time():
    import datetime
    time = datetime.datetime.now().strftime("%I:%M %p")
    talk(time)


def Date():
    import datetime
    date = datetime.date.today()
    talk(f"Its {date} today")


def Day():
    import datetime
    day = datetime.datetime.now().strftime("%A")
    talk(f"Its {day} today")


def OpenGoogle():
    url = "http://www.google.com"
    webbrowser.open(url)
    talk("opening google")


def OpenYoutube():
    url = "http://www.youtube.com"
    webbrowser.open(url)
    talk("opening youtube")


def OpenInstagram():
    url = "http://www.instagram.com"
    talk("opening instagram")
    webbrowser.open(url)


def Jokes():
    import pyjokes
    talk("heres a joke for you")
    talk(pyjokes.get_joke(language='en'))


def Camera():
    os.system("start microsoft.windows.camera:")
    talk("opening camera")


def OpenCmd():
    import os
    os.system('start cmd')
    talk("Opening cmd")


def switchtab():
    import pyautogui
    pyautogui.hotkey('alt', 'tab')
    talk("ok")


def calculator():
    webbrowser.open(
        'https://www.google.com/search?client=firefox-b-d&q=calculator&spell=1&sa=X&ved=2ahUKEwjfqImDuNb1AhXoTWwGHWrLATEQBSgAegQIARAy&biw=1536&bih=731&dpr=1.25')
    talk("Opening calculator")


def CloseApp():
    import pyautogui
    pyautogui.hotkey('alt', 'f4')
    talk("closing")


def Fact():
    import randfacts
    talk("heres a fact for you")
    talk(randfacts.get_fact(filter_enabled=True,))


def FlipACoin():
    import random
    randomint = random.randint(1, 4)
    talk("flipping..")
    talk("3  2  1")
    if(randomint == 2):
        talk("It is Heads")
    else:
        talk("It is Tails")


def Discord():
    import os
    os.startfile(
        r"C:\Users\venka\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Discord Inc\Discord.lnk")
    talk("opening discord")


def SpeedTest():
    webbrowser.open("https://fast.com/")
    talk("checking speed")


def News():
    webbrowser.open(
        "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen")
    talk('opening news')


def NonInputExecution(query):
    query = str(query)

    if 'time' in query:
        Time()

    elif 'date' in query:
        Date()

    elif 'day' in query:
        Day()

    elif 'opengoogle' in query:
        OpenGoogle()

    elif 'openyoutube' in query:
        OpenYoutube()

    elif 'openinstagram' in query:
        OpenInstagram()

    elif 'switchtab' in query:
        switchtab()

    elif 'joke' in query:
        Jokes()

    elif 'cmd' in query:
        OpenCmd()

    elif 'closeapp' in query:
        CloseApp()

    elif 'fact' in query:
        Fact()

    elif 'flipacoin' in query:
        FlipACoin()

    elif 'discord' in query:
        Discord()

    elif 'discord' in query:
        calculator()

    elif 'camera' in query:
        Camera()

    elif 'internetspeed' in query:
        SpeedTest()

    elif 'news' in query:
        News()

# Input


def InputExecution(tag, query):

    if 'weather' in tag:
        try:
            URL = "https://www.google.com/search?client=firefox-b-d&q="+query
            header = {
                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0'}
            from requests_html import HTMLSession
            page = HTMLSession().get(URL, headers=header)
            temp = page.html.find('span#wob_tm', first=True).text
            stats = page.html.find('span#wob_dc', first=True).text
            talk(
                f"The weather could be {stats}, the temperature outside could be {temp} celcius.")

        except:
            webbrowser.open(URL)
            talk("something went wrong. opening in google")

    elif 'wikipedia' in tag:
        query = str(query).replace("google", "")
        query = query.replace("search", "")
        URL = "https://www.google.com/search?client=firefox-b-d&q="+query
        header = {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0'}
        import requests
        from bs4 import BeautifulSoup
        page = requests.get(URL, headers=header)
        soup = BeautifulSoup(page.content, 'html.parser')

        try:
            result = soup.find(class_='Z0LcW').get_text()
            talk(result)
        except:
            try:
                result = soup.find(class_='LTKOO sY7ric').get_text()
                talk(result)
            except:
                try:
                    result = soup.find(class_='LGOjhe').get_text()
                    talk(result)
                except:
                    try:
                        result = soup.find(class_='O5uR6d LTKOO').get_text()
                        talk(result)

                    except:
                        try:
                            result = soup.find(class_='di3YZe').get_text()
                            talk(result)

                        except:
                            try:
                                result = soup.find(class_='hgKElc').get_text()
                                talk(result)

                            except:
                                try:
                                    result = soup.find(
                                    class_='kno-rdesc').get_text()
                                    talk(result)
                                except:
                                    try:
                                        result = soup.find(
                                            class_='m7B03').get_text()
                                        talk(result)
                                    except:
                                        try:
                                            result = soup.find(
                                            class_='sXLaOe').get_text()
                                            talk(result)
                                        except:
                                                try:
                                                    query = str(query).replace(
                                                        "what", "")
                                                    query = str(query).replace(
                                                        "who", "")
                                                    query = str(query).replace(
                                                        "about", "")
                                                    query = str(query).replace(
                                                        "how", "")
                                                    query = str(query).replace(
                                                        "is", "")
                                                    talk(pywhatkit.summary(query, 1))
                                                except:
                                                    pywhatkit.search(query)
                                                    talk(
                                                        'cant find the answer searching on google')

    elif 'youtube' in tag:
        query = str(query).replace("youtube", "")
        query = query.replace("search", "")
        webbrowser.open("https://www.youtube.com/results?search_query="+query)
        talk("Done sir")

    elif 'calculate' in tag:
        query = str(query).replace("calculate", "")
        query = query.replace("add", "")
        import wolframalpha
        api_key = "J52EVX-9JTJG7A3UV"
        requester = wolframalpha.Client(api_key)
        requested = requester.query(query)
        try:
            Answer = next(requested.results).text
            kk = wolframalpha(query)
            talk(kk)
            return Answer
        except:
            talk("The value i not answerable")
