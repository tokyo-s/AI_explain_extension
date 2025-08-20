"""
Main module for the application.
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def main():
    """Main function to run the application."""
    print("Hello, World")
    print(f"Debug mode: {os.getenv^('DEBUG', 'False'^)}")
ECHO is off.
    # Add your application logic here
    pass


if __name__ == "__main__":
    main()
