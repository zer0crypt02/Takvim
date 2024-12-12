class ProfessionalCalendar {
    constructor() {
        this.monthNames = [
            "Ocak", "Şubat", "Mart", "Nisan", 
            "Mayıs", "Haziran", "Temmuz", 
            "Ağustos", "Eylül", "Ekim", 
            "Kasım", "Aralık"
        ];
        this.currentDate = new Date();
        this.events = this.loadEvents();
        this.initializeCalendar();
        this.attachEventListeners();
    }

    loadEvents() {
        return {
            "2024-12-25": "Noel",
            "2024-12-31": "Yılbaşı",
            "2025-01-01": "Yeni Yıl"
        };
    }

    initializeCalendar() {
        this.renderCalendar(this.currentDate);
    }

    renderCalendar(date) {
        const grid = document.getElementById('calendar-grid');
        const monthYearDisplay = document.getElementById('current-month-year');
        
        // Mevcut gün satırlarını temizle
        const existingDays = grid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());

        monthYearDisplay.textContent = `${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;

        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();

        // Boş günleri doldur
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            grid.appendChild(emptyDay);
        }

        // Günleri doldur
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (this.events[fullDate]) {
                const eventIndicator = document.createElement('div');
                eventIndicator.classList.add('event-indicator');
                eventIndicator.title = this.events[fullDate];
                dayElement.appendChild(eventIndicator);
            }

            if (
                date.getFullYear() === new Date().getFullYear() && 
                date.getMonth() === new Date().getMonth() && 
                day === new Date().getDate()
            ) {
                dayElement.classList.add('current-day');
            }

            grid.appendChild(dayElement);
        }
    }

    attachEventListeners() {
        document.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));
    }

    changeMonth(increment) {
        this.currentDate.setMonth(this.currentDate.getMonth() + increment);
        this.renderCalendar(this.currentDate);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalCalendar();
});