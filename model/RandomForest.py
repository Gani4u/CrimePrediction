import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import plotly.express as px

# Load the dataset
data = pd.read_csv('/home/zaheer/crimeBangalore/crime-map-app/model/BCS2.csv')

# Convert Date column to datetime
data['Date'] = pd.to_datetime(data['Date'], format='%d-%m-%Y')

# Extract relevant features (you can add more features if needed)
features = ['Year', 'Latitude', 'Longitude']
X = data[features]
y = data['Type']  # Assuming 'Type' is the column representing the crime type

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest classifier
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10]
}
rf_classifier = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf_classifier, param_grid, cv=5, n_jobs=-1)
grid_search.fit(X_train, y_train)
best_rf_classifier = grid_search.best_estimator_

# Make predictions
y_pred = best_rf_classifier.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Display classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Plot feature importance
feature_importance = best_rf_classifier.feature_importances_
feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': feature_importance})
fig = px.bar(feature_importance_df, x='Feature', y='Importance', title='Feature Importance')
fig.show()

# Plot confusion matrix
conf_mat = confusion_matrix(y_test, y_pred)
conf_mat_df = pd.DataFrame(conf_mat, index=best_rf_classifier.classes_, columns=best_rf_classifier.classes_)
fig = px.imshow(conf_mat_df, labels=dict(x="Predicted Label", y="True Label", color="Count"), 
                x=conf_mat_df.columns, y=conf_mat_df.index, title='Confusion Matrix')
fig.show()

