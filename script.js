
// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Typed.js effect for hero subtitle
    const typed = new Typed('#typed-text', {
        strings: [
            'Exploring the frontiers of web development',
            'Navigating through code galaxies',
            'Building stellar user experiences',
            'Discovering new programming planets'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Parallax effect for stars
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');
                
                // Add specific animation classes based on element
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animate__fadeInDown');
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('animate__fadeInUp');
                } else if (entry.target.classList.contains('astronaut-card')) {
                    entry.target.classList.add('animate__fadeInLeft');
                } else if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.add('animate__fadeInLeft');
                } else if (entry.target.classList.contains('contact-visual')) {
                    entry.target.classList.add('animate__fadeInRight');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-title, .project-card, .astronaut-card, .contact-info, .contact-visual');
    animateElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Add navigation to planets in solar system
    const solarPlanets = document.querySelectorAll('.solar-system .planet');
    console.log('Found planets:', solarPlanets.length); // Debug log
    
    solarPlanets.forEach((planet, index) => {
        console.log(`Setting up planet ${index + 1}:`, planet.getAttribute('data-section')); // Debug log
        
        planet.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const section = this.getAttribute('data-section');
            console.log('Planet clicked, navigating to:', section); // Debug log
            
            if (section) {
                const targetSection = document.querySelector(`#${section}`);
                if (targetSection) {
                    // Add offset for navbar
                    const navbarHeight = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    console.log('Target section not found:', section);
                }
            }
            
            // Create sparkle effect
            createSparkleEffect(this);
            
            // Add visual feedback
            this.style.transform = 'translateX(-50%) scale(1.8)';
            setTimeout(() => {
                this.style.transform = 'translateX(-50%) scale(1)';
            }, 300);
        });
        
        // Make sure the planet is clickable
        planet.style.cursor = 'pointer';
        planet.style.pointerEvents = 'auto';
        planet.setAttribute('tabindex', '0'); // Make it keyboard accessible
    });

    // Add click effect to project planets
    const projectPlanets = document.querySelectorAll('.project-planet');
    projectPlanets.forEach(planet => {
        planet.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'rotate 2s linear';
            
            // Create sparkle effect
            createSparkleEffect(this);
        });
    });

    // Sun click effect (scrolls to top and brightness effect)
    const sun = document.querySelector('.sun');
    if (sun) {
        sun.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            createSparkleEffect(this);
            createBrightnessEffect();
        });
    }

    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA button scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add shooting star effect
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px white;
            z-index: 1000;
            pointer-events: none;
        `;
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.5;
        
        shootingStar.style.left = startX + 'px';
        shootingStar.style.top = startY + 'px';
        
        document.body.appendChild(shootingStar);
        
        // Animate the shooting star
        shootingStar.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: 'translate(200px, 200px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            shootingStar.remove();
        };
    }

    // Create shooting stars periodically
    setInterval(createShootingStar, 3000);

    // Sparkle effect function
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00d4ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            
            document.body.appendChild(sparkle);
            
            const angle = (i * 60) * Math.PI / 180;
            const distance = 50;
            
            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => {
                sparkle.remove();
            };
        }
    }

    // Brightness effect function
    function createBrightnessEffect() {
        // Create brightness overlay if it doesn't exist
        let overlay = document.querySelector('.brightness-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'brightness-overlay';
            document.body.appendChild(overlay);
        }

        // Apply brightness effect to the entire page
        document.body.classList.add('page-brightened');
        overlay.classList.add('active');

        // Enhanced sun glow effect during brightness
        const sun = document.querySelector('.sun');
        const originalBoxShadow = sun.style.boxShadow;
        sun.style.boxShadow = '0 0 100px #ffcc00, 0 0 200px #ffcc00, 0 0 300px #ffcc00';
        sun.style.transform = 'scale(1.2)';

        // Create radiating light waves
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createLightWave();
            }, i * 500);
        }

        // Fade out after 5 seconds, taking 2 seconds to complete
        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.classList.remove('page-brightened');
            
            // Reset sun styling
            sun.style.boxShadow = originalBoxShadow;
            sun.style.transform = '';
            
            // Remove overlay after fade completes
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 2000);
        }, 5000);
    }

    // Create light wave effect
    function createLightWave() {
        const sun = document.querySelector('.sun');
        const rect = sun.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 204, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(wave);
        
        wave.animate([
            { 
                width: '20px', 
                height: '20px', 
                opacity: 0.8,
                borderWidth: '2px'
            },
            { 
                width: '300px', 
                height: '300px', 
                opacity: 0,
                borderWidth: '0px'
            }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => {
            wave.remove();
        };
    }

    // Add mouse trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Keep only recent trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
        
        // Create trail particle occasionally
        if (Math.random() < 0.1) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: rgba(0, 212, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
            `;
            
            document.body.appendChild(particle);
            
            particle.animate([
                { opacity: 0.6, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    });

    // Add space ambient sound (optional - commented out by default)
    /*
    const ambientSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTr7KBODQxOqOby7GgoAAA=');
    ambientSound.loop = true;
    ambientSound.volume = 0.1;
    
    // Play ambient sound on user interaction
    document.addEventListener('click', function() {
        ambientSound.play().catch(e => console.log('Audio play failed:', e));
    }, { once: true });
    */
});

// Add some extra interactive features
window.addEventListener('load', function() {
    // Add glow effect to interactive elements
    const interactiveElements = document.querySelectorAll('.cta-button, .project-card, .contact-method, .skill-star');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add constellation connecting lines (decorative)
    function drawConstellation() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
        
        // Create constellation points
        const points = [];
        for (let i = 0; i < 50; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update points
            points.forEach(point => {
                point.x += point.vx;
                point.y += point.vy;
                
                if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
            });
            
            // Draw connections
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Update canvas size on window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Enable constellation effect (optional)
    // drawConstellation();

    // Gmail Modal Functionality
    const gmailLink = document.getElementById('gmail-link');
    const gmailModal = document.getElementById('gmail-modal');
    const closeGmail = document.getElementById('close-gmail');
    const cancelGmail = document.getElementById('cancel-gmail');
    const gmailForm = document.getElementById('gmail-form');

    // Open Gmail modal
    if (gmailLink) {
        gmailLink.addEventListener('click', function(e) {
            e.preventDefault();
            gmailModal.style.display = 'block';
        });
    }

    // Close Gmail modal functions
    function closeGmailModal() {
        gmailModal.style.display = 'none';
        gmailForm.reset();
    }

    if (closeGmail) {
        closeGmail.addEventListener('click', closeGmailModal);
    }

    if (cancelGmail) {
        cancelGmail.addEventListener('click', closeGmailModal);
    }

    // Handle Gmail form submission
    if (gmailForm) {
        gmailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const gmailAccount = document.getElementById('gmail-account').value;
            const message = document.getElementById('gmail-message').value;
            
            // Create Gmail compose URL
            const subject = 'Message from Portfolio Website';
            const body = `From: ${gmailAccount}\n\nMessage:\n${message}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=your.email@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open Gmail compose in new tab
            window.open(gmailUrl, '_blank');
            closeGmailModal();
        });
    }

    // Facebook Modal Functionality
    const facebookLink = document.getElementById('facebook-link');
    const facebookModal = document.getElementById('facebook-modal');
    const closeFacebookBtn = document.getElementById('close-facebook');
    const proceedBtn = document.getElementById('proceed-facebook');
    const cancelBtn = document.getElementById('cancel-facebook');

    // Open modal when Facebook link is clicked
    if (facebookLink) {
        facebookLink.addEventListener('click', function(e) {
            e.preventDefault();
            facebookModal.style.display = 'block';
        });
    }

    // Close modal functions
    function closeFacebookModal() {
        facebookModal.style.display = 'none';
    }

    if (closeFacebookBtn) {
        closeFacebookBtn.addEventListener('click', closeFacebookModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeFacebookModal);
    }

    // Proceed to Facebook
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            // Replace with your actual Facebook profile URL
            window.open('https://www.facebook.com/its.badodo', '_blank');
            closeFacebookModal();
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === facebookModal) {
            closeFacebookModal();
        }
        if (e.target === gmailModal) {
            closeGmailModal();
        }
        if (e.target === personalModal) {
            closePersonalModal();
        }
    });

    // Character and Rocket Functionality
    const characterIcon = document.getElementById('character-icon');
    const rocketIcon = document.getElementById('rocket-icon');
    const personalModal = document.getElementById('personal-info-modal');
    const closePersonal = document.getElementById('close-personal');

    // Character icon - show personal info modal
    if (characterIcon) {
        characterIcon.addEventListener('click', function() {
            personalModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Rocket icon - navigate to home with animation and music
    if (rocketIcon) {
        rocketIcon.addEventListener('click', function() {
            // Play rocket launch sound
            playRocketLaunchSound();
            
            // Add launch animation
            this.classList.add('launch-animation');
            
            // Navigate to home after animation starts
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 200);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('launch-animation');
            }, 1000);
        });
    }

    // Close personal info modal
    function closePersonalModal() {
        personalModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    if (closePersonal) {
        closePersonal.addEventListener('click', closePersonalModal);
    }

    // Add escape key functionality for personal modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && personalModal.style.display === 'block') {
            closePersonalModal();
        }
    });

    // Rocket launch sound function
    function playRocketLaunchSound() {
        // Create audio context for rocket sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a more complex rocket sound with multiple frequencies
        const duration = 2.5; // 2.5 seconds
        const sampleRate = audioContext.sampleRate;
        const frameCount = sampleRate * duration;
        const arrayBuffer = audioContext.createBuffer(2, frameCount, sampleRate);
        
        // Generate rocket sound for left and right channels
        for (let channel = 0; channel < arrayBuffer.numberOfChannels; channel++) {
            const channelData = arrayBuffer.getChannelData(channel);
            
            for (let i = 0; i < frameCount; i++) {
                const t = i / sampleRate;
                
                // Create whoosh sound with decreasing frequency
                const baseFreq = 150 - (t * 50); // Start at 150Hz, drop to 100Hz
                const whoosh = Math.sin(2 * Math.PI * baseFreq * t) * Math.exp(-t * 1.5);
                
                // Add rocket engine rumble
                const rumble = (Math.random() - 0.5) * 0.3 * Math.exp(-t * 0.8);
                
                // Add boost sound (higher frequency burst at start)
                const boost = Math.sin(2 * Math.PI * 400 * t) * Math.exp(-t * 8) * 0.5;
                
                // Combine all elements with volume envelope
                const envelope = Math.exp(-t * 1.2);
                channelData[i] = (whoosh + rumble + boost) * envelope * 0.3;
            }
        }
        
        // Play the generated sound
        const source = audioContext.createBufferSource();
        source.buffer = arrayBuffer;
        
        // Add some reverb effect
        const convolver = audioContext.createConvolver();
        const impulseBuffer = audioContext.createBuffer(2, sampleRate * 0.5, sampleRate);
        for (let channel = 0; channel < impulseBuffer.numberOfChannels; channel++) {
            const impulseData = impulseBuffer.getChannelData(channel);
            for (let i = 0; i < impulseData.length; i++) {
                impulseData[i] = (Math.random() - 0.5) * Math.exp(-i / (sampleRate * 0.1));
            }
        }
        convolver.buffer = impulseBuffer;
        
        // Connect audio nodes
        source.connect(convolver);
        convolver.connect(audioContext.destination);
        source.connect(audioContext.destination); // Also connect dry signal
        
        source.start();
        
        // Resume audio context if it's suspended (for browser autoplay policies)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const gmailForm = document.getElementById("gmail-form");
    const cancelButton = document.getElementById("cancel-gmail");

    gmailForm.addEventListener("submit", function (e) {
        e.preventDefault(); // This should stop the page reload

        alert("Message sent successfully!");
        gmailForm.reset(); // optional
    });

    cancelButton.addEventListener("click", function () {
        gmailForm.reset();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("gmail-form");

    emailjs.init("YOUR_PUBLIC_KEY"); // Replace this with your actual EmailJS Public Key

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
            .then(function () {
                alert("Message sent successfully!");
                form.reset();
            }, function (error) {
                alert("Failed to send message: " + error.text);
            });
    });
});

document.getElementById("instagram-link").href = "https://www.instagram.com/itsmee.badodo/";

document.getElementById("discord-link").href = "https://discord.com/users/1265463727285735505";
