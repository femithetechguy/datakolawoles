# Business Requirements Document: Loan Disbursement Analysis

## 1. Objective

This document outlines the business requirements for a loan disbursement analysis dashboard to provide key insights into lending performance.

## 2. Key Performance Indicators (KPIs)

### 2.1 Monthly Disbursement Trend

- **Requirement:** Display a visualization showing the monthly disbursement trend in Euros for the last six months.
- **Metric:** The primary measure for this analysis is the sum of `principal_amount_eur`.

### 2.2 Loan Officer Performance

- **Requirement:** Present a visual breakdown of loan disbursement activity per loan officer for the most recent month.
- **Metrics:**
  - Count of loans disbursed per loan officer.
  - Total volume (sum of `principal_amount_eur`) of loans disbursed per loan officer.

### 2.3 Portfolio at Risk (PAR)

- **Requirement:** Create a Key Performance Indicator (KPI) visualization to represent the "Portfolio at Risk."
- **Calculation:** The KPI should be calculated as the sum of `principal_amount_outstanding_eur` for all loans with `overdue_days` greater than 30, divided by the total sum of `principal_amount_outstanding_eur`.

## 3. Functionality

### 3.1 Interactive Filters

- **Requirement:** The dashboard must include interactive filters to enable a detailed breakdown of the data.
- **Filter Dimensions:** The following filters must be available:
  - `branch_key`
  - `product`
  - `loan_officer`

This document serves as the foundation for the development of the requested analysis dashboard.
