#!/bin/bash
# -----------------------------------------------------------------------------
# Script Name: simple-interest.sh
# Repository: github-final-project
# Description: This script calculates simple interest given principal,
#              annual rate of interest and time period in years.
#
# Author: Upkar Lidder (IBM)
# Additional Authors:
# VAJIDV11
#
# Do not use this in production. Sample purpose only.
# -----------------------------------------------------------------------------

# Section 1 - Input:
# Prompt user for principal amount (p), rate of interest (r), and time period in years (t)
echo "Enter the principal:"
read p
echo "Enter rate of interest per year:"
read r
echo "Enter time period in years:"
read t

# Section 2 - Calculation:
# Compute simple interest using expr command for multiplication and division
# Formula: simple interest = (p * t * r) / 100
s=`expr $p \* $t \* $r / 100`

# Section 3 - Output:
# Display the calculated simple interest to the user
echo "The simple interest is: "
echo $s
