import csv
import json
import statistics
from collections import defaultdict, Counter
import os
import re
import random

def read_csv(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            data = list(reader)
            if not data:
                print(f"Error: The file '{file_path}' is empty or could not be read properly.")
                return None
            return data
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        print("Please make sure the CSV file is in the same directory as this script.")
        return None
    except Exception as e:
        print(f"Error reading the CSV file: {str(e)}")
        return None

def calculate_average_salary(data):
    salaries = [int(row[4]) for row in data]
    return int(statistics.mean(salaries))

def calculate_pay_gap(data):
    salaries_by_race = defaultdict(list)
    salaries_by_gender = defaultdict(list)
    
    for row in data:
        salaries_by_race[row[0]].append(int(row[4]))
        salaries_by_gender[row[1]].append(int(row[4]))
    
    white_median = statistics.median(salaries_by_race['White'])
    male_median = statistics.median(salaries_by_gender['Male'])
    
    pay_gap_race = {race: round((1 - statistics.median(salaries) / white_median) * 100)
                    for race, salaries in salaries_by_race.items()}
    pay_gap_gender = {gender: round((1 - statistics.median(salaries) / male_median) * 100)
                      for gender, salaries in salaries_by_gender.items()}
    
    overall_gap = round((1 - statistics.median([s for salaries in salaries_by_race.values() for s in salaries]) / white_median) * 100)
    
    return {"overall": overall_gap, "byRace": pay_gap_race, "byGender": pay_gap_gender}

def calculate_demographic_breakdown(data):
    race_count = defaultdict(int)
    for row in data:
        race_count[row[0]] += 1
    
    total = sum(race_count.values())
    return {race: round((count / total) * 100) for race, count in race_count.items()}

def calculate_salary_bands(data):
    job_titles = set(row[3] for row in data)
    salary_bands = {}
    
    for title in job_titles:
        salaries = [int(row[4]) for row in data if row[3] == title]
        salary_bands[title] = {"min": min(salaries), "max": max(salaries)}
    
    return salary_bands

def calculate_bonus_equity(data):
    bonus_equity = defaultdict(list)
    for row in data:
        bonus_equity[row[0]].append(int(row[5]))
    
    return {race: round(sum(years) / len(years)) for race, years in bonus_equity.items()}

def calculate_job_role_data(data, job_title):
    job_data = [row for row in data if row[3] == job_title]
    return {
        "title": job_title,
        "averageSalary": calculate_average_salary(job_data),
        "payGapAnalysis": calculate_pay_gap(job_data),
        "salaryRange": calculate_salary_bands(job_data)[job_title],
        "employeeCount": len(job_data),
        "diversityIndex": round(1 - sum((count/len(job_data))**2 for count in Counter(row[0] for row in job_data).values()), 2),
        "workLifeEnjoyment": round(statistics.mean([int(row[5]) for row in job_data]) / 2, 1),
        "salaryTrend": [
            {"year": 2015 + i, "salary": int(calculate_average_salary(job_data) * (1 + 0.03*i))}
            for i in range(7)
        ],
        "demographicBreakdown": calculate_demographic_breakdown(job_data),
        "bonusEquity": calculate_bonus_equity(job_data)
    }

def create_company_data_structure(company_name, data):
    company_data = [row for row in data if row[2] == company_name]
    if not company_data:
        raise ValueError(f"No data found for company: {company_name}")
    
    job_titles = set(row[3] for row in company_data)
    
    return {
        "name": company_name,
        "logo": "/placeholder.svg?height=100&width=100",
        "payGapAnalysis": calculate_pay_gap(company_data),
        "salaryBands": calculate_salary_bands(company_data),
        "bonusEquity": calculate_bonus_equity(company_data),
        "demographicBreakdown": calculate_demographic_breakdown(company_data),
        "keyStats": {
            "totalEmployees": len(company_data),
            "averageSalary": calculate_average_salary(company_data),
            "turnoverRate": round(statistics.mean([int(row[5]) for row in company_data]) * 2, 1),
            "diversityIndex": round(1 - sum((count/len(company_data))**2 for count in Counter(row[0] for row in company_data).values()), 2),
            "workLifeEnjoyment": round(statistics.mean([int(row[5]) for row in company_data]) / 2, 1)
        },
        "salaryTrend": [
            {"year": 2015 + i, "salary": int(calculate_average_salary(company_data) * (1 + 0.03*i))}
            for i in range(7)
        ],
        "recentReviews": [
            {
                "id": i + 1,
                "title": f"Review {i + 1}",
                "rating": round(random.uniform(3.0, 5.0), 1),
                "position": random.choice(list(job_titles)),
                "pros": "Placeholder pros",
                "cons": "Placeholder cons"
            }
            for i in range(3)
        ],
        "jobRoles": {title: calculate_job_role_data(company_data, title) for title in job_titles}
    }

def update_typescript_file(file_path, new_data):
    try:
        if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
            # Create a new file with the basic structure
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(f"""import {{ CompanyData }} from './types';

export const {new_data['name'].lower().replace(' ', '')}Data: CompanyData = {json.dumps(new_data, indent=2)};
""")
            print(f"Created new file: {file_path}")
            return True

        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Update the entire content
        updated_content = re.sub(
            r'export const .*Data: CompanyData = {.*?};',
            f"export const {new_data['name'].lower().replace(' ', '')}Data: CompanyData = {json.dumps(new_data, indent=2)};",
            content,
            flags=re.DOTALL
        )

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        return True
    except Exception as e:
        print(f"Error updating {file_path}: {str(e)}")
        return False

def process_company_data(company_name, data):
    return create_company_data_structure(company_name, data)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, 'users.csv')
    companies = ['Amazon', 'Goldman Sachs', 'Google', 'Meta', 'Nvidia', 'Walmart']
    
    data = read_csv(csv_path)
    if data is None:
        return
    
    for company in companies:
        ts_file_name = f"{company.lower().replace(' ', '')}Data.ts"
        ts_path = os.path.join(script_dir, ts_file_name)
        
        try:
            new_data = process_company_data(company, data)
            
            if update_typescript_file(ts_path, new_data):
                print(f"{ts_file_name} has been updated with the latest data from users.csv")
            else:
                print(f"Failed to update {ts_file_name}")
        except ValueError as ve:
            print(f"Error processing {company}: {str(ve)}")
        except Exception as e:
            print(f"Error processing {company}: {str(e)}")
            print(f"Error details: {type(e).__name__}")

if __name__ == "__main__":
    main()
    print("\nScript execution completed. Press Enter to exit.")
    input()