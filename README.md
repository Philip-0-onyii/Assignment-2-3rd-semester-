## Birthday Reminder App

## Description
This application automatically sends birthday emails to registered users.
A cron job runs every day at 7am to check whose birthday is today and sends well wishes.

## Features
- Simple UI to collect username, email, and date of birth
- MongoDB database storage
- Daily cron job (7am)
- Automated email sending using Gmail + Nodemailer
- Ensures unique emails

## How to Run
1. Install Node.js
2. Open the project folder
3. Run:
   npm install
4. Add your credentials to your '.env'
5. Start the app:
   npm start
6. Visit:
   http://localhost:3000

## Cron Schedule
Runs daily at 7:00 AM:
0 7 * * *

## Author
Philip Gideon – Birthday Reminder Automation
