import { useState } from 'react';
import Button from '../Button/Button';
import styles from './HallAdd.module.css';
import { useAppDispatch } from '../../store/store';
import { fetchAllData } from '../../store/allDataSlice.slice';
import { deleteHall } from '../../store/hallOperationsSlice.slice';
import { PopupCreateHall } from '../Popup/PopupCreateHall';
import { useAppData } from '../../hooks/useAppData';
// Импортируем иконку удаления правильно
import deleteIcon from '../../assets/Admin/delete-icon.svg';

export function HallAdd() {
  const { halls } = useAppData();
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const delHall = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот зал?')) return;
    
    try {
      // Удаляем на сервере
      await dispatch(deleteHall(id)).unwrap();
      // Сразу просим сервер прислать нам свежий список залов
      await dispatch(fetchAllData()); 
      alert('Зал успешно удален');
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      alert('Не удалось удалить зал. Попробуйте еще раз.');
    }
  };

  const handleCreateHall = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSuccessCreate = () => {
    setShowPopup(false);
    // Обновляем список после создания нового зала
    dispatch(fetchAllData());
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Доступные залы:</div>
      <div className={styles.halls}>
        {halls && halls.map((hall) => (
          <div key={hall.id} className={styles.hall}>
            <div>- {hall.hall_name}</div>
            <img 
              src={deleteIcon} 
              alt="иконка удаления зала" 
              className={styles.icon} 
              onClick={() => delHall(hall.id)}
              style={{ cursor: 'pointer' }} // Чтобы при наведении был "пальчик"
            />
          </div>
        ))}
      </div>
      <Button appereance="admin" onClick={handleCreateHall}>Создать зал</Button>
      
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <PopupCreateHall 
              onClose={handleClosePopup} 
              onSuccess={handleSuccessCreate} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
