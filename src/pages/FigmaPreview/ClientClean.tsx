import React from 'react';
import styles from './ClientClean.module.css';
import Button from '../../components/Button/Button';

export function ClientClean() {
  return (
    <div className={styles._root}>
      <div>
        <div className={styles.brand}>
          <strong>Идём</strong>
          <span>в</span>
          <strong>кино</strong>
        </div>

        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.ticketInfo}>
              <div className={styles.filmName}>Звёздные войны XXIII: Атака клонированных клонов</div>
              <div className={styles.time}>Начало сеанса: 18:30</div>
              <div className={styles.hallName}>Зал 1</div>
            </div>
          </div>

          <div className={styles.hall}>
            <div className={styles.screen} />

            <div className={styles.seats}>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seatVip} />
                <div className={styles.seatVip} />
                <div className={styles.seat} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seatVip} />
                <div className={styles.seatVip} />
                <div className={styles.seatVip} />
                <div className={styles.seatVip} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seatVip} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seatVip} />
                <div className={styles.seatTaken} />
                <div className={styles.seatTaken} />
                <div className={styles.seatTaken} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seat} />
                <div className={styles.seatSelected} />
                <div className={styles.seatSelected} />
                <div className={styles.seat} />
                <div className={styles.seat} />
              </div>
              <div className={styles.row}>
                <div className={styles.seat} />
                <div className={styles.seatTaken} />
                <div className={styles.seat} />
                <div className={styles.seatTaken} />
                <div className={styles.seat} />
                <div className={styles.seatTaken} />
                <div className={styles.seatTaken} />
                <div className={styles.seat} />
              </div>
            </div>

            <div className={styles.legendWrap}>
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <div className={styles.seat} />
                  <div>Свободно (250руб)</div>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.seatVip} />
                  <div>Свободно VIP (350руб)</div>
                </div>
              </div>
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <div className={styles.seatTaken} />
                  <div>Занято</div>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.seatSelected} />
                  <div>Выбрано</div>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button appereance="big">Забронировать</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

