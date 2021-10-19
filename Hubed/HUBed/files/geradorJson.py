import pandas as pd
from os import system

df = pd.read_csv("C:/Users/noteb/Documents/Stuff/Programação/HTML_CSS_JS/Formularios/HUBed/Bedwars_maps.csv")

def fazer_a_parada():
  with open('C:/Users/noteb/Documents/Stuff/Programação/HTML_CSS_JS/Formularios/HUBed/mapas_bed.txt', 'a+', encoding='Utf-8', newline='') as arquivo:
    for i in range(len(df)):
      arquivo.writelines(
        '{\n'
        f'  "id":"{i}",\n'
        f'  "label":"{df["Map_name"][i]}",\n'
        f'  "mode":"{df["Mode"][i]}",\n'
        f'  "direciton":"{df["Direction"][i]}",\n'
        f'  "blc_need":"{df["Blocks_needed"][i]}",\n'
        f'  "iron_gen":"{df["Iron_Gen"][i]}",\n'
        f'  "map_size":"{df["Map_Size"][i]}"\n'
        '},\n'
      )
  exit()

