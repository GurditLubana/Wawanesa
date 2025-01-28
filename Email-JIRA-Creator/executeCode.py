import win32com.client as win32
import os

outlook = win32.Dispatch('outlook.application')
namespace = outlook.GetNamespace('MAPI')

def returnMails():

    directory = "L:\\5.  Life Shared Services\\Return Mail Scanned\\2025\\January\\January 24"
    accounts = namespace.Accounts

    account_index = 3

    print("Sending email from: " + accounts.Item(account_index).DisplayName)
    count = 0
    for fileName in os.listdir(directory):
        if fileName.lower().endswith('.pdf'):
            mail = outlook.CreateItem(0)
            mail.Subject = fileName[:-4]
            mail.Attachments.Add(directory + "\\" + fileName)
            mail.To = 'JSD-Life-Annuity@jira.wawanesa.com'

            mail._oleobj_.Invoke(*(64209, 0, 8, 0, accounts.Item(account_index)))


            try:
                mail.Send()
                print('Email sent successfully for ' + fileName[:-4])
                count+=1
            except Exception as e:
                print(f'Error: {e}')

    statement = str(count) + " JIRA created"
    print(statement)
returnMails()
