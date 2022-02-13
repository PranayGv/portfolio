import json
import torch
from Talk import talk
from Brain import NeuralNet
from NeuralNetwork import bag_of_words, tokenize
import os


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
with open("intents.json", "r") as json_data:
    intents = json.load(json_data)

Name = 'test'
FILE = "TrainData.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()
# ____________________________________________________________


def Main():
    from Listen import Listen
    from Task import NonInputExecution
    from Task import InputExecution
    sentence = Listen()
    result = str(sentence)

    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)

    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    probs = probs[0][predicted.item()]

    if probs.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                import random
                reply = random.choice(intent["responses"])

                if "time" in reply:
                    NonInputExecution(reply)
                elif 'date' in reply:
                    NonInputExecution(reply)
                elif 'day' in reply:
                    NonInputExecution(reply)
                elif 'opengoogle' in reply:
                    NonInputExecution(reply)
                elif 'openyoutube' in reply:
                    NonInputExecution(reply)
                elif 'joke' in reply:
                    NonInputExecution(reply)
                elif 'fact' in reply:
                    NonInputExecution(reply)
                elif 'openinstagram' in reply:
                    NonInputExecution(reply)
                elif 'cmd' in reply:
                    NonInputExecution(reply)
                elif 'closeapp' in reply:
                    NonInputExecution(reply)
                elif 'flipacoin' in reply:
                    NonInputExecution(reply)
                elif 'discord' in reply:
                    NonInputExecution(reply)
                elif 'calculator' in reply:
                    NonInputExecution(reply)
                elif 'camera' in reply:
                    NonInputExecution(reply)
                elif 'internetspeed' in reply:
                    NonInputExecution(reply)
                elif 'news' in reply:
                    NonInputExecution(reply)
                elif 'switchtab' in reply:
                    NonInputExecution(reply)

                elif 'wikipedia' in reply:
                    InputExecution(reply, result)
                elif 'youtube' in reply:
                    InputExecution(reply, result)
                elif 'weather' in reply:
                    InputExecution(reply, result)

                else:
                    try:
                        talk(reply)
                    except:
                        import pywhatkit
                        pywhatkit.search(reply)
                        talk("cant find the answer sir, searching on google")

talk("checking if you are wearing mask")
os.startfile(r"C:\Users\venka\Documents\Projects\Python\AIchatbot\Face_Mask_Detection\main.py")
talk('BOT ONLINE!')
while True:
    Main()
