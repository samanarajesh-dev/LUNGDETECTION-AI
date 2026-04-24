import os
from datasets import load_dataset
import pandas as pd

def analyze_lung_cancer_data():
    print("🚀 Loading 'virtual10/lungs_cancer' dataset from Hugging Face...")
    try:
        # Load the dataset
        dataset = load_dataset("virtual10/lungs_cancer")
        
        # Convert to pandas for easier analysis
        df = pd.DataFrame(dataset['train'])
        
        print("\n✅ Dataset Loaded Successfully!")
        print(f"Total Records: {len(df)}")
        print("\n📊 Data Columns:")
        print(df.columns.tolist())
        
        print("\n📈 Sample Data (First 5 rows):")
        print(df.head())
        
        # Identify key features for AI Doctor integration
        if 'AGE' in df.columns and 'LUNG_CANCER' in df.columns:
            avg_age = df[df['LUNG_CANCER'] == 'YES']['AGE'].mean()
            print(f"\n💡 Insight: Average age of positive cases in this dataset is {avg_age:.1f}")
            
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")

if __name__ == "__main__":
    analyze_lung_cancer_data()
