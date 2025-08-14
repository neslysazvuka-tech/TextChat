document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    // Для хранения таймеров удаления сообщений
    const messageTimers = {};
    
    function addMessage(text, isCurrentUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isCurrentUser ? 'user-message' : 'other-message'}`;
        messageDiv.style.alignSelf = isCurrentUser ? 'flex-end' : 'flex-start';
        messageDiv.style.backgroundColor = isCurrentUser ? '#6e8efb' : '#f1f1f1';
        messageDiv.style.color = isCurrentUser ? 'white' : '#333';
        
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Уникальный ID для сообщения
        const messageId = Date.now();
        messageDiv.id = `msg-${messageId}`;
        
        // Установка таймера на удаление через 1 минуту
        messageTimers[messageId] = setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                messageDiv.remove();
                delete messageTimers[messageId];
            }, 300);
        }, 60000); // 60 секунд
        
        return messageId;
    }
    
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            addMessage(text);
            messageInput.value = '';
            
            // В реальном приложении здесь бы было:
            // 1. Отправка сообщения на сервер
            // 2. Получение сообщения другими пользователями
            // Для демо просто добавим "ответ" через 1-3 секунды
            setTimeout(() => {
                const replies = [
                    "Интересное сообщение!",
                    "Я вас понял.",
                    "Спасибо за сообщение!",
                    "Как ваши дела?",
                    "Это временный чат, помните?"
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                addMessage(randomReply, false);
            }, 1000 + Math.random() * 2000);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Пример приветственного сообщения
    setTimeout(() => {
        addMessage("Добро пожаловать в Ephemeral Chat! Сообщения исчезают через 1 минуту.", false);
    }, 500);
});
