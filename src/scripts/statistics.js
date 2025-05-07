const ctx = document.getElementById('incomeChart').getContext('2d');
        const incomeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['', '', ''], // Empty labels to remove text below bars
                datasets: [{
                    label: '',
                    data: [10000000, 12000000, 15000000],
                    backgroundColor: ['#eab308', '#f97316', '#22c55e'], // Yellow, Orange, Green
                    borderWidth: 1,
                    borderRadius: 8,
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: 15000000,
                        ticks: {
                            stepSize: 5000000,
                            callback: function(value) {
                                return '$' + (value / 1000000) + 'M';
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false 
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                plugins: [
                    {
                        id: 'customTextInsideBars',
                        afterDatasetsDraw: (chart) => {
                            const ctx = chart.ctx;
                            chart.data.datasets.forEach((dataset, i) => {
                                const meta = chart.getDatasetMeta(i);
                                meta.data.forEach((bar, index) => {
                                    const percentage = ['15%', '20%', '30%'][index];
                                    ctx.fillStyle = '#000000'; // Black text for visibility
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(percentage, bar.x, bar.y - 10); // Position text inside bar
                                });
                            });
                        }
                    }
                ]
            }
        });


const timeDisplay = document.getElementById("timeDisplay");
const circle = document.querySelector(".progress-ring__circle");

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let interval = null;let totalMinutes = 0;
const targetMinutes = Math.floor(0.7 * 480); // 336 minutes

function animateProgress() {
  const interval = setInterval(() => {
    if (totalMinutes >= targetMinutes) {
      clearInterval(interval);
    } else {
      totalMinutes++;
      updateTimeDisplay();
    }
  }, 10); // Fast animation (adjust speed if needed)
}

animateProgress();

function setProgress(minutes) {
  const percent = (minutes / 480) * 100; // 8 hours = 480 mins
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function updateTimeDisplay() {
  const maxMinutes = 480;
  const percent = totalMinutes / maxMinutes;
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMinutes = totalMinutes % 60;
  document.getElementById("timeDisplay").textContent =
    `${displayHours.toString().padStart(2, "0")}:${displayMinutes.toString().padStart(2, "0")}`;

  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percent * circumference;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;

  // Tip position
  const angle = 2 * Math.PI * percent - Math.PI / 2; // start from top
  const tipX = 60 + radius * Math.cos(angle);
  const tipY = 60 + radius * Math.sin(angle);
  const tip = document.getElementById("progress-tip");
  tip.setAttribute("cx", tipX);
  tip.setAttribute("cy", tipY);
}


document.getElementById("pauseBtn").addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  } else {
    interval = setInterval(() => {
      totalMinutes++;
      updateTimeDisplay();
    }, 1000); // 1 sec = 1 min (for demo)
  }
});

document.getElementById("forwardBtn").addEventListener("click", () => {
  totalMinutes += 15;
  updateTimeDisplay();
});

updateTimeDisplay();

