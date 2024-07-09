import base64
import matplotlib
matplotlib.use('Agg')  # Use the 'Agg' backend which does not require a GUI
import matplotlib.pyplot as plt
import io
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import pandas as pd
from sklearn.exceptions import InconsistentVersionWarning
import pickle
import warnings
import json
import requests

warnings.simplefilter("ignore", InconsistentVersionWarning) 

app = Flask(__name__)
CORS(app)  


RF_model = joblib.load('crop.joblib')
lg_model = joblib.load('logistic_regression_model.joblib')

# Load the dataset
df = pd.read_csv('Crop_recommendation.csv')
desired = pd.read_csv('Crop_NPK.csv')
crop_summary = pd.pivot_table(df, index=['label'], aggfunc='mean')

with open('description.json', 'r') as file:
    fertilizer_dict = json.load(file)
# Define the prediction endpoint
@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    try:
        # Get the input data from the request
        input_data = np.array(request.json['data']).reshape(1, -1)
        
        # Make predictions using the loaded model
        prediction = RF_model.predict(input_data)
        # Get the predicted crop name
        predicted_crop = prediction[0]
       
        
        # Filter the dataframe for the predicted crop
        crop_data = desired[desired['Crop'] == predicted_crop]
       
#             # Calculate the differences
        if not crop_data.empty:
            n_diff = crop_data['N'].values[0] - input_data[0][0]
            p_diff = crop_data['P'].values[0] - input_data[0][1]
            k_diff = crop_data['K'].values[0] - input_data[0][2]

#             # Generate keys based on the differences
        key1 = "NHigh" if n_diff < 0 else ("Nlow" if n_diff > 0 else "NNo")
        key2 = "PHigh" if p_diff < 0 else ("Plow" if p_diff > 0 else "PNo")
        key3 = "KHigh" if k_diff < 0 else ("Klow" if k_diff > 0 else "KNo")
       
                    # Get the descriptive data for the keys
        n_desc = fertilizer_dict.get(key1, "")
        p_desc = fertilizer_dict.get(key2, "")
        k_desc = fertilizer_dict.get(key3, "")
      
        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction.tolist(), 'n_desc' : n_desc, 'p_desc' : p_desc, 'k_desc' : k_desc}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500




@app.route('/ratinggraph', methods=['GET'])
def rating_graph():
    # Send a GET request to the API
    response = requests.get('http://127.0.0.1:3000/api/v1/reviews')

    # Check if the request was successful
    if response.status_code == 200:
        
        data = response.json()
        
        
        reviews_data = data['data']['data']
        
        # Lists to store extracted data
        cropnames = []
        ratings = []
        
    
        for review in reviews_data:
            cropnames.append(review['crop']['name'])
            ratings.append(review['rating'])
        
        # Create DataFrame
        df = pd.DataFrame({
            'Crop Name': cropnames,
            'Rating': ratings
        })
        
        # Calculate statistics
        rating_stats = df.groupby('Crop Name').agg({'Rating': ['count', 'mean']}).reset_index()
        rating_stats.columns = ['Crop Name', 'Number of Ratings', 'Average Rating']
        
        # Plotting
        fig, ax = plt.subplots()  # Remove figsize here

        # Set the positions for the bars
        bar_width = 0.35
        index = rating_stats.index

        # Plotting the bars
        ax.bar(index, rating_stats['Number of Ratings'], bar_width, label='Number of Ratings')
        ax.bar(index + bar_width, rating_stats['Average Rating'], bar_width, label='Average Rating')

        # Adding labels and title
        ax.set_xlabel('Crop Name')
        ax.set_ylabel('Count / Rating')
        ax.set_title('Number of Ratings and Average Rating for Each Crop')
        ax.set_xticks(index + bar_width / 2)
        ax.set_xticklabels(rating_stats['Crop Name'], rotation=90)
        ax.legend()

        # Adjust layout padding to ensure all labels are visible
        plt.tight_layout()

        # Increase the figure size before saving
        fig.set_size_inches(16, 8)  # Set the desired figure size

        # Save the plot to a bytes buffer
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        plt.close()

        # Encode the plot as base64
        plot_data = base64.b64encode(buffer.getvalue()).decode('utf-8')

        return jsonify({'plot_data': plot_data})
    else:
        return jsonify({'message': 'Failed to fetch data from the API.'})
@app.route('/singlecrop', methods=['POST'])
def single_crop():
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

@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        # Get the input data from the request
        input_data = np.array(request.json['data']).reshape(1, -1)
        
        # Make predictions using the loaded model
        prediction = lg_model.predict(input_data)
        
        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction.tolist()}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500


@app.route('/ratings', methods=['GET'])
def get_ratings():
    # Send a GET request to the API
    response = requests.get('http://127.0.0.1:3000/api/v1/bookings/getallbooking')

    # Check if the request was successful
    if response.status_code == 200:
        # Convert the JSON response to a Python dictionary
        data = response.json()
        
        # Extract the 'data' field from the response
        booking_data = data['data']['data']
        
        # Initialize empty lists to store data
        crop_names = []
        created_at = []
        prices = []
        
        # Iterate over each booking record and extract the desired fields
        for booking in booking_data:
            crop_names.append(booking['crop']['name'])
            created_at.append(booking['createdAt'])
            prices.append(booking['price'])
        
        # Create DataFrame from the extracted data
        data = pd.DataFrame({
            'Crop Name': crop_names,
            'Created At': created_at,
            'Price': prices
        })
        
        # Group the data by crop name and calculate the total price for each crop
        crop_prices = data.groupby('Crop Name')['Price'].sum().reset_index()
        
 
        
        # Plotting the pie chart
        plt.figure(figsize=(8, 8))
        plt.pie(crop_prices['Price'], labels=crop_prices['Crop Name'], autopct='%1.1f%%', startangle=140)
        plt.axis('equal')
        plt.title('Distribution of Total Price Among Crops')
        plt.tight_layout()
        pie_chart_img = io.BytesIO()
        plt.savefig(pie_chart_img, format='png')
        pie_chart_img.seek(0)
        pie_chart_base64 = base64.b64encode(pie_chart_img.read()).decode('utf-8')
        plt.close()

        # Return the base64 encoded images along with the data
        return jsonify({
            'data': data.to_dict(orient='records'),
            
            'pie_chart': pie_chart_base64
        })
    else:
        return jsonify({'message': 'Failed to fetch data from the API.'})
# Define the chart generation endpoint
@app.route('/get_chart')
def get_chart():
    labels = ['Nitrogen(N)', 'Phosphorous(P)', 'Potash(K)']
    specs = [[{'type': 'domain'}, {'type': 'domain'}, {'type': 'domain'}, {'type': 'domain'}, {'type': 'domain'}],
             [{'type': 'domain'}, {'type': 'domain'}, {'type': 'domain'}, {'type': 'domain'}, {'type': 'domain'}]]
    fig = make_subplots(rows=2, cols=5, specs=specs)
    cafe_colors =  ['#1f77b4', '#ff7f0e', '#2ca02c'] 

    for i, crop in enumerate(['apple', 'banana', 'grapes', 'orange', 'mango', 'coconut', 'papaya', 'pomegranate', 'watermelon', 'muskmelon']):
        crop_npk = crop_summary[crop_summary.index == crop]
        values = [crop_npk['N'][0], crop_npk['P'][0], crop_npk['K'][0]]
        fig.add_trace(go.Pie(labels=labels, values=values, name=crop.capitalize(), marker_colors=cafe_colors), i // 5 + 1, i % 5 + 1)

    fig.update_layout(
        title_text="NPK ratio for fruits",
        annotations=[dict(text=crop.capitalize(), x=0.06 + i % 5 * 0.24, y=1.08 - i // 5 * 0.62, font_size=15, showarrow=False) for i, crop in enumerate(['apple', 'banana', 'grapes', 'orange', 'mango', 'coconut', 'papaya', 'pomegranate', 'watermelon', 'muskmelon'])],
        width=1600,  
        height=800   
    )

    img = io.BytesIO()
    fig.write_image(img, format='png', scale=2)  
    img.seek(0)

    base64_img = base64.b64encode(img.read()).decode('utf-8')

    plt.close()

    return jsonify({'image': base64_img})

@app.route('/popular')
def popular():

    response = requests.get('http://127.0.0.1:3000/api/v1/reviews')


    if response.status_code == 200:

        data = response.json()

  
        reviews_data = data['data']['data']


        usernames = []
        cropnames = []
        reviews = []
        ratings = []


        for review in reviews_data:
            cropnames.append(review['crop']['name'])
            usernames.append(review['user']['name'])
            reviews.append(review['review'])
            ratings.append(review['rating'])

        # Create DataFrame
        df = pd.DataFrame({
            'Crop Name': cropnames,
            'User Name': usernames,
            'Review': reviews,
            'Rating': ratings
        })

        # Grouping the data by crop name and calculating the count of ratings and average rating
        rating_stats = df.groupby('Crop Name').agg({'Rating': ['count', 'mean']}).reset_index()
        rating_stats.columns = ['Crop Name', 'Number of Ratings', 'Average Rating']

        # Calculating a combined popularity score based on both number of ratings and average rating
        rating_stats['Popularity Score'] = rating_stats['Number of Ratings'] * rating_stats['Average Rating']

        # Sorting crops based on the popularity score in descending order
        rating_stats = rating_stats.sort_values(by='Popularity Score', ascending=False)

        # Plotting
        plt.figure(figsize=(10, 8))
        bars = plt.barh(rating_stats['Crop Name'], rating_stats['Popularity Score'], color='skyblue', alpha=0.7)

        # Adding popularity score as text on each bar
        for i, bar in enumerate(bars):
            plt.text(bar.get_width() + 0.2, bar.get_y() + bar.get_height()/2, 
                     f"{rating_stats['Popularity Score'].iloc[i]:.2f}", 
                     va='center', ha='left', color='black')

        # Customizing the plot
        plt.xlabel('Popularity Score')
        plt.ylabel('Crop Name')
        plt.title('Most Popular Crops Based on Popularity Score')
        plt.grid(axis='x', linestyle='--', alpha=0.7)

        # Adding rank numbers beside each bar
        for i, bar in enumerate(bars):
            plt.text(5, i, f"{i+1}.", va='center', ha='center', color='black', fontweight='bold')

        plt.tight_layout()

        # Save the plot to a bytes buffer
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        plt.close()

        # Encode the plot as base64
        plot_data = base64.b64encode(buffer.getvalue()).decode('utf-8')

        # Return the plot as an image
        return jsonify({
            'pie_chart': plot_data
        })

    else:
        return jsonify({'message': 'Failed to fetch data from the API.'})



if __name__ == '__main__':
    app.run(debug=True)
