import { useRef, useState, type FormEvent } from 'react';
import Button from '../Button/Button';
import Headling from '../Headling/Headling';
import Input from '../Input/Input';
import type { PopupProps } from './Popup.interface';
import styles from './Popup.module.css';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { addFilm } from '../../store/filmOperationsSlice.slice';
import { fetchAllData } from '../../store/allDataSlice.slice';
// Импортируем крестик
import closeIcon from '../../assets/Admin/close-icon.svg';

export function PopupAddFilm({ onClose, onSuccess }: PopupProps) {
  const [error, setError] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemovePoster = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const filmName = formData.get('filmName') as string;
    const filmDuration = formData.get('filmDuration') as string;
    const filmDescription = formData.get('filmDescription') as string;
    const filmOrigin = formData.get('filmOrigin') as string;

    if (!filmName?.trim() || !filmDescription?.trim() || !filmOrigin?.trim()) {
      setError('Заполните все текстовые поля');
      setLoading(false);
      return;
    }

    const duration = parseInt(filmDuration);
    if (!filmDuration?.trim() || isNaN(duration) || duration <= 0) {
      setError('Укажите корректную продолжительность фильма');
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      setError('Постер фильма обязателен');
      setLoading(false);
      return;
    }

    await handleAddFilm(formData);
  };

  const handleAddFilm = async (formData: FormData) => {
    try {
      const res = await dispatch(addFilm(formData)).unwrap();
      
      if (!res.success) {
        setError(res.error);
        setLoading(false);
      } else {
        // Обновляем список фильмов на сервере
        await dispatch(fetchAllData());
        onSuccess?.();
      }
    } catch (e: any) {
      console.error('Error creating film:', e);
      setError(e.response?.data?.message || 'Ошибка при создании фильма');
      setLoading(false);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.head}>
        <Headling appearence="admin"> Добавление фильма</Headling>
        <img 
          src={closeIcon} 
          alt="иконка крестика" 
          className={styles.icon} 
          onClick={onClose || (() => navigate('/admin/cabinet'))}
        />
      </div>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles['input-block']}>
          <label htmlFor="filmName" className={styles.title}>Название фильма</label>
          <Input id="filmName" name="filmName" placeholder="Например, «Гражданин Кейн»" className={styles.input} required />
        </div>

        <div className={styles['input-block']}>
          <label htmlFor="filmDuration" className={styles.title}>Продолжительность фильма (мин.)</label>
          <Input id="filmDuration" name="filmDuration" className={styles.input} required type="number" />
        </div>

        <div className={styles['input-block']}>
          <label htmlFor="filmDescription" className={styles.title}>Описание фильма</label>
          <textarea 
            name="filmDescription" 
            id="filmDescription" 
            className={cn(styles.input, styles.description)} 
            required
          />
        </div>

        <div className={styles['input-block']}>
          <label htmlFor="filmOrigin" className={styles.title}>Страна</label>
          <Input id="filmOrigin" name="filmOrigin" className={styles.input} required />
        </div>

        <div className={styles['input-block']}>
          <label className={styles.title}>Постер фильма</label>
          <div className={styles['file-upload']}>
            <Button 
              type="button" 
              appereance="admin" 
              onClick={handleUploadClick}
            >
              Загрузить постер
            </Button>
            <input
              type="file"
              name="filePoster"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
              required
            />
          </div>
        </div>

        {previewUrl && (
          <div className={styles['preview-block']}>
            <div className={styles['preview-title']}>Предпросмотр постера:</div>
            <div className={styles['preview-container']}>
              <img src={previewUrl} alt="Предпросмотр постера" className={styles['preview-image']} />
              <img 
                src={closeIcon}
                alt="иконка крестика" 
                className={styles['remove-poster']} 
                onClick={handleRemovePoster}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttons}>
          <Button appereance="admin" type="submit" disabled={loading}>
            {loading ? 'Добавление фильма...' : 'Добавить фильм'}
          </Button>
          <Button type="button" appereance="cancel" onClick={onClose || (() => navigate('/admin/cabinet'))}>
            Отменить
          </Button>
        </div>
      </form>
    </div>
  );
}