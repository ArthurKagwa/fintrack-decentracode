import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup; // Define the form group
  transactions: any[] = []; // Array to store transactions locally

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form group
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]], // Positive amount validation
      description: ['', Validators.required],
      type: ['', Validators.required] // Radio button (income/expense)
    });

    // Ensure localStorage is available before accessing it
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        this.transactions = JSON.parse(storedTransactions);
      }
    }
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction = this.transactionForm.value; // Get form data

      // Add new transaction to the local array
      this.transactions.push(newTransaction);

      // Ensure localStorage is available before saving
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
      }

      console.log('Transaction added:', newTransaction);

      // Reset the form after submission
      this.transactionForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }
}
