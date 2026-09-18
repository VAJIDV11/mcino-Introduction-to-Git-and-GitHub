# This script calculates yearly compound interest given principal, annual rate of interest and time period in years.
# Do not use this in production. Sample purpose only.

# Author: Upkar Lidder (IBM)
# Additional Authors:
# Vajid11

# Input:
# p, principal amount
# t, time period in years
# r, annual rate of interest

# Output:
# compound interest = p * (1 + r/100)^t - p


def compound_interest(p, t, r):
    return p * (pow((1 + r / 100), t)) - p


if __name__ == "__main__":
    print("--------------------------------------------------")
    print("            Compound Interest Calculator          ")
    print("--------------------------------------------------")
    p = float(input("Enter the principal amount: "))
    t = float(input("Enter the time period in years: "))
    r = float(input("Enter the annual rate of interest (%): "))

    interest = compound_interest(p, t, r)
    total_amount = p + interest
    print("--------------------------------------------------")
    print(f"Total Compound Interest : {interest:.2f}")
    print(f"Total Amount (Maturity) : {total_amount:.2f}")
    print("--------------------------------------------------")
