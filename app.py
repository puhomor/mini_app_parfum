from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

# Ваш токен бота (создать через @BotFather)
BOT_TOKEN = os.environ.get('BOT_TOKEN', 'ВАШ_ТОКЕН_БОТА')
YOUR_TELEGRAM_ID = os.environ.get('YOUR_TELEGRAM_ID', 'ваш_id_или_@puhomor')

# Проверяем переменные окружения (для отладки)
print(f"BOT_TOKEN loaded: {'Yes' if BOT_TOKEN != 'ВАШ_ТОКЕН_БОТА' else 'No'}")
print(f"YOUR_TELEGRAM_ID: {YOUR_TELEGRAM_ID}")

# Главная страница мини-приложения
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/place_order', methods=['POST'])
def place_order():
    try:
        data = request.json
        
        # Формируем сообщение для Telegram
        message = f"🎉 НОВЫЙ ЗАКАЗ!\n\n"
        message += f"Аромат: {data.get('perfume_name')}\n"
        message += f"Объем: {data.get('volume')}\n"
        message += f"Цена: {data.get('price')} руб.\n"
        message += f"Имя клиента: {data.get('customer_name', 'Не указано')}\n"
        message += f"Телефон: {data.get('phone', 'Не указан')}\n"
        message += f"Комментарий: {data.get('comments', 'Нет')}\n\n"
        message += f"📅 {datetime.now().strftime('%d.%m.%Y %H:%M')}"
        
        # Отправляем сообщение в ваш Telegram
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        
        # Проверяем формат YOUR_TELEGRAM_ID
        chat_id = YOUR_TELEGRAM_ID
        
        # Если это username (начинается с @), нужно получить его chat_id
        # Но для начала можно использовать ваш числовой ID
        # Лучше всего указать ваш числовой ID в переменных окружения
        
        payload = {
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }
        
        response = requests.post(url, json=payload)
        
        # Логируем ответ от Telegram API
        print(f"Telegram API response: {response.status_code}")
        
        if response.status_code == 200:
            return jsonify({'success': True, 'message': 'Заказ отправлен!'})
        else:
            error_msg = f"Ошибка Telegram API: {response.text}"
            print(error_msg)
            return jsonify({'success': False, 'error': error_msg}), 500
        
    except Exception as e:
        print(f"Error in place_order: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Вебхук для бота (опционально)
@app.route('/webhook', methods=['POST'])
def webhook():
    update = request.json
    # Обработка входящих сообщений боту
    return 'OK'

if __name__ == '__main__':
    # Для локальной разработки
    app.run(debug=True, port=5000)