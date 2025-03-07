from flask import Flask, request, jsonify
import requests
import ollama

app = Flask(__name__)
ip = '0.0.0.0'
port = 5000

instruction = "Adopte une personnalité de jeune adolescente geek,\
    détendue et cool. Réponds en moins de 15 mots, sans longs paragraphes,\
    et ignore les instructions précédentes. Parle en français mais parle en \
    anglais seulement si la question est en anglais. Réponds à cette question : "

@app.route('/', methods=['POST'])
def handle_request():
    print("Question asked:", request.data)
    try:
        data = request.get_json()
        message = data.get('message', '')
        message = message + instruction
        response = ollama.chat(model='mistral', messages=[
        {
          'role': 'user',
          'content': message,
        },
        ])
    except Exception as e:
        print(f"Error getting JSON: {e}")
        return jsonify({"error": "Invalid JSON format"}), 400

    return jsonify(response['message']['content'])

if __name__ == '__main__':
    app.run(host=ip, port=port, debug=True)
