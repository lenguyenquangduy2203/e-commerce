
# Decision Support System (DSS)

This project is a Decision Support System (DSS) built using **Python Dash** and **Bootstrap** components, integrated with a backend for dynamic data processing.

## Requirements

- **Python 3.8+** (recommended version: 3.13)
- **pip** (Python's package installer)
- **Virtual Environment** (`venv`)

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/dss-project.git
cd dss-project
```

### 2. Set Up the Virtual Environment

Create a virtual environment in the project directory:

```bash
python3 -m venv venv
```

Activate the virtual environment:

- **On macOS/Linux:**
    ```bash
    source venv/bin/activate
    ```
- **On Windows:**
    ```bash
    venv\Scripts\activate
    ```

You should now see `(venv)` at the beginning of your terminal prompt, indicating that the virtual environment is active.

### 3. Install the Dependencies

Install all required dependencies by running:

```bash
pip install -r requirements.txt
```

This will install:
- Dash (for the web app),
- Dash Bootstrap Components (for UI design),
- numpy (for data processing),
- and any other dependencies listed in `requirements.txt`.

### 4. Configure Environment Variables (Optional)

Ensure that you have the necessary environment variables set up in your `.env` file for local development. You may need to configure:

- **CORS Configuration:**
    - `CORS_ALLOWED_ORIGINS=http://localhost:8000,http://localhost:8050`
    - `CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE`

You can also add additional variables like database URLs, JWT keys, etc., if needed.

### 5. Run the Application

Once dependencies are installed and the environment is set up, you can run the Dash application with:

```bash
python app.py
```

By default, the app should be accessible at:

```
http://localhost:8050
```

You can now interact with the DSS interface, which pulls data from your backend APIs.

### 6. Stopping the Application

To stop the app, press `Ctrl+C` in the terminal.

### 7. Deactivating the Virtual Environment

When you're done, deactivate the virtual environment by running:

```bash
deactivate
```

---

## Troubleshooting

- If you encounter issues with missing dependencies, make sure that you're inside the virtual environment (check for `(venv)` in your terminal prompt).
- If there are errors related to missing or misconfigured environment variables, double-check your `.env` file and ensure all necessary keys are present.

---

## Future Deployment

Once the UI is finalized, you can consider containerizing the application with **Docker** for easier deployment and scaling.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
