import urllib.request
import csv
import datetime


def fetch_csv_data():
    url = 'https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/ockovani.csv'
    csv_data = urllib.request.urlopen(url).read().decode('utf-8-sig').splitlines()

    return csv_data


def sum_vaccinations(csv_reader):
    vacc_total = 0
    vacc_seven_days = 0

    # latest data is always from the day before
    yesterday = datetime.date.today() - datetime.timedelta(days=1)

    for row in csv_reader:
        vacc = int(row['prvnich_davek'])
        vacc_total += vacc

        vacc_date = datetime.date.fromisoformat(row['datum'])

        if yesterday - vacc_date <= datetime.timedelta(days=7):
            vacc_seven_days += vacc
    
    return (vacc_total, vacc_seven_days)


def write_to_file(vacc_total, vacc_seven_days, days_since_start):
    with open('main.js', 'r') as js_file:
        js_data = js_file.readlines()
    
    current_time = datetime.datetime.now()
    js_data[0] = f'const updatedDate = "{current_time.day}. {current_time.month}. {current_time.year} v {current_time.hour}:{current_time.minute}";\n'
    js_data[1] = f'const vaccTotal = {vacc_total};\n'
    js_data[2] = f'const vaccSevenDays = {vacc_seven_days};\n'
    js_data[3] = f'const daysSinceStart = {days_since_start};\n'

    with open('main.js', 'w') as js_file:
        js_file.writelines(js_data)


def main():
    csv_data = fetch_csv_data()
    csv_reader = csv.DictReader(csv_data)

    (vacc_total, vacc_seven_days) = sum_vaccinations(csv_reader)
    days_since_start = (datetime.date.today() - datetime.date(2020, 12, 27)).days

    write_to_file(vacc_total, vacc_seven_days, days_since_start)


if __name__ == "__main__":
    main()