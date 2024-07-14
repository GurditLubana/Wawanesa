import win32com.client as win32
import os

outlook = win32.Dispatch('outlook.application')
namespace = outlook.GetNamespace('MAPI')

def incomingMails():
    accounts = namespace.Accounts
    account_index = 4 # for incoming mails 
    print("Sending email from: " + accounts.Item(account_index).DisplayName)
    directory = "C:\\Users\\gurditsingh\\OneDrive - Wawanesa\\Desktop\\Incoming Mails\\July\\July 09\\Life services"
    for fileName in os.listdir(directory):
        if fileName.lower().endswith('.pdf'):
            mail = outlook.CreateItem(0)
            mail.Body = "Good afternoon,\n\nPlease find the new mail we received today.\n\nRegards"
            mail.Subject = fileName
            mail.Attachments.Add(directory + "\\" + fileName)
            mail.To = "LIFE SERVICE EMAIL"
            mail._oleobj_.Invoke(*(64209, 0, 8, 0, accounts.Item(account_index)))
            try:
                # mail.Send()
                print('Email sent successfully for ' + fileName)
            except Exception as e:
                print(f'Error: {e}')



def returnMails():

    mainDirectory = "C:\\Users\\gurditsingh\\OneDrive - Wawanesa\\Desktop\Return Mails\\"
    currentDirectory = "July\\July 11"
    directory = mainDirectory + currentDirectory

    accounts = namespace.Accounts
    account_index = 3

    print("Sending email from: " + accounts.Item(account_index).DisplayName)

    for fileName in os.listdir(directory):
        if fileName.lower().endswith('.pdf'):
            mail = outlook.CreateItem(0)
            # mail.Body = "Good afternoon,\nPlease find the mail we received today.\nRegards"
            mail.Subject = fileName
            mail.Attachments.Add(directory + "\\" + fileName)
            mail.To = 'JSD LIFE ANNUTIES EMAIL'

            mail._oleobj_.Invoke(*(64209, 0, 8, 0, accounts.Item(account_index)))


            try:
                mail.Send()
                print('Email sent successfully for ' + fileName)
            except Exception as e:
                print(f'Error: {e}')


returnMails()
# incomingMails()
