from flask import Flask, render_template, request, jsonify
import requests
import os
from datetime import datetime

app = Flask(__name__)

# Получаем переменные окружения
BOT_TOKEN = os.environ.get('BOT_TOKEN', '8228100485:AAEiPlXrFNVHYFbo8VTnDypnERgw5fxlBCc')
YOUR_TELEGRAM_ID = os.environ.get('YOUR_TELEGRAM_ID', '8519886219')

# Для отладки
print(f"App started. BOT_TOKEN: {'Set' if BOT_TOKEN != '8228100485:AAEiPlXrFNVHYFbo8VTnDypnERgw5fxlBCc' else 'Not set'}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/place_order', methods=['POST'])
def place_order():
    try:
        data = request.json
        
        # Формируем детальное сообщение
        message = f"🛍️ **НОВЫЙ ЗАКАЗ ИЗ MINI APP**\n\n"
        
        # Добавляем товары из корзины
        if 'cart' in data and data['cart']:
            message += "**Товары:**\n"
            for item in data['cart']:
                message += f"• {item.get('name', 'Неизвестно')} ({item.get('volume', 'N/A')}) "
                message += f"- {item.get('quantity', 1)} шт. × {item.get('price', 0)} руб.\n"
            message += f"\n**Итого товаров:** {data.get('total_items', 0)} шт.\n"
            message += f"**Общая сумма:** {data.get('total_price', 0):,} руб.\n\n"
        else:
            # Старая версия для одного товара
            message += f"**Товар:** {data.get('perfume_name', 'Не указан')}\n"
            message += f"**Объем:** {data.get('volume', 'Не указан')}\n"
            message += f"**Цена:** {data.get('price', '0')} руб.\n\n"
        
        # Информация о клиенте
        message += "**Информация о клиенте:**\n"
        message += f"👤 Имя: {data.get('customer_name', 'Не указано')}\n"
        message += f"📱 Телефон: {data.get('phone', 'Не указан')}\n"
        message += f"📲 Telegram: {data.get('telegram_tag', 'Не указан')}\n\n"
        
        # Доставка
        message += "**Доставка:**\n"
        message += f"Способ: {data.get('delivery_type', 'Не указан')}\n"
        if 'address' in data:
            message += f"Адрес: {data.get('address', 'Не указан')}\n\n"
        
        # Комментарий
        message += f"**Комментарий:** {data.get('comments', 'Нет комментариев')}\n\n"
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
            print(f"Order sent successfully from {data.get('telegram_tag', 'unknown')}")
            return jsonify({
                'success': True, 
                'message': '✅ Заказ отправлен!'
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
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)