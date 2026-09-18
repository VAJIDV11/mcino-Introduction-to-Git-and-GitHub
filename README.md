# Introduction to Git and GitHub

## Simple Interest Calculator

A calculator that calculates simple interest given principal, annual rate of interest and time period in years.

```
Input:
   p, principal amount
   t, time period in years
   r, annual rate of interest
Output
   simple interest = p*t*r
```

---

### Project Overview

This repository is part of the **IBM DevOps and Software Engineering Professional Certificate** course: *"Introduction to Git and GitHub"*.

It provides an interactive, responsive **Simple & Compound Interest Calculator** application, alongside a command-line Bash script and Python implementation for computing financial interest.

### Features

- ⚡ **Interactive Web Application**: Responsive user interface built with HTML5, CSS3 Glassmorphism, and Vanilla JavaScript.
- 🔄 **Simple & Compound Modes**: Switch effortlessly between Simple Interest (\(I = \frac{P \times R \times T}{100}\)) and Compound Interest (\(A = P(1 + R/100)^T\)).
- 📊 **Dynamic Visual Breakdown**: Real-time SVG Donut Chart illustrating the percentage split between Principal and Total Interest.
- 📅 **Year-by-Year Growth Schedule**: Automated growth breakdown table displaying opening balance, yearly interest accrual, and closing balance.
- 💱 **Multi-Currency Support**: Instant switching between USD ($), INR (₹), EUR (€), and GBP (£).
- 🐚 **Bash Script (`simple-interest.sh`)**: Fast CLI tool for Unix/Linux/macOS terminals.
- 🐍 **Python Implementation (`compound_interest.py`)**: Script for compound interest computations.

---

### Mathematical Formula

The simple interest is calculated using the standard mathematical formula:

$$\text{Simple Interest} = \frac{P \times R \times T}{100}$$

Where:
- **\(P\)** = Principal amount (initial investment / loan amount)
- **\(R\)** = Annual rate of interest (percentage per year)
- **\(T\)** = Time period (in years)

---

### Bash Script Usage

To run the bash calculator from your terminal:

```bash
# Grant execution permissions
chmod +x simple-interest.sh

# Run the script
./simple-interest.sh
```

**Sample Interactive Prompt:**
```text
Enter the principal:
10000
Enter rate of interest per year:
8.5
Enter time period in years:
5
The simple interest is:
4250
```

---

### Web Application Usage

1. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
2. Adjust the numeric input fields or drag the sliders.
3. Observe live calculations, chart updates, and amortization schedule.
4. Click **Copy Summary** to share or export calculation results.

---

### Repository Structure

```text
calculator/
│── index.html              # Responsive Web Calculator UI
│── style.css               # Glassmorphism Modern Styling
│── script.js               # Reactive Calculation & SVG Chart Engine
│── simple-interest.sh      # Bash Script for Simple Interest
│── compound_interest.py    # Python Script for Compound Interest
│── README.md               # Project Documentation
│── LICENSE                 # Apache License 2.0
│── CODE_OF_CONDUCT.md      # Contributor Covenant Code of Conduct
└── CONTRIBUTING.md         # Guidelines for Contributors
```

---

### License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for complete details.

_© 2023 XYZ, Inc._
