#!/bin/bash

# Print banner
echo "============================================"
echo "          Excel Generator Script            "
echo "============================================"
echo

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python3 is required but not installed."
    echo "Please install Python3 and try again."
    exit 1
fi

# Create a virtual environment if it doesn't exist
VENV_DIR="$HOME/.excel_generator_venv"
if [ ! -d "$VENV_DIR" ]; then
    echo "🔧 Creating virtual environment..."
    python3 -m venv "$VENV_DIR"
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"

echo "🔍 Checking required packages..."
# Install required Python packages in the virtual environment
pip install --upgrade pip --quiet
pip install pandas openpyxl Faker --quiet

echo "✅ All requirements met!"
echo

# Create a temporary Python script
TMP_SCRIPT=$(mktemp)
cat > "$TMP_SCRIPT" << 'END_PYTHON'
import pandas as pd
from faker import Faker
import sys
import os

fake = Faker()

# Function to generate fake data based on column name
def generate_fake_data(column_name, num_rows):
    column_name = column_name.lower().strip()
    
    # Map common column names to Faker providers
    if 'name' in column_name:
        return [fake.name() for _ in range(num_rows)]
    elif 'email' in column_name:
        return [fake.email() for _ in range(num_rows)]
    elif 'phone' in column_name:
        return [fake.phone_number() for _ in range(num_rows)]
    elif 'address' in column_name:
        return [fake.address().replace('\n', ', ') for _ in range(num_rows)]
    elif 'company' in column_name:
        return [fake.company() for _ in range(num_rows)]
    elif 'job' in column_name or 'position' in column_name:
        return [fake.job() for _ in range(num_rows)]
    elif 'date' in column_name:
        return [fake.date() for _ in range(num_rows)]
    elif 'amount' in column_name or 'price' in column_name:
        return [round(fake.random.uniform(100, 10000), 2) for _ in range(num_rows)]
    elif 'age' in column_name:
        return [fake.random_int(min=18, max=80) for _ in range(num_rows)]
    elif 'city' in column_name:
        return [fake.city() for _ in range(num_rows)]
    elif 'country' in column_name:
        return [fake.country() for _ in range(num_rows)]
    elif 'department' in column_name:
        return [fake.random_element(['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations']) for _ in range(num_rows)]
    else:
        # Default to random words if column type is not recognized
        return [fake.word().capitalize() for _ in range(num_rows)]

def get_valid_folder():
    import os
    while True:
        try:
            folder_path = input("\n📁 Enter the output folder path (press Enter for current directory): ").strip()
            
            # Use current directory if no input
            if not folder_path:
                return os.getcwd()
                
            # Convert to absolute path
            folder_path = os.path.abspath(os.path.expanduser(folder_path))
            
            # Check if path exists
            if os.path.exists(folder_path):
                if os.path.isdir(folder_path):
                    # Check if we have write permission
                    if os.access(folder_path, os.W_OK):
                        return folder_path
                    print("❌ You don't have permission to write to this folder!")
                else:
                    print("❌ This is not a folder!")
            else:
                try:
                    create = input(f"📁 Folder doesn't exist. Create it? (y/n): ").lower().strip()
                    if create == 'y':
                        try:
                            os.makedirs(folder_path)
                            return folder_path
                        except Exception as e:
                            print(f"❌ Couldn't create folder: {str(e)}")
                    else:
                        print("Please specify a different folder path.")
                except EOFError:
                    print("\n❌ Input was interrupted. Please try again.")
                    continue
        except EOFError:
            print("\n❌ Input was interrupted. Please try again.")
            continue

def get_valid_filename():
    while True:
        file_name = input("\n📝 Enter the name for your Excel file (without .xlsx): ").strip()
        if file_name:
            if not any(char in r'\/:*?"<>|' for char in file_name):
                return file_name
            print("❌ Invalid filename! Please avoid using these characters: \\ / : * ? \" < > |")
        else:
            print("❌ Filename cannot be empty!")

def get_valid_number(prompt, min_value=1, max_value=1000000):
    while True:
        try:
            value = int(input(prompt))
            if min_value <= value <= max_value:
                return value
            print(f"❌ Please enter a number between {min_value} and {max_value}")
        except ValueError:
            print("❌ Please enter a valid number!")

def get_column_names(num_cols):
    while True:
        print(f"\n📊 Enter {num_cols} column names (comma-separated)")
        print("Example: name, email, age, department")
        column_names = input("Column names: ").strip()
        
        # Process column names
        columns = [col.strip() for col in column_names.split(',') if col.strip()]
        
        if len(columns) == num_cols:
            return columns
        print(f"❌ You provided {len(columns)} column names, but {num_cols} are needed!")

def main():
    try:
        print("\n🚀 Let's generate your Excel file!")
        print("-----------------------------------")
        
        # Get output folder
        output_folder = get_valid_folder()
        
        # Get file name
        file_name = get_valid_filename()
        
        # Get number of rows
        num_rows = get_valid_number("\n📈 How many rows of data do you need? ", 1, 1000000)
        
        # Get number of columns
        num_cols = get_valid_number("\n📊 How many columns do you need? ", 1, 100)
        
        # Get column names
        columns = get_column_names(num_cols)

        print("\n🔄 Generating your Excel file...")
        
        # Validate input
        if len(columns) != num_cols:
            print(f"Error: You specified {num_cols} columns but provided {len(columns)} column names.")
            sys.exit(1)
            
        # Generate data
        data = {}
        for column in columns:
            data[column] = generate_fake_data(column, num_rows)
            
        # Create DataFrame and save to Excel
        df = pd.DataFrame(data)
        output_file = os.path.join(output_folder, f"{file_name}.xlsx")
        df.to_excel(output_file, index=False)
        
        print("\n✅ Success! Your Excel file has been generated!")
        print(f"📊 File: {output_file}")
        print(f"📁 Folder: {output_folder}")
        print(f"📈 Rows: {num_rows}")
        print(f"📑 Columns: {len(columns)}")
        print("\nYour file is ready to use! 🎉")
        
    except ValueError as e:
        print("\n❌ Error: Please enter valid numbers for rows and columns.")
    except Exception as e:
        print(f"\n❌ An error occurred: {str(e)}")
        print("Please try again!")

if __name__ == "__main__":
    main()
END_PYTHON

# Run the Python script
python3 "$TMP_SCRIPT"

# Clean up
rm "$TMP_SCRIPT"

# Deactivate virtual environment
deactivate
