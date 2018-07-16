window.onload = () => {
    const color = '#ff42c5cc';
    const input = document.querySelector('.input');
    let mode = input.value;
    const possibleModes = [
        'clock',
        'date'
    ];

    const form = document.querySelector('.form');
    const submit = document.querySelector('.submit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (possibleModes.indexOf(input.value) !== -1){
            mode = input.value;
        } else {
            alert('Possible mode can be clock or date');
            input.value = '';
        }
            

    })

    const numbers = [
        [0,0,0, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1], //0
        [0,0,0, 1,1,1, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 1,1,1], //1
        [1,1,1, 1,1,1, 1,1,1, 0,0,0, 1,1,1, 1,1,1, 0,0,0], //2
        [1,1,1, 1,1,1, 1,1,1, 0,0,0, 0,0,0, 1,1,1, 1,1,1], //3
        [1,1,1, 1,1,1, 0,0,0, 1,1,1, 0,0,0, 0,0,0, 1,1,1], //4
        [1,1,1, 0,0,0, 1,1,1, 1,1,1, 0,0,0, 1,1,1, 1,1,1], //5
        [1,1,1, 0,0,0, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1], //6
        [0,0,0, 1,1,1, 1,1,1, 0,0,0, 0,0,0, 0,0,0, 1,1,1], //7
        [1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1], //8
        [1,1,1, 1,1,1, 1,1,1, 1,1,1, 0,0,0, 1,1,1, 1,1,1], //9
    ];

    const leds = Array.from(document.querySelectorAll('.led'));
    const dots = Array.from(document.querySelectorAll('.led_dot'));

    const gettime = (number, offset) => {
        for (let i = 0; i + offset < leds.length; i++) {
            let el = leds[i + offset];
            setTimeout(() => {
                if (i < 21){
                    if (numbers[number][i]) {
                        el.style.backgroundColor = color;
                    } else {
                        el.style.backgroundColor = '#fff';
                    }
                }
            }, i * 20)
        };
    }


    const getCurrentTime = () => {
        const date = new Date();

        return [
            Math.floor((date.getHours() / 10) * 1) / 1,
            date.getHours() % 10,
            Math.floor((date.getMinutes() / 10) * 1) / 1,
            date.getMinutes() % 10,
            Math.floor((date.getSeconds() / 10) * 1) / 1,
            date.getSeconds() % 10,
            Math.floor((date.getDate() / 10) * 1) / 1,
            date.getDate() % 10,
            Math.floor(((date.getMonth() + 1) / 10) * 1) / 1,
            (date.getMonth() + 1) % 10
        ]
    }

    const getDots = () => {
        for (let i = 0; i < dots.length; i++) {
            if (!flag) {
                dots[i].style.backgroundColor = color;
                
            } else {
                dots[i].style.backgroundColor = '#fff';
                
            }
        }
        flag = !flag;
    }

    let flag = false;
    let timerId = setTimeout(function tick() {
        let cur = getCurrentTime();
        
        if (mode === 'clock') {
            gettime(cur[0], 0)
            gettime(cur[1], 21)
            gettime(cur[2], 44)
            gettime(cur[3], 65)
            
            getDots();
        } else if (mode === 'date') {
            setTimeout(() => {
                mode = 'clock'
                input.value = 'clock';
            }, 3000);
            gettime(cur[6], 0)
            gettime(cur[7], 21)
            gettime(cur[8], 44)
            gettime(cur[9], 65)
            
            getDots();
        }
    
        timerId = setTimeout(tick, 1000);
    }, 0);
}