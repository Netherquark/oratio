---
viewer: false
license: other
license_name: krutrim-community-license-agreement-version-1.0
license_link: LICENSE.md
extra_gated_heading: Acknowledge license to accept the repository
extra_gated_button_content: Acknowledge license
language:
- kn
- ta
- te
- hi
- ml
- mr
- gu
- en
- bn
tags:
- translation
- multilingual
- machine translation
datasets:
- IN22-Gen
- IN22-Conv
metrics:
- bleu
- chrf
- chrf++
pipeline_tag: text2text-generation
---


# Krutrim-Translate
[![Static Badge](https://img.shields.io/badge/Huggingface-Krutrim_Translate-yellow?logo=huggingface)](https://huggingface.co/krutrim-ai-labs/KrutrimTranslate)	[![Static Badge](https://img.shields.io/badge/Github-Krutrim_Translate-green?logo=github)](https://github.com/ola-krutrim/KrutrimTranslate)	[![Static Badge](https://img.shields.io/badge/Krutrim_Cloud-Krutrim_Translate-orange?logo=data:image/png%2bxml;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADpUlEQVRYCbVXTUhbQRDeRJqi2JSS1BQtgpCa0kiPehdNi6dWbfWgF0s9eGtPFSFG8VDMpSiCB28KQou0NwsS9NA/Dx4qNP1TUIqSmlKSFjQx4vabbXbJz8vLe2kz8GX3zc7MN2/2J/sszLichekN4A7gBZxpcLQ/0gijfQq8BFLAf5ELiBIEfgNEZgSxtA/5liw2eD4EfgJGSLVsyPcBQLFMiR3WIUAraCm6F4hFMQ2JB1afgFKI9Hw+IubVYhnQwvpSBnKZ2GfEvlgoiTMYeFNGcpnEK3AQV548gkYalbslLiGWdEtl2QbOpZ9FMzg4yGprazNVpvrr6+tseXlZy+cXlFeAAzk4i07eW29sbPB/kampqbyYGTzEyagC5wHKJG+v6lWgqamJdXV1wY2xhYUFtr1NBcwWnQqQYRJwUQK3gOeArjidTkakJMfHx6y+vp4tLi6KZ5/Px1ZWVkTf5M9tstcsP/SifFarlQcCAX50dKRm4/T0lPf19ann9vZ2Xl1dzZubm3lVVZVe2XPHxDS8k2Ra7fj4uCKSnUgkwnt7e+Uj393d5ZQUSSqV4sFgMJeo0DNxsx0tYtLR2x8eHorA4XCY19TUqECZCZAB1gDf398XtvTT0dGhbAvFh37Hip9LgKbYbDZWWVkpxtbW1tjBgdo1rKGhQegTiQQbHR1lbreb9fT0qDgtLS2qr9MR3AkYFMyW3pwkGo3yzs5OPjAwwFdXV4WOfra2tpSv3W5X+snJSaXXiU/chaeAHLu7u1VQrQ6VXhJgWyqT/v5+pZfjGu0OdEx3EZJTW1sbX1pa4pgGgZmZGT40NCTIMisgDy5MC3c4HEYSEItwlkjMQi7Cvb095etyufjc3ByfmJhQuiJxiVscREYdlN3w8DA/OTnhsVhM6YqQadndpAToKNZdiLmBvV4vTyaTYgo2Nze5xWLRCl5MR0exOv5NTcPY2Jiaf2zTYkSFxkX56RwgCQBUBUNSUVEh7OicoP3e2trKpqenGf1fGBTi8ufaPoGiULZZ+sbGRh6Px9WWk52RkZEsO514j3PJ6Zlure8BQ0E8Hg+fn58X2zIUCnG/38/r6uqM+L4Fx9/jFZ1cuQzFN8BIoFJsviJ20Xm6DqN4GZKIIqYbMCQOWL0GSnlLLR+6rVBMU0I75B4QAbSCGtF9h+99QO42dM0L3ZRp1Zr9OCWfrFu2FrW8lmuN5erOQuED7gLXAPl5TjHk5/kH9J8BdBc39Hn+BxqB1clokCTRAAAAAElFTkSuQmCC)](https://cloud.olakrutrim.com/console/inference-service?section=models&modelName=Krutrim&artifactName=Krutrim-translation&artifactType=model)	[![Static Badge](https://img.shields.io/badge/Krutrim_AI_Labs-Krutrim_Translate-blue?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiByeD0iMTgiIGZpbGw9IiMxMEE1NTQiLz4KPHBhdGggZD0iTTI2LjQxNCAxMi41OTE5SDE5LjMzVjE1LjY0OTlDMjAuMDM0IDE1LjIzOTIgMjAuODQwNyAxNS4wMzM5IDIxLjc1IDE1LjAzMzlDMjIuNzkxMyAxNS4wMzM5IDIzLjY0MiAxNS4zNTY1IDI0LjMwMiAxNi4wMDE5QzI0Ljk3NjcgMTYuNjQ3MiAyNS4zMTQgMTcuNTQxOSAyNS4zMTQgMTguNjg1OUMyNS4zMTQgMTkuMzMxMiAyNS4xODkzIDIwLjA0OTkgMjQuOTQgMjAuODQxOUMyNC43MDUzIDIxLjYzMzkgMjQuMzE2NyAyMi40NDA1IDIzLjc3NCAyMy4yNjE5TDIxLjIgMjEuODMxOUMyMS41MzczIDIxLjM3NzIgMjEuODE2IDIwLjkwNzkgMjIuMDM2IDIwLjQyMzlDMjIuMjU2IDE5LjkzOTkgMjIuMzY2IDE5LjQ0MTIgMjIuMzY2IDE4LjkyNzlDMjIuMzY2IDE4LjM4NTIgMjIuMjQ4NyAxOC4wMDM5IDIyLjAxNCAxNy43ODM5QzIxLjc5NCAxNy41NjM5IDIxLjUwMDcgMTcuNDUzOSAyMS4xMzQgMTcuNDUzOUMyMC43OTY3IDE3LjQ1MzkgMjAuMTQ0IDE3Ljc2MTkgMjAuMTQ0IDE3Ljc2MTlDMjAuMTQ0IDE3Ljc2MTkgMTkuMTE0NyAxOC4xODcyIDE4Ljg4IDE4LjQyMTlWMjMuODU1OUgxNi4zODJWMjEuMDYxOUMxNS44OTggMjEuMzQwNSAxNS40MDY3IDIxLjU1MzIgMTQuOTA4IDIxLjY5OTlDMTQuNDI0IDIxLjg0NjUgMTMuODU5MyAyMS45MTk5IDEzLjIxNCAyMS45MTk5QzEyLjQwNzMgMjEuOTE5OSAxMS42NjY3IDIxLjc3MzIgMTAuOTkyIDIxLjQ3OTlDMTAuMzMyIDIxLjE3MTkgOS44MDQgMjAuNzI0NSA5LjQwOCAyMC4xMzc5QzkuMDEyIDE5LjU1MTIgOC44MTQgMTguODE3OSA4LjgxNCAxNy45Mzc5QzguODE0IDE3LjExNjUgOS4wMTIgMTYuNDEyNSA5LjQwOCAxNS44MjU5QzkuODA0IDE1LjIyNDUgMTAuMzU0IDE0Ljc2MjUgMTEuMDU4IDE0LjQzOTlDMTEuNzYyIDE0LjEwMjUgMTIuNTc2IDEzLjkzMzkgMTMuNSAxMy45MzM5QzEzLjkxMDcgMTMuOTMzOSAxNC4zMjEzIDEzLjk0ODUgMTQuNzMyIDEzLjk3NzlDMTUuMTU3MyAxNC4wMDcyIDE1LjQ4NzMgMTQuMDU4NSAxNS43MjIgMTQuMTMxOUwxNS41MDIgMTYuNTczOUMxNS4wMzI3IDE2LjQ1NjUgMTQuNTEyIDE2LjM5NzkgMTMuOTQgMTYuMzk3OUMxMy4yNTA3IDE2LjM5NzkgMTIuNzE1MyAxNi41MzcyIDEyLjMzNCAxNi44MTU5QzExLjk1MjcgMTcuMDc5OSAxMS43NjIgMTcuNDUzOSAxMS43NjIgMTcuOTM3OUMxMS43NjIgMTguNTI0NSAxMS45NDUzIDE4LjkyNzkgMTIuMzEyIDE5LjE0NzlDMTIuNjc4NyAxOS4zNjc5IDEzLjA3NDcgMTkuNDc3OSAxMy41IDE5LjQ3NzlDMTQuMTE2IDE5LjQ3NzkgMTQuNjU4NyAxOS4zMzg1IDE1LjEyOCAxOS4wNTk5QzE1LjYxMiAxOC43ODEyIDE2LjAzIDE4LjQ1ODUgMTYuMzgyIDE4LjA5MTlWMTIuNTkxOUg4VjEwLjE3MTlIMjYuNDE0VjEyLjU5MTlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjIuMDc0IDI4Ljk4MTlDMjEuNjkyNyAyOS4xNzI1IDIxLjIzOCAyOS4zNDg1IDIwLjcxIDI5LjUwOTlDMjAuMTY3MyAyOS42NzEyIDE5LjUyMiAyOS43NTE5IDE4Ljc3NCAyOS43NTE5QzE4LjA0MDcgMjkuNzUxOSAxNy4zODggMjkuNjEyNSAxNi44MTYgMjkuMzMzOUMxNi4yNDQgMjkuMDY5OSAxNS43OTY3IDI4LjY5NTkgMTUuNDc0IDI4LjIxMTlDMTUuMTM2NyAyNy43NDI1IDE0Ljk2OCAyNy4xOTI1IDE0Ljk2OCAyNi41NjE5QzE0Ljk2OCAyNS41MDU5IDE1LjM0MiAyNC42NjI1IDE2LjA5IDI0LjAzMTlDMTYuODIzMyAyMy40MTU5IDE3LjQyOTMgMjMuMDYzOSAxOC44MDggMjIuOTc1OUwxOS4wNzIgMjUuMjQxOUMxOC4zMjQgMjUuMjg1OSAxOC4yNjA3IDI1LjQyNTIgMTcuOTgyIDI1LjY1OTlDMTcuNzAzMyAyNS45MDkyIDE3LjU2NCAyNi4xOTUyIDE3LjU2NCAyNi41MTc5QzE3LjU2NCAyNy4xOTI1IDE4LjAxMTMgMjcuNTI5OSAxOC45MDYgMjcuNTI5OUMxOS4yNDMzIDI3LjUyOTkgMTkuNTg4IDI3LjQ3ODUgMTkuOTQgMjcuMzc1OUMyMC4yOTIgMjcuMjczMiAyMC43MTczIDI3LjA5NzIgMjEuMjE2IDI2Ljg0NzlMMjIuMDc0IDI4Ljk4MTlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)](https://ai-labs.olakrutrim.com/models/Krutrim-Translate)

## Introduction 
The Krutrim-Translate model translates the input text into one of the chosen Indic languages. To build Krutrim translate, we increased the context length of the popular IndicTrans2 translation model, extending it from 256 to 4096. For training, we leveraged the Bharat Parallel Corpus Collection (BPCC) while also augmenting it with our own data to enhance performance.

Furthermore, to improve latency, we explored various architectures for both training and distillation. We are open-sourcing the distilled version with 6 encoder and 3 decoder layers, supporting translation in both directions: English to Indic and Indic to English. This architecture achieves at least a 4x reduction in latency compared to both the original IndicTrans2 and the distilled IndicTrans2 models, with minimal decline in performance.

The following is the list of languages supported by our model: English, Bengali, Hindi, Kannada, Marathi, Malayalam, Gujarati, Telugu, Punjabi and Tamil.

## Key Features
- Long context: up to 4096 tokens
- Fast latency: 4X better than IndicTrans2 distilled models


## Model Summary
Krutrim translation model is a transformer based sequence to sequence model, with six encoders and three decoders. The training process was conducted in four stages:

Stage 1 – Initial training on a large transformer model (18 encoder and decoder layers)\
Stage 2 – Fine-tuning the large transformer model\
Stage 3 – Back translation on large transformer model\
Stage 4 – Distillation of the large transformer model obtained in Stage 3

## Evaluation Results

As we benchmarked our model against IndicTrans2, we evaluated its performance using the IN22-gen and IN22-conv datasets. The IndicTrans2 results were sourced from their research paper. Below, we present a comparison of the CHRF++ scores achieved by both models.

### IN22-gen
**English to Indic**
| Language   | Krutrim |
|------------|---------|
| Bengali    |    50   |
| Hindi      |    54.4 |
| Kannada    |    47.9 |   
| Marathi    |    48.9 |
| Malayalam  |    49.3 |
| Gujarati   |    51.4 |
| Punjabi    |    50.2 |
| Telugu     |    50   |
| Tamil      |    48.3 |

**Indic to English**
| Language   | Krutrim |
|------------|---------|
| Bengali    |  60.8   |
| Hindi      |  62     |
| Kannada    |  58.4   |
| Marathi    |  60.7   |
| Malayalam  |  57.8   |
| Gujarati   |  57.7   |
| Punjabi    |  58.1   |
| Telugu     |  60.4   |
| Tamil      |  56.9   |

### IN22-conv
**English to Indic**

| Language   | Krutrim |
|------------|---------|
| Bengali    |    49.2 |
| Hindi      |    49.2 |
| Kannada    |    33.4 |   
| Marathi    |    47.2 |
| Malayalam  |    44.7 |
| Gujarati   |    51.8 |
| Punjabi    |    56.7 |
| Telugu     |    44.6 |
| Tamil      |    38.7 |

**Indic to English**
| Language   | Krutrim |
|------------|---------|
| Bengali    |  58.3   |
| Hindi      |  59.0   |
| Kannada    |  47.3   |
| Marathi    |  58.0   |
| Malayalam  |  53.7   |
| Gujarati   |  60.6   |
| Punjabi    |  60.8   |
| Telugu     |  52.0   |
| Tamil      |  45.6   |


## Installation Instructions
Huggingface: https://huggingface.co/krutrim-ai-labs/Krutrim-Translate 
Github: https://github.com/ola-krutrim/KrutrimTranslate 
Krutrim Cloud API access: 

Note: Make sure you have logged into Huggingface using your huggingface token.

1. **Set up the environment**  
   Install the necessary dependencies:  
   ```bash
   source install.sh
   ```

2. **Download model weights**  
   Run the following script to download the required model weights: 
   ```bash
   source static_data_builder.sh
   ```

3. **Usage**\
   Follow `example.ipynb` to run inference using ctranslate2 model.


## License
This code repository and the model weights are licensed under the [Krutrim Community License.](LICENSE.md)

## Contact
Contributions are welcome! If you have any improvements or suggestions, feel free to submit a pull request on GitHub.

## Citation
```
@misc{KrutrimTranslate2025,
  author = {Kushagra Srivastava, Mohd Zaid, Pidathala Sowjanya, Sharath Adavanne},
  title = {Krutrim Translate},
  year = {2025},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/ola-krutrim/KrutrimTranslate}}
}
```