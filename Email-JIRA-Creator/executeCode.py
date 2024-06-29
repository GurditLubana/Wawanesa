import win32com.client as win32
import os

outlook = win32.Dispatch('outlook.application')
namespace = outlook.GetNamespace('MAPI')
mainDirectory = "C:\\Users\\gurditsingh\\OneDrive - Wawanesa\\Desktop\Return Mails\\"

currentDirectory = "June\\June 17"
directory = mainDirectory + currentDirectory

accounts = namespace.Accounts


# for i in range(accounts.Count):
#     print(f'Account {i + 1}: {accounts.Item(i + 1).DisplayName}')

account_index = 1
print("Sending email from: " + accounts.Item(account_index).DisplayName)

for fileName in os.listdir(directory):
    if fileName.lower().endswith('.pdf'):
        mail = outlook.CreateItem(0)
        mail.Subject = fileName
        mail.Attachments.Add(directory + "\\" + fileName)
        # mail.Body = 'This is a test email sent from a Python script using Outlook!'
        # mail.To = 'gurditrajat13@yahoo.com'
        mail.To = 'JSD-Life-Annuity@jira.wawanesa.com'

        mail._oleobj_.Invoke(*(64209, 0, 8, 0, accounts.Item(account_index)))


        try:
            # mail.Send()
            print('Email sent successfully for ' + fileName)
        except Exception as e:
            print(f'Error: {e}')
