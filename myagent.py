import requests
from PIL import Image
from io import BytesIO
import openai
from langchain.llms import OpenAI
from langchain.agents import initialize_agent, load_tools, Tool
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.tools import DuckDuckGoSearchRun
import config

# Define and initialize your OpenAI API key (for both text and image generation)
openai_api_key = config.API_KEY_1

# Initialize the OpenAI model for text generation
llm = OpenAI(
    openai_api_key=openai_api_key,
    temperature=0.8,
    model_name="text-davinci-003"
)

# Define the digital art director prompt for text generation
text_prompt = PromptTemplate(
    input_variables=["theme"],
    template="You are a digital art director. Develop a digital art style inspired by the theme: {theme}."
)
# Create an instance of the language model chain for text generation
text_llm_chain = LLMChain(llm=llm, prompt=text_prompt)

# Generate descriptive text output
theme = text_llm_chain.run("Create a digital art style inspired by the theme: '90s cartoon'.")
print(theme)



openai.api_key = config.API_KEY_2

# Define the generate_image function
def generate_image(theme):
    response = openai.Image.create(
        prompt=f"Generate an image of a {theme}",
        n=1,
        size="256x256"
    )

    image_url = response['data'][0]['url']
    return image_url

# Call the generate_image function for image generation
image_url = generate_image(theme)

# Get the image content from the URL
image_response = requests.get(image_url)
image_bytes = BytesIO(image_response.content)


# Open and display the image using Pillow (PIL)
image = Image.open(image_bytes)
image.show()
