from flask import Flask, request, redirect, jsonify
import requests

app = Flask(__name__)

CLIENT_ID = 'a4531c76a8014aa9be94d0ae414c930e'
CLIENT_SECRET = '342930b261d6450a84cb70d594d3f027'
REDIRECT_URI = 'http://localhost:5000'  # Update this with your redirect URI

# Endpoint to start the Spotify authorization process
@app.route('/authorize', methods=['GET'])
def authorize_spotify():
    auth_url = f'https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}&scope=user-read-private%20user-read-email&state=some-state'
    return redirect(auth_url)

# Callback endpoint to exchange authorization code for access token and refresh token
@app.route('/callback', methods=['GET'])
def callback():
    auth_code = request.args.get('code')
    if not auth_code:
        return "Authorization failed"

    # Exchange authorization code for access token and refresh token
    response = requests.post('https://accounts.spotify.com/api/token', 
        data={
            'grant_type': 'authorization_code',
            'code': auth_code,
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }
    )
    data = response.json()
    refresh_token = data.get('refresh_token')

    # TODO: Store the refresh token securely (e.g., in a database)
    print('Refresh token:', refresh_token)

    return jsonify({'message': 'Refresh token obtained and stored securely.'})

if __name__ == '__main__':
    app.run(port=5000)
