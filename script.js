document.addEventListener('DOMContentLoaded', () => {
    // Countdown Logic
    const targetDate = new Date("October 25, 2025 20:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (difference > 0) {
            document.getElementById("days").innerText = days < 10 ? '0' + days : days;
            document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Calendar Link Logic
    const eventDetails = {
        title: "Cumpleaños de Sofía",
        location: "Av. Siempre Viva 123, Ciudad Elegante",
        details: "¡Celebremos juntos! No faltes.",
        start: "20251025T200000",
        end: "20251026T040000"
    };

    document.getElementById('googleCal').href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;




    // Scroll Reveal Animation (Existing)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
        observer.observe(el);
    });

    // Modal Logic
    const modal = document.getElementById('rsvpModal');
    const btn = document.getElementById('rsvpBtn');
    const closeSpan = document.getElementsByClassName('close')[0];
    const confirmBtn = document.getElementById('confirmBtn');
    const declineBtn = document.getElementById('declineBtn');

    btn.onclick = function () {
        modal.classList.add('show');
    }

    closeSpan.onclick = function () {
        closeModal();
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    // Response Actions
    confirmBtn.onclick = function () {
        closeModal();
        btn.textContent = "¡Asistencia Confirmada! 🎉";
        btn.style.background = "#4CAF50";
        btn.style.color = "white";
        // Trigger confetti
        startConfetti();
    }

    declineBtn.onclick = function () {
        closeModal();
        btn.textContent = "Te extrañaremos 😢";
        btn.style.background = "#666";
        btn.disabled = true;
    }

    // Confetti Logic
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let animationId;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.velocity = {
                x: (Math.random() - 0.5) * 5,
                y: Math.random() * 5 + 2
            };
            this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            this.radius = Math.random() * 5 + 2;
            this.gravity = 0.1;
            this.opacity = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.y += this.velocity.y;
            this.x += this.velocity.x;
            this.velocity.y += this.gravity;
            this.opacity -= 0.005;
        }
    }

    function initConfetti() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateConfetti() {
        animationId = requestAnimationFrame(animateConfetti);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.opacity <= 0 || particle.y > canvas.height) {
                particles.splice(index, 1);
            }
        });

        if (particles.length === 0) {
            cancelAnimationFrame(animationId);
        }
    }

    function startConfetti() {
        // burst
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                initConfetti();
                if (i === 0) animateConfetti();
            }, i * 200);
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
