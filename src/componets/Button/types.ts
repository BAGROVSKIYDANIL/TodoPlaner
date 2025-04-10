export interface IButton{
  onClick?: () => void; // Обработчик клика
  disabled?: boolean;   // Флаг отключения кнопки
  className?: string;   // Дополнительные классы для стилизации
  children: React.ReactNode; // Содержимое кнопки (текст или другие элементы)    
}