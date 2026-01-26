import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import styles from './PriceConfig.module.css';
import cn from 'classnames';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { configPrice } from '../../store/hallOperationsSlice.slice';
import { useAppData } from '../../hooks/useAppData';
// Импортируем иконки кресел
import regularChairIcon from '../../assets/Admin/regular-chair-icon.svg';
import vipChairIcon from '../../assets/Admin/VIP-chair-icon.svg';

export function PriceConfig() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectHall, setSelectHall] = useState<number>(0);
  const [formValue, setFormValue] = useState(() => ({ priceStandart: 0, priceVip: 0 }));

  const dispatch = useAppDispatch();
  // Убрали hallsError, чтобы TypeScript не ругался
  const { halls, loading: hallsLoading } = useAppData();

  useEffect(() => {
    if (selectHall) {
      loadHallConfig(selectHall);
    }
  }, [selectHall]);

  useEffect(() => {
    if (halls?.length > 0 && !selectHall) {
      setSelectHall(halls[0].id);
    }
  }, [halls, selectHall]);

  const loadHallConfig = (hallId: number) => {
    const selectedHall = halls.find(hall => hall.id === hallId);
    if (selectedHall) {
      setFormValue({
        priceStandart: selectedHall.hall_price_standart || 0,
        priceVip: selectedHall.hall_price_vip || 0
      });
    }
  };

  const handleHallClick = (hallId: number) => {
    setSelectHall(hallId);
  };

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectHall) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set('priceStandart', formValue.priceStandart.toString());
    formData.set('priceVip', formValue.priceVip.toString());

    try {
      await dispatch(configPrice({ hallId: selectHall, formData })).unwrap();
      alert('Цены успешно сохранены!');
    } catch (e: any) {
      setError(e.message || 'Ошибка при сохранении цен');
    } finally {
      setLoading(false);
    }
  };

  const cancel = (hallId: number) => {
    loadHallConfig(hallId);
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.header}>
        <div>Выберите зал для конфигурации:</div>
        {hallsLoading ? (
          <div>Загрузка...</div>
        ) : (
          <div className={styles.halls}>
            {halls.map((hall) => (
              <div
                key={hall.id}
                className={cn(styles.hall, selectHall === hall.id && styles['hall_active'])}
                onClick={() => handleHallClick(hall.id)}
              >
                {hall.hall_name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.header}>
        Установите цены для типов кресел:
        <div className={styles.prices}>
          <div className={styles.field}>
            <label>Цена, рублей</label>
            <Input name="priceStandart" value={formValue.priceStandart} onChange={handleChangeForm} />
            <span> за </span>
            <img src={regularChairIcon} alt="иконка для обычных кресел" />
            <span> обычные кресла</span>
          </div>
          <div className={styles.field}>
            <label>Цена, рублей</label>
            <Input name="priceVip" value={formValue.priceVip} onChange={handleChangeForm} />
            <span> за </span>
            <img src={vipChairIcon} alt="иконка для VIP кресел" />
            <span> VIP кресла</span>
          </div>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.buttons}>
        <Button appereance="cancel" onClick={() => cancel(selectHall)} type="button">Отменить</Button>
        <Button appereance="admin" type="submit" disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}