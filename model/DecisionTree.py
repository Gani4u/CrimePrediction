import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.tree import plot_tree

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

# Create and train the Random Forest classifier with limited max_depth
param_grid = {
    'n_estimators': [50],
    'max_depth': [3],  # Limiting max_depth to focus on specific end nodes
    'min_samples_split': [2]
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

# Plot the first decision tree from the Random Forest
first_tree = best_rf_classifier.estimators_[0]
plt.figure(figsize=(30, 20))  # Increase figsize for better clarity
plot_tree(first_tree, feature_names=features, class_names=best_rf_classifier.classes_, filled=True, max_depth=3, fontsize=10)  # Adjust fontsize for better clarity
plt.savefig('decision_tree.png', dpi=300)  # Save the plot as a PNG file with higher resolution
plt.show()

