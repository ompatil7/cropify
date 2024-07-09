import joblib
import numpy as np
import warnings  # Import the warnings module
from flask import Flask, request, jsonify
from sklearn.exceptions import InconsistentVersionWarning
import pickle  # Import pickle module for loading the model

warnings.simplefilter("ignore", InconsistentVersionWarning)  # Ignore the warning

app = Flask(__name__)

# Load the trained Random Forest model
RF_model = joblib.load('crop.joblib')

# Define the prediction endpoint
@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    try:
        # Get the input data from the request
        input_data = np.array(request.json['data']).reshape(1, -1)
        
        # Make predictions using the loaded model
        prediction = RF_model.predict(input_data)
        
        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction.tolist()}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
