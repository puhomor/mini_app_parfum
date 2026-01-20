from flask import Flask, render_template, request, jsonify
import requests
import os
from datetime import datetime

app = Flask(__name__)

# Получаем переменные окружения
BOT_TOKEN = os.environ.get('BOT_TOKEN', '8228100485:AAEiPlXrFNVHYFbo8VTnDypnERgw5fxlBCc')
YOUR_TELEGRAM_ID = os.environ.get('YOUR_TELEGRAM_ID', '889038004')

# Для отладки
print(f"App started. BOT_TOKEN: {'Set' if BOT_TOKEN != '8228100485:AAEiPlXrFNVHYFbo8VTnDypnERgw5fxlBCc' else 'Not set'}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/place_order', methods=['POST'])
def place_order():
    try:
        data = request.json
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        # Формируем сообщение
        message = f"🛍️ **НОВЫЙ ЗАКАЗ ИЗ MINI APP**\n\n"
        message += f"▪️ Аромат: {data.get('perfume_name', 'Не указан')}\n"
        message += f"▪️ Объем: {data.get('volume', 'Не указан')}\n"
        message += f"▪️ Цена: {data.get('price', '0')} руб.\n"
        message += f"▪️ Клиент: {data.get('customer_name', 'Не указано')}\n"
        message += f"▪️ Телефон: {data.get('phone', 'Не указан')}\n"
        message += f"▪️ Комментарий: {data.get('comments', 'Нет')}\n\n"
        message += f"⏰ {datetime.now().strftime('%d.%m.%Y %H:%M')}"
        
        # Отправляем в Telegram
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        payload = {
            'chat_id': YOUR_TELEGRAM_ID,
            'text': message,
            'parse_mode': 'Markdown'
        }
        
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            print(f"Order sent successfully: {data.get('perfume_name')}")
            return jsonify({
                'success': True, 
                'message': '✅ Заказ отправлен! Я свяжусь с вами в Telegram в течение 5 минут.'
            })
        else:
            error_text = response.text
            print(f"Telegram API error: {error_text}")
            return jsonify({
                'success': False, 
                'error': f'Ошибка отправки: {error_text}'
            }), 500
            
    except Exception as e:
        print(f"Error in place_order: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Health check для Render
@app.route('/health')
def health():
    return 'OK'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)