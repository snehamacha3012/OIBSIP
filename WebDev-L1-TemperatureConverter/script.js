* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2, #23a6d5);
    background-size: 300% 300%;
    animation: gradientMove 10s ease infinite;
}

@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.converter-card {
    width: 100%;
    max-width: 520px;
    padding: 35px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

h1 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 10px;
    color: #222;
}

.subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-size: 16px;
}

.input-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
}

input,
select {
    width: 100%;
    padding: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    outline: none;
}

input:focus,
select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 10px;
    background: #667eea;
    color: white;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
}

button:hover {
    background: #764ba2;
    transform: translateY(-2px);
}

.result-box {
    margin-top: 25px;
    padding: 20px;
    border-radius: 12px;
    background: #f5f6ff;
}

.result-box h2 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 15px;
    color: #333;
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
}

.result-item:last-child {
    border-bottom: none;
}

.result-item strong {
    color: #667eea;
}

.error-message {
    min-height: 20px;
    margin-top: 7px;
    color: #d93025;
    font-size: 14px;
}

@media (max-width: 600px) {
    .converter-card {
        padding: 25px 20px;
    }

    h1 {
        font-size: 26px;
    }

    .subtitle {
        font-size: 14px;
    }
}
