import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './PaymentClient.module.css';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function Payment() {
    const [showQR, setShowQR] = useState(false);
    const location = useLocation();
    const { tickets, filmName, hallName, seanceTime, totalCoast, selectedSeatsInfo, selectedDate } = location.state || {};
    const displayFilmName = filmName || 'Звёздные войны XXIII: Атака клонированных клонов';
    const displaySeats = selectedSeatsInfo || '6, 7';
    const displayHall = hallName || '1';
    const displayTime = seanceTime || '18:30';
    const displayCost = totalCoast || '600';

    const handleGetCode = () => {
        setShowQR(true);
    };

    // Формируем QR код с полной информацией о билете
    const getQRCodeValue = () => {
        if (!tickets || tickets.length === 0) {
            return `Билет: ${filmName}, ${seanceTime}, ${selectedSeatsInfo}`;
        }

        const ticket = tickets[0];
        const normalizeDate = (d: unknown): string => {
            if (!d) return 'N/A';
            if (typeof d === 'string') {
                if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
                const parsed = new Date(d);
                return isNaN(parsed.getTime()) ? 'N/A' : parsed.toISOString().slice(0,10);
            }
            if (d instanceof Date) {
                return d.toISOString().slice(0,10);
            }
            return 'N/A';
        };
        const normalizedSelectedDate = normalizeDate(selectedDate);
        const qrData = {
            ticketId: ticket.ticket_id || ticket.id || 'N/A',
            filmName: ticket.ticket_filmname || filmName || 'N/A',
            seanceTime: ticket.ticket_time || seanceTime || 'N/A',
            hallName: ticket.ticket_hallname || hallName || 'N/A',
            seatInfo: selectedSeatsInfo || 'N/A',
            price: ticket.ticket_price || totalCoast || 'N/A',
            status: ticket.ticket_status || 'booked',
            date: ticket.ticket_date || normalizedSelectedDate || 'N/A',
            validationText: 'Билет действителен строго на свой сеанс'
        };

        return JSON.stringify(qrData);
    };

    return (
        <div className={`${styles.ticketWrapper} ${!showQR ? styles.ticketWrapperShort : ''}`}>
            {showQR ? (
                <div className={styles.ticketHeader}>
                    <h1 className={styles.ticketTitle}>ЭЛЕКТРОННЫЙ БИЛЕТ</h1>
                </div>
            ) : null}

            {!showQR ? (
                <div className={styles.ticketSubHeader}>
                    ВЫ ВЫБРАЛИ БИЛЕТЫ:
                </div>
            ) : null}

            <div className={showQR ? styles.ticketQrSectionQR : styles.ticketQrSection}>
                <div className={styles.ticketQrInner}>
                    <div className={styles.ticketInfo}>
                        <p>На фильм: <strong>{displayFilmName}</strong></p>
                        <p>Места: <strong>{displaySeats}</strong></p>
                        <p>В зале: <strong>{displayHall}</strong></p>
                        <p>Начало сеанса: <strong>{displayTime}</strong></p>
                        <p className={styles.costLine}>Стоимость: <strong>{displayCost} рублей</strong></p>
                    </div>
                    {showQR ? (
                        <div className={`${styles.qrContainer} ${styles.qrContainerQR}`}>
                            <QRCodeSVG value={getQRCodeValue()} size={200} />
                        </div>
                    ) : (
                        <div className={styles.ticketAction}>
                            <Button appereance="big" className={styles.ctaButton} onClick={handleGetCode}>
                                Получить код бронирования
                            </Button>
                        </div>
                    )}
                </div>
                <div className={styles.ticketHints}>
                    <p className={styles.hintText}>
                        Покажите QR-код нашему контроллёру для подтверждения бронирования.
                    </p>
                    <p className={styles.hintText}>Приятного просмотра!</p>
                </div>
            </div>

            {/* footer removed for QR layout parity */}
        </div>
    );
}
