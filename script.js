document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const principalInput = document.getElementById('principal');
  const principalSlider = document.getElementById('principalSlider');
  const principalBadge = document.getElementById('principalBadge');

  const rateInput = document.getElementById('rate');
  const rateSlider = document.getElementById('rateSlider');
  const rateBadge = document.getElementById('rateBadge');

  const timeInput = document.getElementById('time');
  const timeSlider = document.getElementById('timeSlider');
  const timeBadge = document.getElementById('timeBadge');

  const currencySelect = document.getElementById('currencySelect');
  const currencySymbols = document.querySelectorAll('.currency-symbol');

  const btnSimple = document.getElementById('btnSimple');
  const btnCompound = document.getElementById('btnCompound');

  const metricPrincipal = document.getElementById('metricPrincipal');
  const metricInterest = document.getElementById('metricInterest');
  const metricTotal = document.getElementById('metricTotal');
  const metricPrincipalPct = document.getElementById('metricPrincipalPct');
  const metricInterestPct = document.getElementById('metricInterestPct');

  const interestLabel = document.getElementById('interestLabel');
  const formulaCode = document.getElementById('formulaCode');
  const chartTotalAmount = document.getElementById('chartTotalAmount');

  const donutBg = document.querySelector('.donut-bg');
  const principalSegment = document.querySelector('.principal-segment');
  const interestSegment = document.querySelector('.interest-segment');

  const scheduleDuration = document.getElementById('scheduleDuration');
  const scheduleBody = document.getElementById('scheduleBody');

  const btnReset = document.getElementById('btnReset');
  const btnCopy = document.getElementById('btnCopy');
  const toast = document.getElementById('toast');

  // State
  let currentMode = 'simple'; // 'simple' or 'compound'
  let currentCurrency = '$';

  // Helper: Format Money
  const formatCurrency = (amount) => {
    return `${currentCurrency}${Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  // Sync Input <-> Slider
  const setupSync = (inputEl, sliderEl, onUpdate) => {
    inputEl.addEventListener('input', () => {
      sliderEl.value = inputEl.value;
      onUpdate();
    });
    sliderEl.addEventListener('input', () => {
      inputEl.value = sliderEl.value;
      onUpdate();
    });
  };

  setupSync(principalInput, principalSlider, calculate);
  setupSync(rateInput, rateSlider, calculate);
  setupSync(timeInput, timeSlider, calculate);

  // Currency Picker
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    currencySymbols.forEach((el) => (el.textContent = currentCurrency));
    calculate();
  });

  // Mode Toggles
  btnSimple.addEventListener('click', () => {
    if (currentMode === 'simple') return;
    currentMode = 'simple';
    btnSimple.classList.add('active');
    btnCompound.classList.remove('active');
    interestLabel.textContent = 'Total Simple Interest';
    formulaCode.textContent = 'Simple Interest = (P × R × T) / 100';
    calculate();
  });

  btnCompound.addEventListener('click', () => {
    if (currentMode === 'compound') return;
    currentMode = 'compound';
    btnCompound.classList.add('active');
    btnSimple.classList.remove('active');
    interestLabel.textContent = 'Total Compound Interest';
    formulaCode.textContent = 'A = P × (1 + R/100)^T | CI = A - P';
    calculate();
  });

  // Core Calculation Function
  function calculate() {
    const P = parseFloat(principalInput.value) || 0;
    const R = parseFloat(rateInput.value) || 0;
    const T = parseFloat(timeInput.value) || 0;

    // Badges update
    principalBadge.textContent = formatCurrency(P);
    rateBadge.textContent = `${R.toFixed(2)}%`;
    timeBadge.textContent = `${T} ${T === 1 ? 'Year' : 'Years'}`;
    scheduleDuration.textContent = `${T} ${T === 1 ? 'Year' : 'Years'} Timeline`;

    let totalInterest = 0;
    let maturityAmount = 0;

    if (currentMode === 'simple') {
      totalInterest = (P * R * T) / 100;
      maturityAmount = P + totalInterest;
    } else {
      maturityAmount = P * Math.pow(1 + R / 100, T);
      totalInterest = maturityAmount - P;
    }

    // Update Metrics
    metricPrincipal.textContent = formatCurrency(P);
    metricInterest.textContent = formatCurrency(totalInterest);
    metricTotal.textContent = formatCurrency(maturityAmount);
    chartTotalAmount.textContent = formatCurrency(maturityAmount);

    // Percentage Breakdown
    const principalPct = maturityAmount > 0 ? (P / maturityAmount) * 100 : 100;
    const interestPct = maturityAmount > 0 ? (totalInterest / maturityAmount) * 100 : 0;

    metricPrincipalPct.textContent = `${principalPct.toFixed(1)}%`;
    metricInterestPct.textContent = `${interestPct.toFixed(1)}%`;

    // Update Donut Chart
    updateDonutChart(principalPct, interestPct);

    // Update Schedule Table
    generateSchedule(P, R, T);
  }

  // Update SVG Donut Chart
  function updateDonutChart(pPct, iPct) {
    const radius = 75;
    const circumference = 2 * Math.PI * radius; // ~471.24

    const pDash = (pPct / 100) * circumference;
    const iDash = (iPct / 100) * circumference;

    principalSegment.style.strokeDasharray = `${pDash} ${circumference}`;
    principalSegment.style.strokeDashoffset = '0';

    interestSegment.style.strokeDasharray = `${iDash} ${circumference}`;
    interestSegment.style.strokeDashoffset = `-${pDash}`;
  }

  // Generate Year-by-Year Growth Table
  function generateSchedule(P, R, T) {
    scheduleBody.innerHTML = '';
    const fullYears = Math.floor(T);
    let opening = P;

    for (let yr = 1; yr <= fullYears; yr++) {
      let interestEarned = 0;
      let closing = 0;

      if (currentMode === 'simple') {
        interestEarned = (P * R) / 100;
        closing = P + interestEarned * yr;
        opening = P + interestEarned * (yr - 1);
      } else {
        interestEarned = (opening * R) / 100;
        closing = opening + interestEarned;
      }

      const growthPct = opening > 0 ? ((closing - P) / P) * 100 : 0;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>Year ${yr}</strong></td>
        <td>${formatCurrency(opening)}</td>
        <td>+${formatCurrency(interestEarned)}</td>
        <td><strong>${formatCurrency(closing)}</strong></td>
        <td>+${growthPct.toFixed(1)}%</td>
      `;
      scheduleBody.appendChild(tr);

      if (currentMode === 'compound') {
        opening = closing;
      }
    }

    // If fractional year exists (e.g. 2.5 years)
    if (T > fullYears) {
      const remainingFrac = T - fullYears;
      let interestEarned = 0;
      let closing = 0;

      if (currentMode === 'simple') {
        interestEarned = ((P * R) / 100) * remainingFrac;
        closing = P + (P * R * T) / 100;
      } else {
        interestEarned = opening * (Math.pow(1 + R / 100, remainingFrac) - 1);
        closing = opening + interestEarned;
      }

      const growthPct = P > 0 ? ((closing - P) / P) * 100 : 0;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>Year ${T.toFixed(1)} (Partial)</strong></td>
        <td>${formatCurrency(opening)}</td>
        <td>+${formatCurrency(interestEarned)}</td>
        <td><strong>${formatCurrency(closing)}</strong></td>
        <td>+${growthPct.toFixed(1)}%</td>
      `;
      scheduleBody.appendChild(tr);
    }
  }

  // Reset Button
  btnReset.addEventListener('click', () => {
    principalInput.value = 10000;
    principalSlider.value = 10000;
    rateInput.value = 8.5;
    rateSlider.value = 8.5;
    timeInput.value = 5;
    timeSlider.value = 5;
    calculate();
  });

  // Copy Summary
  btnCopy.addEventListener('click', () => {
    const P = principalInput.value;
    const R = rateInput.value;
    const T = timeInput.value;
    const interest = metricInterest.textContent;
    const total = metricTotal.textContent;
    const mode = currentMode === 'simple' ? 'Simple Interest' : 'Compound Interest';

    const textToCopy = `=== ${mode} Calculation Summary ===\n` +
      `Principal Amount: ${formatCurrency(P)}\n` +
      `Annual Interest Rate: ${R}%\n` +
      `Time Period: ${T} Years\n` +
      `Total Interest Earned: ${interest}\n` +
      `Maturity Total Amount: ${total}\n` +
      `Computed via Smart Interest Calculator (IBM DevOps Project)`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });

  // Initial Calculation Run
  calculate();
});
