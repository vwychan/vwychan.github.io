document.getElementById('buttonA').addEventListener('click', function() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const fireworks = new Fireworks(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 0,
            max: 360
        },
        delay: {
            min: 30,
            max: 60
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });

    fireworks.start();

    setTimeout(() => {
        fireworks.stop();
        document.body.removeChild(container);
    }, 5000); // Fireworks will last for 5 seconds
});

document.getElementById('buttonB').addEventListener('click', function() {
    const buttonB = document.getElementById('buttonB');
    const currentOpacity = parseFloat(window.getComputedStyle(buttonB).opacity);
    buttonB.style.opacity = currentOpacity * 0.9;
});

function handleMove(event) {
    const buttonB = document.getElementById('buttonB');
    const rect = buttonB.getBoundingClientRect();
    const mouseX = event.clientX || (event.touches && event.touches[0].clientX);
    const mouseY = event.clientY || (event.touches && event.touches[0].clientY);
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;
    const distance = Math.sqrt((mouseX - buttonX) ** 2 + (mouseY - buttonY) ** 2);

    if (distance <= 10) {
        relocateButton();
    }
}

document.addEventListener('mousemove', handleMove);
document.addEventListener('touchmove', handleMove);