# AI_explain_extension

A Python project

## Description

This project is built using Python and follows modern development practices with proper project structure, testing, and containerization support.

## Features

- Modern Python project structure
- Environment-based configuration
- Docker support
- Testing framework setup
- Code quality tools (tox)
- Comprehensive documentation
- AI-powered project documentation generation (Claude API)
- Automated PRD and task breakdown creation

## Project Structure

```
AI_explain_extension/
├── src/                    # Source code
│   ├── __init__.py
│   └── main.py
├── tests/                  # Test files
│   ├── __init__.py
│   └── test_main.py
├── notebooks/              # Jupyter notebooks
├── files/                  # Data files, assets
├── docs/                   # Documentation
├── .env                    # Environment variables (local)
├── .env.template          # Environment variables template
├── .gitignore             # Git ignore file
├── Dockerfile             # Docker configuration
├── requirements.txt       # Python dependencies
├── tox.ini               # Testing and code quality
├── example_prd.md         # PRD template reference
└── README.md             # This file
```

## Installation

### Prerequisites

- Python 3.8+
- pip
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AI_explain_extension
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Copy environment file and configure:
   ```bash
   copy .env.template .env
   # Edit .env with your configuration
   ```

5. Run the application:
   ```bash
   python -m src.main
   ```

### AI Documentation Generation (Optional)

To use the Claude AI documentation generator:

1. Get a Claude API key from: https://console.anthropic.com/
2. Add to your .env file:
   ```bash
   CLAUDE_API_KEY=your_api_key_here
   ```
3. Or set environment variable:
   ```bash
   set CLAUDE_API_KEY=your_api_key_here
   ```

### Docker Development

1. Build the Docker image:
   ```bash
   docker build -t AI_explain_extension .
   ```

2. Run the container:
   ```bash
   docker run -p 8000:8000 --env-file .env AI_explain_extension
   ```

## Testing

Run tests using tox:
```bash
tox
```

Or run tests directly:
```bash
python -m pytest tests/
```

## Development

### Code Quality

This project uses tox for testing and code quality checks:

- `tox -e py` - Run tests
- `tox -e lint` - Run linting (flake8, black, isort)
- `tox -e type` - Run type checking (mypy)

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Environment Variables

See `.env.template` for all available environment variables.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Vladimir Stojoc

## Support

For support, email vladimir.stojoc@gmail.com or create an issue in the repository.
