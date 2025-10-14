from flask import Flask, request, jsonify, render_template, url_for
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI
from openai import OpenAIError

dotenv_loaded = load_dotenv()  # Load environment variables from a .env file

print(f"\n--- App Startup Diagnostics ---")

# To use this application, you need to install the required packages.
# You can do this by running: pip install -r requirements.txt

app = Flask(__name__)
# Enable CORS to allow your frontend (running on a different port) to access the backend.
CORS(app)

# Load the Hugging Face API token from the environment.
HUGGING_FACE_API_TOKEN = os.getenv('HUGGING_FACE_API_TOKEN')

if dotenv_loaded:
    print("✅ .env file loaded successfully.")
else:
    print("⚠️  Could not find a .env file. Make sure it exists in the same directory as app.py.")

if not HUGGING_FACE_API_TOKEN:
    # This will stop the application from starting if the API key is not found.
    # It's better to fail early than to have errors during a request.
    raise ValueError("HUGGING_FACE_API_TOKEN not found. Please set it in your .env file.")
else:
    # Print a confirmation that the token was found, and show a redacted version for verification.
    token_preview = f"{HUGGING_FACE_API_TOKEN[:5]}...{HUGGING_FACE_API_TOKEN[-4:]}"
    print(f"✅ Hugging Face API token found. Preview: {token_preview}")

# Instantiate the Hugging Face InferenceClient
try:
    # Use the OpenAI library to connect to Hugging Face's OpenAI-compatible endpoint
    client = OpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=HUGGING_FACE_API_TOKEN,
    )
    print("✅ OpenAI client for Hugging Face initialized successfully.")
except Exception as e:
    print(f"❌ Failed to initialize OpenAI client: {e}")
    raise

# Configure the model for Question Answering.
# The user requested model. This is a powerful generative model.
MODEL_NAME = os.getenv('HUGGING_FACE_MODEL', 'm42-health/Llama3-Med42-70B:featherless-ai')
model_source = "from .env file" if os.getenv('HUGGING_FACE_MODEL') else "as default"
print(f"🤖 Question Answering Model set to: {MODEL_NAME} ({model_source})")
print(f"--- End Diagnostics ---\n")

@app.route('/')
def index():
    """
    Serves the main HTML page for the chat application.
    """
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """
    This endpoint receives a chat history and sends it to the
    Hugging Face Inference API for a chat completion, returning the AI's response.
    """
    try:
        data = request.get_json()
        # The frontend sends the entire conversation history
        messages_history = data.get('messages')

        if not messages_history:
            return jsonify({'error': 'The "messages" field is required.'}), 400

        # The system prompt defines the AI's persona and instructions.
        # It's prepended to the conversation history for the API call.
        system_prompt = {
            "role": "system",
            "content": "You are Health Buddy, a friendly and empathetic AI health assistant. Your primary goal is to provide helpful, safe, and general health-related information. You are NOT a medical doctor. You must NEVER provide a diagnosis or medical advice. Always end your responses by strongly advising the user to consult a qualified healthcare professional for any medical concerns or decisions."
        }

        # Combine the system prompt with the conversation history from the client
        messages_for_api = [system_prompt] + messages_history

        # Use the OpenAI-compatible client for chat completions
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages_for_api,
            stream=False,  # We want the full response at once
        )

        # Extract the AI's response content
        answer = completion.choices[0].message.content

        if answer is None or answer.strip() == "":
             return jsonify({'error': 'The model returned an empty answer.'}), 500

        # Return the answer in a structure the frontend expects
        return jsonify({'reply': answer}), 200

    except OpenAIError as e:
        # Handle specific errors from the OpenAI client (e.g., auth, model not found)
        error_message = str(e)
        status_code = e.status_code if hasattr(e, 'status_code') else 500
        print(f"Hugging Face API Error (via OpenAI client): {error_message}")
        return jsonify({'error': f'AI service error: {error_message}'}), status_code
    except Exception as e:
        # Catch any other unexpected errors
        print(f"An unexpected server error occurred: {e}")
        return jsonify({'error': 'An internal server error occurred.'}), 500

if __name__ == '__main__':
    # Run the Flask app
    # debug=True provides helpful error messages in the browser during development.
    app.run(host='127.0.0.1', port=5000, debug=True)
