# Excel Generator Script

An interactive script that generates Excel files with customizable fake data based on column names.

## Features

- 🎯 Interactive command-line interface
- 📊 Generates Excel files with customizable number of rows and columns
- 🔄 Auto-generates fake data based on column names
- 📁 Flexible output folder selection
- ✨ Smart data generation based on column names
- 🛡️ Input validation and error handling

## Prerequisites

- Python 3.x (with venv module)

The script will automatically:

1. Create a virtual environment in `~/.excel_generator_venv` (if it doesn't exist)
2. Install the following packages in the virtual environment:
   - pandas
   - openpyxl
   - Faker

No system-wide package installation is required!

## Usage

1. Make the script executable:

   ```bash
   chmod +x generate_excel.sh
   ```

2. Run the script:

   ```bash
   ./generate_excel.sh
   ```

3. Follow the interactive prompts:
   - Select output folder (press Enter for current directory)
   - Enter file name (without .xlsx extension)
   - Specify number of rows
   - Specify number of columns
   - Enter column names (comma-separated)

## Smart Data Generation

The script automatically generates appropriate fake data based on column names:

| If column name contains | Generated Data Type | Example |
|------------------------|---------------------|----------|
| name | Full Name | John Smith |
| email | Email Address | `john.doe[at]example.com` |
| phone | Phone Number | (555) 123-4567 |
| address | Street Address | 123 Main St, Apt 4B |
| company | Company Name | Acme Corporation |
| job, position | Job Title | Senior Developer |
| date | Date | 2025-08-22 |
| amount, price | Currency Amount | 1234.56 |
| age | Number (18-80) | 35 |
| city | City Name | New York |
| country | Country Name | Canada |
| department | Department Name | HR, IT, Finance, etc. |
| [other] | Random Word | Various |

## Example

```bash
$ ./generate_excel.sh

============================================
          Excel Generator Script            
============================================

🔍 Checking required packages...
✅ All requirements met!

📁 Enter the output folder path (press Enter for current directory): ~/Documents/data

📝 Enter the name for your Excel file (without .xlsx): employees

📈 How many rows of data do you need? 100

📊 How many columns do you need? 4

📊 Enter 4 column names (comma-separated)
Example: name, email, age, department
Column names: name, email, department, salary

🔄 Generating your Excel file...

✅ Success! Your Excel file has been generated!
📊 File: /Users/username/Documents/data/employees.xlsx
📁 Folder: /Users/username/Documents/data
📈 Rows: 100
📑 Columns: 4

Your file is ready to use! 🎉
```

## Error Handling

The script includes comprehensive error handling for:

- Invalid file names
- Invalid folder paths
- Permission issues
- Invalid row/column counts
- Missing or incorrect column names

## Output

The generated Excel file will:

- Have the specified number of rows and columns
- Include a header row with the provided column names
- Contain appropriate fake data for each column
- Be saved in the specified location with .xlsx extension

## Notes

- The script creates the output folder if it doesn't exist
- Column names are case-insensitive
- The maximum number of rows is limited to 1,000,000
- The maximum number of columns is limited to 100
